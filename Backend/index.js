require("dotenv").config();
require('./connection/conn')
const cors = require('cors')
const express= require ('express');
const app = express();
const bodyParser = require('body-parser');
const FormRouter = require('./routes/FormRouter')
const GalleryRouter = require("./routes/GalleryRouter");
const BlogRouter = require('./routes/BlogRouter')
const AuthRouter  = require('./routes/AuthRouter')
const frontendURL = process.env.FRONTEND_URL ;
app.use(cors({
     origin: "https://natures-window-or5f1w1g8-swastik-sharmas-projects-8c9f418a.vercel.app",
     methods:["GET","POST","PUT","DELETE"],
     allowedHeaders:["Content-Type","Authorization"]
     }));
app.use(bodyParser.json());
app.use(express.json());

app.use('/gallery', GalleryRouter);
app.use('/blog',BlogRouter);
app.use('/auth',AuthRouter);
app.use('/form',FormRouter);
console.log("Allowed Frontend URL:", frontendURL);
const port = process.env.PORT || 3001; // Default to 3001 for local development
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});
