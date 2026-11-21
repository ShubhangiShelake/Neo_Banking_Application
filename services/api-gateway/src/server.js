
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { createProxyMiddleware } = require("http-proxy-middleware");

require("dotenv").config();

const app = express();

// Security and common middleware
app.use(helmet());
app.use(cors());

// Auth Service proxy
app.use(
    "/api/auth",
    createProxyMiddleware({
        target: process.env.AUTH_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {
            "^/api/auth": ""
        }
    })
);

// Gateway health check
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        service: "API Gateway",
        message: "API Gateway is running successfully"
    });
});

// Start Gateway
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
