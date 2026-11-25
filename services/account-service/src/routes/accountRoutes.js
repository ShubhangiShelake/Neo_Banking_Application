
const express = require("express");
const { createAccount } = require("../controllers/accountController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// Create bank account
router.post("/", authenticate, createAccount);

module.exports = router;
