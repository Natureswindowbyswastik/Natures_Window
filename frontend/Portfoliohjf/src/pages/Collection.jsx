import React, { useState,useEffect } from "react";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { FaCameraRetro } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
function Collection() {

  const [selectedImage, setSelectedImage] = useState(null);
    const [gallery,setGallery] = useState([]);
      const [error,setError]=useState(null);
      const [loading, setLoading] = useState(false);
  useEffect(()=>{
    const fetchGallery = async ()=>{
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/gallery/showimage`);
        setGallery(response.data.gallery);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchGallery();
  },[]);
    useEffect(()=>{
      AOS.init({duration:"1200"})
    })
  return (
    <>
      {/* Hero Section */}
      <div className="w-full h-screen text-white">
        <div className="relative w-full h-screen">
          {/* Background Image */}
          <div className="relative flex justify-center items-center w-full h-full" >
            <img
              src="https://res.cloudinary.com/dj010hm7j/image/upload/v1740656105/dynamic/ncew2yoioznjckoegviu.jpg"
              alt="Nature"
              className="absolute w-full h-full object-cover "  data-aos="fade-right"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/100"></div>
            {/* Text Content */}
            <div className="absolute flex justify-center items-center px-4 w-full">
              <div className="text-white p-6 md:p-10 rounded-md text-center flex flex-col md:w-[60%]" data-aos="fade-up">
                <h1 className="text-3xl md:text-7xl font-bold">
                “Great photography is about depth of feeling, not depth of field” 
                </h1>
                <p className="mt-4 text-yellow/80  text-sm md:text-2xl">
                - Peter Adams
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Masonry Image Gallery */}
      <div className="bg-black text-white flex flex-col justify-center items-center w-full min-h-full py-10">
        <div className="gallery grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-[90%] cursor-pointer">
          <div className="col-span-2 row-span-2" data-aos="fade-right">
            <p className="text-6xl text-yellow font-bold">
              Journery of Frames
            </p>
            <p className="text-2xl">
            Where perspective shapes the unseen.
            </p>
            
          </div>
        {gallery.length === 0?(
          <p>No images Available</p>
        ):(
          gallery.map((image,index)=>(
            <div
            key={image._id}
            className={`group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-500 ease-in-out 
              ${index % 2 === 0 ? "row-span-2" : "row-span-1"}`}
            onClick={() => setSelectedImage(image)}  data-aos="fade-right"
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
      </div>

      {/* Full-Screen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center  z-10"
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="object-contain  w-[auto] md:h-[90%] rounded-lg shadow-lg   bg-black p-2 "
              initial={{ scale: 0.4 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-left flex flex-col   text-black ">
                <div className="flex items-center gap-1 ">
                  <img src="https://res.cloudinary.com/dj010hm7j/image/upload/v1739257707/IMG_8901_j7tp5n.jpg" alt="" className="w-[40px] h-[40px] rounded-full" />
                <span className="text-2xl font-bold text-yellow">Nature's <span>Window</span></span>
                </div>
              
                <span className="text-sm flex items-center p-2 gap-3 text-white"> <FaLocationDot /><span> {selectedImage.location} </span></span>
              </div>
              <img
                src={selectedImage.images[0]?.url}
                alt=""
                className=" md:h-[75%] text-black w-full  "
              />
              <div className=" text-text-2xl p-2">
                <div className="flex gap-4">
                  <FaHeart className="text-red text-2xl" />
                  <FaComment className="text-2xl text-gray-700" />
                </div>
                <div className=" text-white">
                  <span className="font-semibold text-xl ">{selectedImage.name}</span>
                </div>
                {selectedImage.link && (
              <a
                href={selectedImage.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-yellow/40 hover:underline"
              >
                 Explore More 
              </a>
            )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default Collection;