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
app.use(cors());
app.use(bodyParser.json());


app.use('/gallery', GalleryRouter);
app.use('/blog',BlogRouter);
app.use('/auth',AuthRouter);
app.use('/form',FormRouter);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on Port ${process.env.PORT}`);
})