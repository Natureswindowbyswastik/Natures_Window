import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/blog/showblog`);
        setBlogs(response.data.blog);
        if (response.data.blog.length > 0) {
          setCurrentBlog(response.data.blog[0]); 
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  
  return (
    <>
    <section>

      <div className="relative w-full h-[100vh] flex justify-center items-center overflow-x-hidden">
        <img
          src="https://res.cloudinary.com/dj010hm7j/image/upload/v1740675154/dynamic/cpyuw83b2nxfr7djlfdz.jpg"
          alt="Nature"
          data-aos="fade-down"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80"></div>
        <div className="text-white p-6 md:p-10 rounded-md text-center flex flex-col md:w-[60%]" data-aos="fade-up">
          <h1 className="text-yellow/80 text-3xl md:text-7xl font-bold">
            A Glimpse into My World
          </h1>
          <p className="mt-4 text-sm md:text-2xl">
            Exploring, capturing, and sharing the magic of the world—one journey at a time.
          </p>
        </div>
      </div>
    </section>

    <section className="h-screen ">
      <div className="justify-center items-center flex ">
        <p className="text-6xl border-b-2 text-left w-[85%] flex text-yellow font-bold">Stories</p>
      </div>

  <div className="flex justify-center items-center w-full">
  <div className="w-[90%] p-4">

    {blogs.length === 0 && !loading ? (
      <p className="text-xl text-center">No blogs available</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="group  overflow-hidden  
                       hover:shadow-xl hover:-translate-y-1 transition-all duration-300  "
          >
            <div className="w-full h-56 overflow-hidden relative">
              <img
                src={blog.images}
                alt={blog.heading}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <p className="text-2xl font-bold line-clamp-2 absolute  text-yellow    w-fit h-fit bottom-0 left-0 pr-5 py-1 text-left flex  bg-black  ">
                {blog.heading}
              </p>

            </div>
     
            <div className=" flex flex-col gap-3 mt-2">
              
              <p className="uppercase  text-xs tracking-widest text-gray-500 font-semibold">
                {blog.subheading}
              </p>

              <p className="text-sm text-gray-600 line-clamp-3">
                {blog.descriptions}
              </p>


              <div className="mt-4">
               <Link
  to={`/blog/${blog._id}`}
  state={{ blog }}
  className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
>
  Read more →
</Link>
              </div>
            </div>
          </div>
        ))}

      </div>
    )}
  </div>

        </div>
   
    </section>
   
    </>
   
  );
}

export default BlogPage;
