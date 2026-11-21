
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        success: true,
        service: "Auth Service",
        message: "Auth Service is running successfully"
    });
});

app.use("/", authRoutes);

const PORT = process.env.PORT || 4001;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Auth Service running on port ${PORT}`);
    });
};

startServer();
