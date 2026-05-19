// model/Collection.js
const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  coverImage: { type: String, default: "" }, // optional, Cloudinary URL
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Collection", CollectionSchema);