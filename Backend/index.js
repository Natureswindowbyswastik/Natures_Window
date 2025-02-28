const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./connection/conn");

const app = express();

const allowedOrigins = [
    "https://natures-window.vercel.app",
    "http://localhost:3000" // Allow local development
];

// CORS middleware
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true"); // If using credentials
    next();
});

// Body parser middleware
app.use(bodyParser.json());
app.use(express.json());

// Import routes
const FormRouter = require("./routes/FormRouter");
const GalleryRouter = require("./routes/GalleryRouter");
const BlogRouter = require("./routes/BlogRouter");
const AuthRouter = require("./routes/AuthRouter");

// Use routes
app.use("/gallery", GalleryRouter);
app.use("/blog", BlogRouter);
app.use("/auth", AuthRouter);
app.use("/form", FormRouter);

const port = process.env.PORT || 3001; // Default to 3001 for local development
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});
