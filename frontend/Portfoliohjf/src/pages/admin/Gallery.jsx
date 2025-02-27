import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import AddGallery from './popups/AddGallery';
import EditGallery from './popups/EditGallery';
import DeleteGallery from './popups/DeleteGallery';

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState(null);
  const [showAddGallery, setShowAddGallery] = useState(false);
  const [showEditGallery, setShowEditGallery] = useState(false);
  const [currentGallery, setCurrentGallery] = useState(null);
  const [galleryToDelete, setGalleryToDelete] = useState(null);
  const [showDeleteGallery, setShowDeleteGallery] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/gallery/showimage');
        setGallery(response.data.gallery);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <>
      <div className=" p-4">
        <div className="flex flex-col gap-20">
          <div className="flex flex-row justify-around">
            <p className="text-4xl font-bold">Gallery Section</p>
            <Button text="Add More" onClick={() => setShowAddGallery(true)} />
          </div>

          <div className="flex flex-wrap justify-center gap-6 p-6">
            {gallery.length === 0 ? (
              <p className="text-xl">No images available</p>
            ) : (
              gallery.map((img) => (
                <div
                  key={img._id}
                  className="w-full md:w-[30%] bg-white/20 rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={img.images[0]?.url}
                    alt={img.name}
                    className="w-full h-64 object-cover p-4"
                  />
                  <div className="p-4 bg-white/10 flex flex-row justify-between">
                    <div>
                      <p className="text-2xl uppercase font-bold">{img.name}</p>
                      <p className="text-xl">{img.location}</p>
                      {/* Display Featured Status */}
                      {img.feature && (
                        <span className="inline-block bg-green-500 text-white text-sm px-2 py-1 rounded-full mt-2">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col text-2xl gap-2">
                      <button
                        onClick={() => {
                          setCurrentGallery(img);
                          setShowEditGallery(true);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => {
                          setGalleryToDelete(img);
                          setShowDeleteGallery(true);
                        }}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {showAddGallery && (
          <AddGallery
            showAddGallery={showAddGallery}
            setShowAddGallery={setShowAddGallery}
          />
        )}
        {showEditGallery && (
          <EditGallery
            showEditGallery={showEditGallery}
            setShowEditGallery={setShowEditGallery}
            currentGallery={currentGallery}
          />
        )}
        {showDeleteGallery && (
          <DeleteGallery
            showDeleteGallery={showDeleteGallery}
            setShowDeleteGallery={setShowDeleteGallery}
            galleryToDelete={galleryToDelete}
          />
        )}
      </div>
    </>
  );
}

export default Gallery;