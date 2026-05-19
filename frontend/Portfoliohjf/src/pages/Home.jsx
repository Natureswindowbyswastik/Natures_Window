import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { FEATURED_IMAGES } from "../constants/Constants";
import homeimg from '../assets/images/IMG_1566.JPG';
import { FaLocationDot } from "react-icons/fa6"; // Added for clean icons uniform style

function Home() {
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [featuredImages, setFeaturedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  // Fetch featured images from constants
  useEffect(() => {
    if (FEATURED_IMAGES && FEATURED_IMAGES.length > 0) {
      setFeaturedImages(FEATURED_IMAGES);
      setSelectedImage(FEATURED_IMAGES[0].images[0]?.url || null);
    }
  }, []);

  const handleHoverImage = (imageUrl) => {
    if (imageUrl) setSelectedImage(imageUrl);
  };

  // Fetch gallery images from API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/gallery/showimage`);
        setGallery(response.data.gallery || []); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center"><p>Loading...</p></div>;
  if (error) return <div className="min-h-screen bg-black text-white flex items-center justify-center"><p>Error: {error}</p></div>;

  return (
    <>
      <div className="home h-full bg-black text-white">
        {/* Hero Banner Section */}
        <div className="relative w-full h-screen">
          <img
            src={homeimg}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black"></div>
          <div className="absolute h-fit md:w-fit w-full top-1/2 md:top-1/3 transform -translate-y-1/2 md:translate-y-0 z-10" data-aos="fade-up">
            <div className="p-4 md:p-10 rounded-md text-left">
              <h1 className="text-4xl md:text-7xl font-bold leading-tight">
                <span className="text-yellow">Nature's</span> Window
              </h1>
              <p className="text-2xl mt-2">By</p>
              <p className="text-xl md:text-4xl font-light text-white/90">Swastik Sharma</p>
            </div>
          </div>
        </div>

        {/* Interactive Showcase Section (Hover Slider) */}
        <div className="w-full h-screen overflow-hidden flex flex-col items-center justify-center px-4 py-12">
          <div className="w-full md:w-[95%] h-full relative rounded-xl overflow-hidden shadow-2xl bg-zinc-950">
            {selectedImage && (
              <motion.img
                key={selectedImage}
                src={selectedImage}
                alt="Selected Showcase"
                className="w-full h-full object-contain" // Changed from object-cover to preserve true asset ratio in display container
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40"></div>
            
            {/* Hover Trigger Overlays */}
            <div className="absolute bottom-0 inset-x-0 grid grid-cols-2 md:grid-cols-4 text-center cursor-pointer z-10">
              {featuredImages.map((item, index) => (
                <div
                  key={index}
                  onMouseEnter={() => handleHoverImage(item.images[0]?.url)}
                  className="border-t border-white/10 bg-black/40 backdrop-blur-xs p-6 hover:bg-black/80 transition-colors duration-300 group"
                >
                  <p className="text-sm uppercase tracking-wider text-white/40 group-hover:text-yellow transition-colors">Featured {index + 1}</p>
                  <h3 className="font-bold text-lg md:text-xl text-white mt-1 group-hover:scale-[1.02] transition-transform">
                    {item.name}
                  </h3>
                  <span className="text-xs text-white/60 block mt-0.5">{item.location}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote Interstitial Section */}
        <div className="w-full py-20 text-white overflow-hidden flex justify-center items-center text-center px-4">
          <div className="max-w-5xl relative rounded-2xl overflow-hidden shadow-xl group">
            <img
              src="https://res.cloudinary.com/dj010hm7j/image/upload/v1737389656/DSC_3868_eaosja.jpg"
              alt="Quote Background Landscape"
              className="w-full h-auto max-h-[60vh] object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs"></div>
            <div className="absolute inset-0 flex justify-center items-center p-6 text-yellow">
              <div className="border border-yellow/30 bg-black/30 backdrop-blur-md p-6 md:p-12 rounded-xl max-w-2xl" data-aos="fade-down">
                <p className="text-white text-sm md:text-2xl font-light italic leading-relaxed">
                  "Nature is my muse, and it's been my passion to convey its beauty and significance through photography."
                </p>
                <p className="md:text-xl text-xs mt-4 font-semibold tracking-wider text-yellow/90 uppercase">— Frans Lanting</p>
              </div>
            </div>
          </div>
        </div>

        {/* Optimized Gallery Grid Section (Masonry Flow) */}
        <div className="w-full flex flex-col items-center justify-center py-12 bg-zinc-950/40">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight" data-aos="fade-down">
            View Through Our Lens
          </h2>
          
          {/* CSS Multi-Column wrapper matching your Collection component layout */}
          <div className="w-[90%] columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {gallery.length === 0 ? (
              <p className="text-white/40 text-center py-12 w-full col-span-full">No images available at the moment.</p>
            ) : (
              gallery.slice(0, 8).map((image) => ( // Changed slice count to 8 for balanced layouts across multi-column steps
                <div
                  key={image._id}
                  className="break-inside-avoid relative overflow-hidden rounded-xl cursor-pointer group bg-zinc-900 shadow-md border border-white/5"
                  data-aos="fade-up"
                >
                  <img
                    src={image.images[0]?.url}
                    alt={image.name}
                    className="w-full h-auto object-contain block transition-transform duration-500 group-hover:scale-[1.02]"
                  />

                  {/* Clean Bottom Text Overlay matching your theme */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                    <h3 className="text-lg font-bold text-white leading-tight">{image.name}</h3>
                    {image.location && (
                      <span className="text-xs text-white/80 flex items-center gap-1 mt-1">
                        <FaLocationDot size={12} className="text-yellow" />
                        {image.location}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="mt-12" data-aos="fade-up">
            <Link to="/collection">
              <Button text="View All Collections" />
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Home;