const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
name:{
    type:String,
    required: true,
},
location:{
    type:String,
    required:true,
},
images: [{
  url: { type: String, required: true },
    public_id: { type: String, required: true }
}],
feature:{
  type:Boolean,
  default:false,
},
link: {
  type: String, 
  required: false 
},
collectionId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Collection",
  default: null
},
orderIndex: {
  type: Number,
  default: 0
},
})

const GalleryModel = mongoose.model("Gallery", GallerySchema);
module.exports = GalleryModel;