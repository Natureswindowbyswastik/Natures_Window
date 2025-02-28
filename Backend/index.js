const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./connection/conn");

const app = express();

const allowedOrigins = [
  "https://natures-window.vercel.app", // Add your frontend URL
  "http://localhost:3000", // Local development URL
  "https://natures-window-l8b11f1ou-swastik-sharmas-projects-8c9f418a.vercel.app" // Add any other frontend URLs if necessary
];

// CORS middleware
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // If you're sending cookies or authentication info
}));

// Body parser middleware
app.use(express.json());

// Import routes
const GalleryRouter = require("./routes/GalleryRouter");

// Use routes
app.use("/gallery", GalleryRouter);

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
