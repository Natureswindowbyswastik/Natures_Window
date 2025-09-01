import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { FEATURED_IMAGES } from "../constants/Constants";
function Home() {

  useEffect(() => {
    AOS.init({ duration: "1200" });
  }, []);

  const [gallery, setGallery] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [featuredImages, setFeaturedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch featured images from the backend
 useEffect(() => {
    setFeaturedImages(FEATURED_IMAGES);
    setSelectedImage(FEATURED_IMAGES[0].images[0].url); // Set first image by default
  }, []);

  // ✅ Handle image hover
  const handleHoverImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/gallery/showimage`);

        setGallery(response.data.gallery ); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);
  


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="home h-full">
        {/* Background Slider */}
        <div className="">
          <div className="relative"  >
            <img
              src="https://res.cloudinary.com/dj010hm7j/image/upload/v1737966313/DSC_0031_b1ini2.jpg"
              alt=""
          
              className="w-full h-screen flex object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/100"></div>
          </div>
          <div className="absolute h-fit md:w-fit w-full top-1/2 md:top-1/3" data-aos="fade-up">
            <div className="p-4 md:p-10 rounded-md text-left">
              <h1 className="text-4xl md:text-7xl font-bold">
                <span className="text-yellow">Nature's</span> Window
              </h1>
              <p className="text-2xl">By</p>
              <p className="text-xl md:text-4xl">Swastik Sharma</p>
            </div>
          </div>
        </div>

        {/* Image Display on Hover */}
        <div className="w-full h-[fit] overflow-hidden flex flex-col items-center">
          <div className="w-full md:w-[95%] md:h-[60%] h-full relative rounded-md">
            <div className="imagecontainer">
              {selectedImage && (
                <motion.img
                  key={selectedImage} // Ensures animation triggers on change
                  src={selectedImage}
                  alt="Selected"
                  className="w-full object-cover h-screen rounded-md"
                  initial={{ opacity: 0.8, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.8, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-white/10 to-black/50"></div>
              <div className="absolute grid grid-cols-4 text-center inset-0 cursor-pointer">
                {featuredImages.map((item, index) => (
                  <div
                    key={index}
                    onMouseOver={() => handleHoverImage(item.images[0]?.url)}
                    className="sliderimg group imagechange"
                  >
                    <h1 className="relative h-40 font-bold text-2xl px-4 py-2 group-hover:text-yellow transform duration-300 ease-in-out">
                      <span className="absolute inset-0 translate-y-[-100%] bg-black group-hover:translate-y-0 transition-transform duration-500 ease-in-out md:block hidden"></span>
                      <p className="textchange relative z-10 md:text-3xl text-xl text-center ">
                        {item.name} <br />{" "}
                        <span className="text-sm">{item.location}</span>
                      </p>
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="w-full md:h-screen text-white overflow-hidden flex justify-center items-center text-center">
          <div className="h-[80%] relative md:overflow-hidden flex justify-center items-center">
            <img
              src="https://res.cloudinary.com/dj010hm7j/image/upload/v1737389656/DSC_3868_eaosja.jpg"
              alt=""
              className="object-center"
          
            />
            <div className="absolute inset-0 bg-gradient-to-b bg-black/50"></div>
            <div className="absolute inset-0 flex justify-center items-center text-yellow">
              <div className="border-4 md:w-[70%]" data-aos="fade-down">
                <p className="text-white text-xs md:text-4xl">
                  <span className="text-yellow text-xs md:text-6xl">"</span> Nature is my
                  muse, and it's been my passion to convey its beauty and
                  significance through photography.
                  <span className="text-yellow text-xs md:text-6xl">"</span>
                </p>
                <br />
                <p className="md:text-3xl text-xs">Frans Lanting</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="h-fit flex flex-col items-center justify-center">
  <h1 className="text-3xl font-bold p-4" data-aos="fade-down">
    View Through Our Lens
  </h1>
  <div className="grid grid-cols-1 md:grid-cols-5 md:grid-rows-2 gap-2 w-[90%]">
    {gallery.length === 0 ? (
      <p>No images Available</p>
    ) : (
      gallery.slice(0, 7).map((image, index) => ( // Only show the first 7 images
        <div
          key={image._id}
          className={`group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-500 ease-in-out 
            ${index % 2 === 0 ? "row-span-3" : "row-span-2"}`}
          onClick={() => setSelectedImage(image)}
          data-aos="fade-down"
        >
          {/* Image */}
          <img
            src={image.images[0]?.url}
            alt={image.name}
            className={`w-full h-full object-cover rounded-md transition-opacity duration-700 ease-in-out`}
          />

          {/* Hover Text Effects */}
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
            <h1 className="text-xl font-bold">{image.name}</h1>
            <h3 className="text-lg">{image.location}</h3>
          </div>
        </div>
      ))
    )}
  </div>
  <div className="p-4" data-aos="fade-left">
    <Link to="/collection">
      <Button text="View More" />
    </Link>
  </div>
</div>

        <Footer />
      </div>
    </>
  );
}

export default Home;