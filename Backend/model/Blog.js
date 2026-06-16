const mongoose = require("mongoose");
const slugify = require("slugify");

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
        type: String, 
        required: false    
         },
         slug: { 
          type: String, 
          unique: true
        }

    });

BlogSchema.pre("save", async function (next) {
  if (this.slug || !this.heading) {
    return next();
  }

  const baseSlug = slugify(this.heading, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  while (
    await mongoose.models.Blog.findOne({
      slug,
      _id: { $ne: this._id },
    })
  ) {
    slug = `${baseSlug}-${counter++}`;
  }

  this.slug = slug;
  next();
});

    const BlogModel = mongoose.model("Blog", BlogSchema);
    module.exports = BlogModel;