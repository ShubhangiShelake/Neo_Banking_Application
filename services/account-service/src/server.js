const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const accountRoutes = require("./routes/accountRoutes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        service: "Account Service",
        message: "Account Service is running"
    });
});

// Account routes
app.use("/api/accounts", accountRoutes);

// Start server after database connection
const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 4002;

        app.listen(PORT, () => {
            console.log(`Account Service running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start Account Service:", error.message);
        process.exit(1);
    }
};

startServer();