import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaComment } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

function Collection() {
  const [collections, setCollections] = useState([]);
  const [activeCollection, setActiveCollection] = useState(null); // full collection object
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all collections on mount
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/collection/all`);
        setCollections(res.data.collections);
      } catch (err) {
        console.error("Failed to fetch collections", err);
      }
    };
    fetchCollections();
  }, []);

  // Fetch images when a collection is selected
  const handleOpenCollection = async (col) => {
    setActiveCollection(col);
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/collection/images/${col._id}`
      );
      setGallery(res.data.images);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setActiveCollection(null);
    setGallery([]);
    setSelectedImage(null);
  };

  useEffect(() => {
    AOS.init({ duration: "1200" });
  });

  return (
    <>
      {/* Hero Section */}
      <div className="w-full h-screen text-white">
        <div className="relative w-full h-screen">
          <div className="relative flex justify-center items-center w-full h-full">
            <img
              src="https://res.cloudinary.com/dj010hm7j/image/upload/v1768226412/sunset_pdkrau.jpg"
              alt="Nature"
              className="absolute w-full h-full object-cover"
              data-aos="fade-right"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/80"></div>
            <div className="absolute flex justify-center items-center px-4 w-full">
              <div className="text-white p-6 md:p-10 rounded-md text-center flex flex-col md:w-[60%]" data-aos="fade-up">
                <h1 className="text-3xl md:text-7xl font-bold">
                  "Great photography is about depth of feeling, not depth of field"
                </h1>
                <p className="mt-4 text-yellow/80 text-sm md:text-2xl">- Peter Adams</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black text-white flex flex-col justify-center items-center w-full min-h-full py-10">

        {/* ── COLLECTION GRID VIEW ── */}
        {!activeCollection && (
          <>
            <div className="mb-10 text-center" data-aos="fade-up">
              <p className="text-5xl md:text-6xl text-yellow font-bold">Journey of Frames</p>
              <p className="text-xl text-white/60 mt-2">Where perspective shapes the unseen.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[90%] shadow">
              {collections.length === 0 ? (
                <p className="text-white/40 col-span-3 text-center">No collections available.</p>
              ) : (
                collections.map((col) => (
                  <div
                    key={col._id}
                    onClick={() => handleOpenCollection(col)}
                    data-aos="fade-up"
                    className="relative h-72 rounded-2xl overflow-hidden cursor-pointer group shadow-sm"
                  >
                    {/* Cover image */}
                    {col.coverImage ? (
                      <img
                        src={col.coverImage}
                        alt={col.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-black/60 flex items-center justify-center">
                        <p className="text-white/30">No cover image</p>
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/60 to-black/60" />

                    {/* Text overlay */}
<div className="absolute inset-0 flex flex-col items-center justify-center p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 text-center">
  <p className="text-2xl font-bold text-yellow">{col.name}</p>
  {col.description && (
    <p className="text-sm text-white/70 mt-1  transition-opacity duration-30`0">
      {col.description}
    </p>
  )}
</div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* ── COLLECTION IMAGES VIEW ── */}
        {activeCollection && (
          <>
            {/* Back button + collection title */}
            <div className="w-[90%] mb-8" data-aos="fade-right">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-white/60 hover:text-white transition mb-4 text-sm"
              >
                <IoArrowBack size={18} /> Back to collections
              </button>
              <p className="text-4xl md:text-5xl font-bold text-yellow">{activeCollection.name}</p>
              {activeCollection.description && (
                <p className="text-white/50 mt-2 text-lg">{activeCollection.description}</p>
              )}
            </div>

            {/* Masonry image grid */}
            <div className="gallery grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-[90%] cursor-pointer">
              {loading ? (
                <p className="col-span-4 text-center py-10 text-white/50">Loading...</p>
              ) : gallery.length === 0 ? (
                <p className="col-span-4 text-center py-10 text-white/40">No images in this collection.</p>
              ) : (
                gallery.map((image, index) => (
                  <div
                    key={image._id}
                    className={`group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-500 ease-in-out
                      ${index % 2 === 0 ? "row-span-2" : "row-span-1"}`}
                    onClick={() => setSelectedImage(image)}
                    data-aos="fade-right"
                  >
                    <img
                      src={image.images[0]?.url}
                      alt={image.name}
                      className="w-full h-full object-cover rounded-md transition-opacity duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                      <h1 className="text-xl font-bold">{image.name}</h1>
                      <h3 className="text-lg">{image.location}</h3>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>

      {/* Full-Screen Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-10"
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="object-contain w-[auto] md:h-[90%] rounded-lg shadow-lg bg-black p-2"
              initial={{ scale: 0.4 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-left flex flex-col text-black">
                <div className="flex items-center gap-1">
                  <img
                    src="https://res.cloudinary.com/dj010hm7j/image/upload/v1739257707/IMG_8901_j7tp5n.jpg"
                    alt=""
                    className="w-[40px] h-[40px] rounded-full"
                  />
                  <span className="text-2xl font-bold text-yellow">
                    Nature's <span>Window</span>
                  </span>
                </div>
                <span className="text-sm flex items-center p-2 gap-3 text-white">
                  <FaLocationDot />
                  <span>{selectedImage.location}</span>
                </span>
              </div>
              <img
                src={selectedImage.images[0]?.url}
                alt=""
                className="md:h-[75%] text-black w-full"
              />
              <div className="text-text-2xl p-2">
                <div className="flex gap-4">
                  <FaHeart className="text-red text-2xl" />
                  <FaComment className="text-2xl text-gray-700" />
                </div>
                <div className="text-white">
                  <span className="font-semibold text-xl">{selectedImage.name}</span>
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
    </>
  );
}

export default Collection;