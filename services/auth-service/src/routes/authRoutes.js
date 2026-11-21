
const express = require("express");
const { body, validationResult } = require("express-validator");

const { register,login,getProfile} = require("../controllers/authControllers");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    next();
};

router.post(
    "/register",
    [
        body("name").trim().notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Valid email is required"),
        body("password")
            .isLength({ min: 8 })
            .withMessage("Password must contain at least 8 characters")
    ],
    validateRequest,
    register
);


router.post("/login",
    [
        body("email")
            .isEmail()
            .withMessage("Valid email is required"),

        body("password")
            .notEmpty()
            .withMessage("Password is required")
    ],
    validateRequest,
    login
);

router.get("/me", authenticate, getProfile);


module.exports = router;
