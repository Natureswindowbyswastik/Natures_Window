const router = require('express').Router();
const {addBlog,displayBlog,editBlog,deleteBlog}= require('../controller/BlogController');

const {uploadBlog} = require('../Middleware/Multer')


router.post('/addblog', uploadBlog.single('images'),addBlog);
router.get('/showblog',displayBlog);
router.post('/editblog/:_id',uploadBlog.single('images'),editBlog);
router.delete('/deleteblog/:_id',deleteBlog);

module.exports=router;