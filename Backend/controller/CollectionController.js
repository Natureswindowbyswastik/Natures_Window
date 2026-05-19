// controller/CollectionController.js
const Collection = require('../model/Collection');
const Gallery = require('../model/Gallery');

const createCollection = async (req, res) => {
  try {
    const { name, description } = req.body;
    const collection = new Collection({ name, description });
    await collection.save();
    res.status(201).json({ success: true, collection });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, collections });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const deleteCollection = async (req, res) => {
  try {
    const { _id } = req.params;
    // Unassign all images in this collection
    await Gallery.updateMany({ collectionId: _id }, { collectionId: null, orderIndex: 0 });
    await Collection.findByIdAndDelete(_id);
    res.status(200).json({ success: true, message: "Collection deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Assign an image to a collection
const assignToCollection = async (req, res) => {
  try {
    const { galleryId, collectionId, orderIndex } = req.body;
    const gallery = await Gallery.findByIdAndUpdate(
      galleryId,
      { collectionId: collectionId || null, orderIndex: orderIndex ?? 0 },
      { new: true }
    );
    res.status(200).json({ success: true, gallery });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Reorder images within a collection — receives array of { _id, orderIndex }
const reorderImages = async (req, res) => {
  try {
    const { orderedImages } = req.body; // [{ _id, orderIndex }]
    const ops = orderedImages.map(({ _id, orderIndex }) =>
      Gallery.findByIdAndUpdate(_id, { orderIndex })
    );
    await Promise.all(ops);
    res.status(200).json({ success: true, message: "Reordered" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all images in a collection, sorted by orderIndex
const getCollectionImages = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const images = await Gallery.find({ collectionId }).sort({ orderIndex: 1 });
    res.status(200).json({ success: true, images });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
const updateCollection = async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, description, coverImage } = req.body;

    const collection = await Collection.findById(_id);
    if (!collection) {
      return res.status(404).json({ success: false, message: "Collection not found" });
    }

    if (name !== undefined) collection.name = name;
    if (description !== undefined) collection.description = description;
    if (coverImage !== undefined) collection.coverImage = coverImage;

    await collection.save();

    res.status(200).json({ success: true, collection });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { createCollection, getCollections, deleteCollection, assignToCollection, reorderImages, getCollectionImages, updateCollection };

