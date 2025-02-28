import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer";

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
          setCurrentBlog(response.data.blog[0]); // Set first blog as default
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

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
  };

  return (
    <>
    <div className="h-full ">
      {/* Hero Section */}
      <div className="relative w-full h-[100vh] flex justify-center items-center overflow-x-hidden">
        <img
          src="https://res.cloudinary.com/dj010hm7j/image/upload/v1740675154/dynamic/cpyuw83b2nxfr7djlfdz.jpg"
          alt="Nature"
          data-aos="fade-down"
          className="absolute inset-0 w-full h-full object-cover"
         
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80"></div>
        <div className="text-white p-6 md:p-10 rounded-md text-center flex flex-col md:w-[60%]"  data-aos="fade-up" >
                <h1 className="text-yellow/80 text-3xl md:text-7xl font-bold">
                  A Glimpse into My World
                </h1>
                <p className="mt-4 text-sm md:text-2xl">
                  Exploring, capturing, and sharing the magic of the world—one
                  journey at a time.
                </p>
              </div>
      </div>

      <div className="justify-center items-center flex" >
        <p className="text-6xl border-b-2 text-left w-[85%] flex text-yellow font-bold">
          Stories
        </p>
      </div>

      <div
        className="flex md:flex-row flex-col justify-center items-center gap-10"
        
      >
        <div className="w-[90%] h-full flex flex-col md:flex-row lg:flex-row justify-between lg:gap-20 md:gap-6">
          {/* Blog List */}
          <div className="w-full md:w-1/2 lg:w-1/4 p-4 overflow-x-auto md:overflow-x-auto lg:overflow-y-auto lg:h-[800px] lg:max-h-[800px] md:h-[400px] md:max-h-[400px]">
            {blogs.length === 0 && !loading ? (
              <p className="text-xl">No blogs available</p>
            ) : (
              <div className="flex flex-row md:flex-row lg:flex-col gap-4 w-full md:w-full lg:w-full">
                {blogs.slice(0, 6).map((blog) => (
                  <div
                    key={blog._id}
                    onClick={() => setCurrentBlog(blog)}
                    className={`p-4 rounded-lg cursor-pointer text-white flex-none w-[350px] md:w-[300px] lg:w-full ${
                      currentBlog?._id === blog._id ? "bg-white/10" : ""
                    } transition-all`}
                  >
                    {blog.images?.length > 0 && (
                      <img
                        src={blog.images[0]}
                        alt={blog.heading}
                        className="w-full object-cover rounded-lg mb-2"
                        loading="lazy"
                      />
                    )}
                    <p className="text-xl font-bold truncate text-yellow">{blog.heading}</p>
                    <p className="text-sm truncate">{blog.subheading}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Blog Preview */}
        <div className="w-full md:w-1/2 lg:w-3/4 p-6 rounded-lg flex flex-col gap-4">
  {/* Check if currentBlog is not null and has images */}
  {currentBlog?.images?.length > 0 && (
    <div>
      {currentBlog.images.map((image, index) => (
        <div key={index} className="h-[50vh] md:h-[80vh] ">
          <img
            src={image}
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  )}

  
</div>
        </div>
      </div>
      <Footer />
    </div>
    </>
    
  );
}

export default BlogPage;