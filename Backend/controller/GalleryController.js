const GalleryModel = require('../model/Gallery')
const cloudinary = require('../utils/Cloudinary')
const addImage = async (req, res) => {
    try {
        const { name, location, feature,link } = req.body;
        console.log(req.body)
      
        if (!req.file) {
            return res.status(400).json({
                message: "No image file uploaded",
                success: false
            });
        }

        
        const { path: url, filename: public_id } = req.file;

        
        const galleryModel = new GalleryModel({
            name,
            location,
            feature,
            images: [{ url, public_id }],
            link, 
        });

        
        await galleryModel.save();

        
        res.status(201).json({
            message: "Image added successfully",
            success: true,
            data: galleryModel 
        });
    } catch (error) {
        
        res.status(500).json({
            message: "Error adding image",
            success: false,
            error: error.message 
        });
    }
};


const displayGallery = async(req, res)=>{
    try {
        const gallery = await GalleryModel.find().sort({ _id: -1 }); ;
        if(gallery.length==0){
            return res.status(404)
            .json({message:"No images"})
        }
        res.status(200).json({
            success:true,
            message:"Gallery retrived",
            gallery: gallery
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
     
            message:"Internal server error",
            success:false,
        })
    }
}

const editGallery = async (req, res) => {
    try {
        const { _id } = req.params;
        const gallery = await GalleryModel.findById(_id);

        if (!gallery) {
            return res.status(400).json({ message: "Gallery not found" });
        }
        gallery.name = req.body.name || gallery.name;
        gallery.location = req.body.location || gallery.location;
        gallery.feature = req.body.feature || gallery.feature;
           if (req.body.link !== undefined) {
            gallery.link = req.body.link;
        }
        if (req.file) {
            const {   path: url, filename: public_id } = req.file;
            gallery.images = [{ url, public_id }];
        }

        await gallery.save();

        res.status(200).json({
            message: "Gallery updated successfully",
            success: true,
            gallery:gallery
        });

    } catch (error) {
        res.status(500)
        .json({ message: "Error updating gallery", success: false, error: error.message });
    }
};
const deleteGallery = async (req, res) => {
    try {
        const { _id } = req.params;

        // Find the gallery entry to get the images array
        const gallery = await GalleryModel.findById(_id);

        if (!gallery) {
            return res.status(400).json({ message: "Gallery not found" });
        }

        // Delete each image from Cloudinary using its public_id
        for (const image of gallery.images) {
            await cloudinary.uploader.destroy(image.public_id);
        }

        // Delete the gallery entry from the database
        await GalleryModel.findByIdAndDelete(_id);

        res.status(200).json({
            message: "Gallery deleted successfully",
            success: true,
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal error",
            success: false,
            error: error.message,
        });
    }
};

const featureDisplay = async(req,res)=>{
    try {
        const featuredImage = await GalleryModel.find({feature:true}).limit(4);
        res.status(200).json({
            message: "Gallery updated successfully",
            success: true,
           featuredImage:featuredImage
        });
    } catch (error) {
        res.status(500)
        .json({ message: "Error updating gallery", success: false, error: error.message });
    }
}
module.exports ={addImage, displayGallery,editGallery, deleteGallery,featureDisplay};