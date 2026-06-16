export function getBlogImage(images) {
  if (!images) return '';
  return Array.isArray(images) ? images[0] : images;
}

export function getBlogPath(blog) {
  return `/blog/${blog.slug || blog._id}`;
}
