const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/Cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'portfolio',
        allowedFormats: ['jpeg', 'png', 'jpg', 'webp'],
        transformation: [
            { width: 1920, height: 1920, crop: "limit" }, // Caps at crisp Full HD, keeping sizes well under Vercel's limit
            { quality: "90" },                           // 90 quality looks fantastic but shreds megabytes off the file size
            { fetch_format: "auto" }                      // Automatically optimizes formats for delivery
        ]
    }
});
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 4.2 * 1024 * 1024 } // Explicitly blocks files over 4.2MB before they can crash Vercel
});


const blogStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blog_images', 
        allowedFormats: ['jpeg', 'png', 'jpg', 'webp'],
        transformation: [
            { width: 1200, crop: "limit" }, 
            { quality: "85" },        
            { fetch_format: "auto" } 
        ]
    }
});
const uploadBlog = multer({
    storage: blogStorage,
    limits: {
        fileSize: 4.2 * 1024 * 1024,
        fieldSize: 10 * 1024 * 1024, // Rich text HTML from React Quill can exceed 1MB default
    },
});

module.exports = { upload, uploadBlog };