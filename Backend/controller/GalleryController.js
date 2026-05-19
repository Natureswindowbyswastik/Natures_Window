const GalleryModel = require('../model/Gallery')
const cloudinary = require('../utils/Cloudinary')

const addImage = async (req, res) => {
    try {
        const { name, location, feature, link, collectionId, orderIndex } = req.body;
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
            collectionId: collectionId || null,
            orderIndex: orderIndex || 0,
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

const displayGallery = async (req, res) => {
    try {
        const gallery = await GalleryModel
            .find()
            .populate('collectionId', 'name')   // brings in collection name
            .sort({ _id: -1 });

        if (gallery.length === 0) {
            return res.status(404).json({ message: "No images" });
        }

        res.status(200).json({
            success: true,
            message: "Gallery retrieved",
            gallery: gallery
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

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

        // Handle collectionId — allow setting to null to unassign
        if (req.body.collectionId !== undefined) {
            gallery.collectionId = req.body.collectionId || null;
        }

        // Handle orderIndex — allow 0 as a valid value so check undefined explicitly
        if (req.body.orderIndex !== undefined) {
            gallery.orderIndex = Number(req.body.orderIndex);
        }

        if (req.file) {
            const { path: url, filename: public_id } = req.file;
            gallery.images = [{ url, public_id }];
        }

        await gallery.save();

        res.status(200).json({
            message: "Gallery updated successfully",
            success: true,
            gallery: gallery
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating gallery",
            success: false,
            error: error.message
        });
    }
};

const deleteGallery = async (req, res) => {
    try {
        const { _id } = req.params;

        const gallery = await GalleryModel.findById(_id);

        if (!gallery) {
            return res.status(400).json({ message: "Gallery not found" });
        }

        for (const image of gallery.images) {
            await cloudinary.uploader.destroy(image.public_id);
        }

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

const featureDisplay = async (req, res) => {
    try {
        const featuredImage = await GalleryModel
            .find({ feature: true })
            .populate('collectionId', 'name')
            .limit(4);

        res.status(200).json({
            message: "Featured images retrieved",
            success: true,
            featuredImage: featuredImage
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching featured images",
            success: false,
            error: error.message
        });
    }
};

module.exports = { addImage, displayGallery, editGallery, deleteGallery, featureDisplay };