const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./connection/conn");

const app = express();
const allowedOrigins = [
    "https://natures-window.vercel.app", // Add your frontend URL
    "http://localhost:5173", // Local development URL
    "https://natures-window-l8b11f1ou-swastik-sharmas-projects-8c9f418a.vercel.app" ,
    "https://www.natureswindowbyswastik.com"
  ];
  
  // CORS middleware
  app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true // If you're sending cookies or authentication info
  }));

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
