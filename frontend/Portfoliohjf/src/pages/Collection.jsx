import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaComment } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import { IoArrowBack as IoArrowBackIcon } from "react-icons/io5"; // Renamed for clarity
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

function Collection() {
  const [collections, setCollections] = useState([]);
  const [activeCollection, setActiveCollection] = useState(null); 
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    AOS.init({ duration: 1200 });
  }, []); // Added missing dependency array to prevent repeated initializations

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[90%]">
              {collections.length === 0 ? (
                <p className="text-white/40 col-span-3 text-center">No collections available.</p>
              ) : (
                collections.map((col) => (
                  <div
                    key={col._id}
                    onClick={() => handleOpenCollection(col)}
                    data-aos="fade-up"
                    className="relative h-72 rounded-2xl overflow-hidden cursor-pointer group shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
                  >
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

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 text-center">
                      <p className="text-2xl font-bold text-yellow">{col.name}</p>
                      {col.description && (
                        <p className="text-sm text-white/70 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

        {/* ── COLLECTION IMAGES VIEW (Optimized Masonry) ── */}
        {activeCollection && (
          <>
            <div className="w-[90%] mb-8" data-aos="fade-right">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-white/60 hover:text-white transition mb-4 text-sm"
              >
                <IoArrowBackIcon size={18} /> Back to collections
              </button>
              <p className="text-4xl md:text-5xl font-bold text-yellow">{activeCollection.name}</p>
              {activeCollection.description && (
                <p className="text-white/50 mt-2 text-lg">{activeCollection.description}</p>
              )}
            </div>

            {/* CSS Columns Masonry Container */}
            <div className="w-[90%] columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {loading ? (
                <p className="text-center py-10 text-white/50 w-full col-span-full">Loading...</p>
              ) : gallery.length === 0 ? (
                <p className="text-center py-10 text-white/40 w-full col-span-full">No images in this collection.</p>
              ) : (
                gallery.map((image) => (
                  <div
                    key={image._id}
                    className="break-inside-avoid relative overflow-hidden rounded-lg cursor-pointer group bg-zinc-900"
                    onClick={() => setSelectedImage(image)}
                    data-aos="fade-up"
                  >
                    <img
                      src={image.images[0]?.url}
                      alt={image.name}
                      className="w-full h-auto object-contain rounded-md display:block transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                      <h1 className="text-lg font-bold text-white">{image.name}</h1>
                      {image.location && (
                        <span className="text-sm text-white/80 flex items-center gap-1 mt-1">
                          <FaLocationDot size={12} className="text-yellow" />
                          {image.location}
                        </span>
                      )}
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
            className="fixed inset-0 bg-black/95 flex flex-col justify-center items-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col rounded-xl overflow-hidden bg-zinc-950 p-4 border border-white/10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header Context */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <img
                    src="https://res.cloudinary.com/dj010hm7j/image/upload/v1739257707/IMG_8901_j7tp5n.jpg"
                    alt="Logo"
                    className="w-10 h-10 rounded-full object-cover border border-yellow/50"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-yellow flex items-center gap-1 leading-tight">
                      Nature's <span>Window</span>
                    </h2>
                    {selectedImage.location && (
                      <span className="text-xs flex items-center gap-1 text-white/60 mt-0.5">
                        <FaLocationDot size={10} />
                        {selectedImage.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Center Image Container - Preserves pure aspect ratio dynamically */}
              <div className="flex-1 flex items-center justify-center overflow-hidden min-h-0">
                <img
                  src={selectedImage.images[0]?.url}
                  alt={selectedImage.name}
                  className="max-w-full max-h-[60vh] object-contain rounded"
                />
              </div>

              {/* Modal Footer Controls */}
              <div className="pt-3 mt-3 border-t border-white/10">
                <div className="flex gap-4 mb-2">
                  <button className="hover:scale-110 transition-transform">
                    <FaHeart className="text-red-500 text-xl" />
                  </button>
                  <button className="hover:scale-110 transition-transform">
                    <FaComment className="text-xl text-white/70 hover:text-white" />
                  </button>
                </div>
                <div>
                  <span className="font-semibold text-lg text-white">{selectedImage.name}</span>
                </div>
                {selectedImage.link && (
                  <a
                    href={selectedImage.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-sm text-yellow/70 hover:text-yellow hover:underline transition"
                  >
                    Explore More →
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