const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/Cloudinary');


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'portfolio',
        allowedFormats: ['jpeg', 'png', 'jpg'],
        transformation: [
            { width: 1000, crop: "scale" }, 
            { quality: "auto" }, 
            { fetch_format: "auto" } 
        ]
    }
});
const upload = multer({ storage: storage
  });


const blogStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blog_images', 
        allowedFormats: ['jpeg', 'png', 'jpg'],
        transformation: [
            { width: 1000, crop: "scale" }, 
            { quality: "auto" }, 
            { fetch_format: "auto" } 
        ]
    }
});
const uploadBlog = multer({ storage: blogStorage });

module.exports = { upload, uploadBlog }; 
