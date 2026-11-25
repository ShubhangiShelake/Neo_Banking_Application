
const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
    {
        // Customer ID from Auth Service
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            index: true
        },

        // Unique bank account number
        accountNumber: {
            type: String,
            required: true,
            unique: true
        },

        // Customer account type
        accountType: {
            type: String,
            enum: ["SAVINGS", "CURRENT"],
            default: "SAVINGS",
            required: true
        },

        // Available account balance
        balance: {
            type: Number,
            default: 0,
            min: 0
        },

        // Account status
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE", "BLOCKED"],
            default: "ACTIVE"
        },

        // Currency
        currency: {
            type: String,
            default: "INR"
        }
    },
    {
        timestamps: true
    }
);

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
