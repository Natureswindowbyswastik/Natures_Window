require("../connection/conn"); // connect to DB
const slugify = require("slugify");
const Blog = require("../model/Blog");

(async () => {
  const blogs = await Blog.find();

  for (const blog of blogs) {
    if (!blog.slug) {
      blog.slug = slugify(blog.heading, { lower: true, strict: true });
      await blog.save();
    }
  }

  console.log("Slugs added successfully");
  process.exit();
})();
