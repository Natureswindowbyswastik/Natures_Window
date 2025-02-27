const router = require("express").Router();
const {addImage,  displayGallery,editGallery,deleteGallery, featureDisplay}= require('../controller/GalleryController')
const {upload}  = require("../Middleware/Multer")


router.post('/addimage',upload.single('image'), addImage);
router.get('/showimage',  displayGallery);
router.post('/editgallery/:_id',upload.single('image'),editGallery)
router.delete('/deletegallery/:_id',deleteGallery)
router.get('/featured',featureDisplay)
module.exports = router;