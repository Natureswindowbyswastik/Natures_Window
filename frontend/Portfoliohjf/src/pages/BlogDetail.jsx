import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/blog/slug/${slug}`
        );
        setBlog(res.data);
  
        console.log(res.data)
      } catch (err) {
        console.error(err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);
  

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center pt-24">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 pt-24">
        <p className="text-xl">Blog not found.</p>
        <button
          onClick={() => navigate("/blog")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <section className="m-h-screen pt-24 bg-gray-50">
      <button
          onClick={() => navigate("/blogs")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Go back
        </button>
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
