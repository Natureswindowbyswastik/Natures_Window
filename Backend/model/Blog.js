const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
      },
      subheading: {
        type: String,
        required: true
      },
      images: {
        type: [String], 
        required: true
      },
      descriptions: {
        type: String,
        required: true
      },
      link: {
        type: String, // Accepts any URL
        required: false // Link is optional
      }
    });
    const BlogModel = mongoose.model("Blog", BlogSchema);
    module.exports = BlogModel;