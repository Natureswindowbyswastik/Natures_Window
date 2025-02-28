const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
require("./connection/conn");

const FormRouter = require("./routes/FormRouter");
const GalleryRouter = require("./routes/GalleryRouter");
const BlogRouter = require("./routes/BlogRouter");
const AuthRouter = require("./routes/AuthRouter");

const frontendURL = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: frontendURL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/gallery", GalleryRouter);
app.use("/api/blog", BlogRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/form", FormRouter);

const port = process.env.PORT || 3001;

// **Vercel needs this export**
module.exports = app;
