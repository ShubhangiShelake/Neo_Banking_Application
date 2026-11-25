
const Account = require("../models/Account");
const generateAccountNumber = require("../utils/accountNumberGenerator");

// Create customer bank account
exports.createAccount = async (req, res) => {
    try {
        // Get customer ID from verified JWT
        const userId = req.user.sub;

        // Get account type from request body
        const { accountType } = req.body;

        // Validate account type
        if (!["SAVINGS", "CURRENT"].includes(accountType)) {
            return res.status(400).json({
                success: false,
                message: "Account type must be SAVINGS or CURRENT"
            });
        }

        // Generate and save unique account number
        let account;
        let attempts = 0;
        const maxAttempts = 5;

        while (!account && attempts < maxAttempts) {
            attempts++;

            const accountNumber = generateAccountNumber();

            try {
                account = await Account.create({
                    userId,
                    accountNumber,
                    accountType,
                    balance: 0,
                    status: "ACTIVE",
                    currency: "INR"
                });
            } catch (error) {
                // Retry only if account number already exists
                if (error.code !== 11000) {
                    throw error;
                }
            }
        }

        if (!account) {
            return res.status(503).json({
                success: false,
                message: "Unable to generate a unique account number. Please try again."
            });
        }

        return res.status(201).json({
            success: true,
            message: "Bank account created successfully",
            data: {
                id: account._id,
                userId: account.userId,
                accountNumber: account.accountNumber,
                accountType: account.accountType,
                balance: account.balance,
                currency: account.currency,
                status: account.status,
                createdAt: account.createdAt
            }
        });

    } catch (error) {
        console.error("Account creation error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Get all accounts belonging to logged-in customer
exports.getMyAccounts = async (req, res) => {
    try {
        // Get customer ID from verified JWT
        const userId = req.user.sub;

        // Find accounts belonging to this customer
        const accounts = await Account.find({ userId })
            .select("-__v")
            .sort({ createdAt: -1 });

        if (accounts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No accounts found for this customer"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Customer accounts fetched successfully",
            count: accounts.length,
            data: accounts
        });

    } catch (error) {
        console.error("Get accounts error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

