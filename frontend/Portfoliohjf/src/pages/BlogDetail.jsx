import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BlogDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const blog = state?.blog;

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 pt-24">
        <p className="text-xl">No blog data found.</p>
        <button
          onClick={() => navigate("/blogs")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <section className="min-h-screen pt-24 bg-gray-50">
      {/* pt-24 pushes content below navbar */}

      <div className="max-w-5xl mx-auto p-6">
        <img
          src={blog.images}
          alt={blog.heading}
          className="w-full h-[60vh] object-cover rounded-xl mb-8"
        />

        <h1 className="text-4xl font-bold mb-4">{blog.heading}</h1>
        <p className="uppercase text-sm tracking-widest text-gray-500 mb-4">
          {blog.subheading}
        </p>

        <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
          {blog.descriptions}
        </p>
      </div>
    </section>
  );
}

export default BlogDetail;
