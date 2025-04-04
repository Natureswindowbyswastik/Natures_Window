const BlogModel = require('../model/Blog')

const addBlog= async(req,res)=>{
    try {
        const{heading, subheading,descriptions, link}= req.body;
        const uploadImage = req.file.path;

        const blogModel = new BlogModel({heading,subheading,descriptions,link, images:uploadImage})

        await blogModel.save();
        res.status(201)
   .json({
    message:"Blog added Successfully",
    success:true
   })
    } catch (error) {
        res.status(500)
        .json({
            message:"Error adding blog",
            success:false,
           
        })
        console.log(error)
    }
   
}

const displayBlog = async(req,res)=>{
    try {
        const blog = await BlogModel.find();
        if(blog.length==0){
            return res.status(404)
            .json({message:"No blogs"})
        }
        res.status(200).json({
            success:true,
            message:"Blogs retrived",
           blog:blog
        })
    } catch (error) {
        res.status(500)
        .json({
            message:"Internal server error",
            success:false,
        })
    }
}
const editBlog = async (req,res)=>{
    try {
        const {_id} = req.params;
      
        const blog = await BlogModel.findById(_id);

        if(!blog){
            return res.status(400)
            .json({message:"Blog not found"})
        }
        blog.heading= req.body.heading || blog.heading;
        blog.subheading = req.body.subheading || blog.subheading;
        blog.descriptions = req.body.descriptions || blog.descriptions;
        blog.link = req.body.link || blog.link;
     
   // Update the image if a new one is uploaded
   if (req.file) {
    blog.images = req.file.path; 
}
        
        await blog.save();

        res.status(200).json({
            message: "blog updated successfully",
            success: true,
           blog:blog
        }); 

    } catch (error) {
        res.status(500)
        .json({ message: "Error updating blog", success: false, error: error.message });
    }
}
const deleteBlog = async(req,res)=>{
    try {
        const {_id}= req.params;
        console.log(_id);

        const blog = await BlogModel.findByIdAndDelete(_id);
     
        if(!blog){
            return res.status(400)
            .json({
                message:"Blog not found"
            })
        }
        res.status(200).json({
            message: "Blog deleted successfully",
            success: true,
           
        });

    } catch (error) {
         res.status(500)
        .json({ message: "Internal error", success: false, error: error.message });
    }
}
module.exports = {addBlog,displayBlog,editBlog,deleteBlog};