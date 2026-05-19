// routes/collectionRoutes.js
const router = require("express").Router();
const {
  createCollection, getCollections, deleteCollection,
  assignToCollection, reorderImages, getCollectionImages,updateCollection
} = require('../controller/CollectionController');

router.post('/create', createCollection);
router.get('/all', getCollections);
router.delete('/delete/:_id', deleteCollection);
router.put('/assign', assignToCollection);
router.put('/reorder', reorderImages);
router.get('/images/:collectionId', getCollectionImages);
router.put('/update/:_id', updateCollection);

module.exports = router;