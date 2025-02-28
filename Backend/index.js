require("dotenv").config();
require("./connection/conn");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
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

app.use("/gallery", GalleryRouter);
app.use("/blog", BlogRouter);
app.use("/auth", AuthRouter);
app.use("/form", FormRouter);

console.log("Allowed Frontend URL:", frontendURL);

// ✅ Export the app as a function instead of using app.listen()
module.exports = app;
