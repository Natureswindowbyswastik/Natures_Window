import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import homeimg from '../assets/images/IMG_1566.JPG'
import { FaLocationDot, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

// ⚡ 1. High-Quality Parameter Optimizer (Reserved for Slider Content)
const getHighQualityUrl = (url) => {
  if (!url) return "";
  if (url.includes("res.cloudinary.com")) {
    return url.replace("/upload/", "/upload/f_auto,q_auto:good,w_1920,c_limit/");
  }
  return url;
};

// ⚡ 2. New Dynamic Thumbnail Parameter Optimizer (Speeds up the Grid down to kilobytes)
const getThumbnailUrl = (url) => {
  if (!url) return "";
  if (url.includes("res.cloudinary.com")) {
    // f_auto: Serves WebP/AVIF formats to modern phones & desktops automatically
    // q_auto:eco: Employs economy compression (perfect for fast-loading masonry grids)
    // w_600: Downscales width to a crisp 600px breakpoint since it doesn't need 1920px here
    return url.replace("/upload/", "/upload/f_auto,q_auto:eco,w_600,c_limit/");
  }
  return url;
};

function Home() {

  useEffect(() => {
    AOS.init({ duration: "1200" });
  }, []);

  const [gallery, setGallery] = useState([]);
  const [featuredImages, setFeaturedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTextVisible, setIsTextVisible] = useState(true);
  
  // Touch coordinate tracker state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Concurrent API data fetching engine
  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      const API_BASE = import.meta.env.VITE_REACT_APP_API_URL;
      
      try {
        const [galleryRes, featuredRes] = await Promise.all([
          axios.get(`${API_BASE}/gallery/showimage`),
          axios.get(`${API_BASE}/gallery/featured`)
        ]);

        if (galleryRes.data?.gallery) {
          setGallery(galleryRes.data.gallery);
        }
        
        if (featuredRes.data?.featuredImage) {
          setFeaturedImages(featuredRes.data.featuredImage);
        }
      } catch (err) {
        setError(err.message || "Failed to retrieve imagery content.");
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  useEffect(() => {
    setIsTextVisible(true);
    const timer = setTimeout(() => {
      setIsTextVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleMouseEnter = () => {
    setIsTextVisible(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === featuredImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) return <p className="text-white text-center py-24 bg-black h-screen">Loading beautiful visuals...</p>;
  if (error) return <p className="text-red-500 text-center py-24 bg-black h-screen">Error: {error}</p>;

  const currentImageObj = featuredImages[currentIndex]?.images?.[0]?.url;
  const currentName = featuredImages[currentIndex]?.name;
  const currentLoc = featuredImages[currentIndex]?.location;

  return (
    <>
      <div className="home h-full bg-black text-white">
        {/* Background Hero Banner */}
        <div className="relative">
          <div className="relative">
            <img
              src={homeimg}
              alt="Nature's Window Hero Banner"
              // ⚡ 3. Added fetchpriority="high" to load your main hero banner immediately before other assets
              fetchpriority="high"
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

        {/* Responsive Full-Width Carousel Section with Auto-Dimming Text */}
        {featuredImages.length > 0 && (
          <div 
            onMouseEnter={handleMouseEnter}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="w-full aspect-[3/2] md:h-screen relative overflow-hidden group border-b border-white/5 bg-black"
          >
            {/* Active Slideshow Framework */}
            {currentImageObj && (
              <div className="w-full h-full relative">
                <img
                  src={getHighQualityUrl(currentImageObj)}
                  alt={currentName || "Featured Slider Image"}
                  className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                />
                <div className={`absolute inset-0 transition-colors duration-500 bg-black/40 lg:bg-black/25 ${
                  isTextVisible ? "lg:group-hover:bg-black/60" : "lg:group-hover:bg-black/30"
                }`}></div>
              </div>
            )}

            {/* Completely Centered Content Details */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none transition-all duration-700 ease-in-out ${
              isTextVisible 
                ? "opacity-100 lg:opacity-0 lg:group-hover:opacity-100 translate-y-0" 
                : "opacity-0 pointer-events-none translate-y-2"
            }`}>
              <h2 className="text-xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-wide uppercase drop-shadow-2xl px-2">
                {currentName}
              </h2>
              {currentLoc && (
                <p className="text-yellow flex items-center justify-center gap-1.5 sm:gap-2 mt-1 sm:mt-4 text-xs sm:text-lg md:text-2xl font-medium tracking-wider drop-shadow">
                  <FaLocationDot className="text-[10px] sm:text-base" />
                  {currentLoc}
                </p>
              )}
            </div>

            {/* Render directional triggers and dot tracking navigation flags */}
            {featuredImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="hidden lg:block absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-4 rounded-full bg-black/50 text-white border border-white/10 hover:bg-yellow hover:text-black opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm z-20 shadow-2xl active:scale-95"
                  aria-label="Previous Image"
                >
                  <FaChevronLeft className="text-sm sm:text-xl md:text-2xl" />
                </button>
                <button
                  onClick={handleNext}
                  className="hidden lg:block absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-4 rounded-full bg-black/50 text-white border border-white/10 hover:bg-yellow hover:text-black opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm z-20 shadow-2xl active:scale-95"
                  aria-label="Next Image"
                >
                  <FaChevronRight className="text-sm sm:text-xl md:text-2xl" />
                </button>

                <div className="absolute bottom-3 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-3 z-20 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
                  {featuredImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-1 sm:h-2.5 rounded-full transition-all duration-300 ${
                        index === currentIndex ? "w-4 sm:w-10 bg-yellow" : "w-1 sm:w-2.5 bg-white/40 hover:bg-white/80"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Quote Section */}
        <div className="w-full md:h-screen text-white overflow-hidden flex justify-center items-center text-center">
          <div className="h-[80%] relative md:overflow-hidden flex justify-center items-center">
            <img
              src="https://res.cloudinary.com/dj010hm7j/image/upload/v1737389656/DSC_3868_eaosja.jpg"
              alt="Frans Lanting Quote Backdrop"
              // ⚡ 4. Added native loading="lazy" to delay loading this image until scrolled near
              loading="lazy"
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
          <div className="w-[90%] columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {gallery.length === 0 ? (
              <p className="text-white/40 text-center py-12 w-full col-span-full">No images available at the moment.</p>
            ) : (
              gallery.slice(0, 8).map((image) => (
                <div
                  key={image._id}
                  className="break-inside-avoid relative overflow-hidden rounded-xl cursor-pointer group bg-zinc-900 shadow-md border border-white/5"
                  data-aos="fade-up"
                >
                  <img
                    // ⚡ 5. CHANGED HERE: Swapped from getHighQualityUrl to getThumbnailUrl
                    src={getThumbnailUrl(image.images[0]?.url)}
                    alt={image.name}
                    // ⚡ 6. Added loading="lazy" so images load smoothly as the user scrolls
                    loading="lazy"
                    className="w-full h-auto object-contain block transition-transform duration-500 group-hover:scale-[1.02]"
                  />

                  {/* Clean Bottom Text Overlay */}
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