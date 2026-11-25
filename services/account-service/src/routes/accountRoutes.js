
const express = require("express");

const {
    createAccount,
    getMyAccounts
} = require("../controllers/accountController");

const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// Create bank account
router.post("/", authenticate, createAccount);

// Get logged-in customer's accounts
router.get("/", authenticate, getMyAccounts);

module.exports = router;
