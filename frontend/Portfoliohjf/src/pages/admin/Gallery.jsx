import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import AddGallery from './popups/AddGallery';
import EditGallery from './popups/EditGallery';
import DeleteGallery from './popups/DeleteGallery';
import CollectionManager from './CollectionManager';

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState(null);
  const [showAddGallery, setShowAddGallery] = useState(false);
  const [showEditGallery, setShowEditGallery] = useState(false);
  const [currentGallery, setCurrentGallery] = useState(null);
  const [galleryToDelete, setGalleryToDelete] = useState(null);
  const [showDeleteGallery, setShowDeleteGallery] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('images');

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/gallery/showimage`);
      setGallery(response.data.gallery);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCollections = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/collection/all`);
      setCollections(res.data.collections);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGallery();
    fetchCollections();
  }, []);

const handleAssignCollection = async (galleryId, collectionId) => {
  try {
    await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/collection/assign`, {
      galleryId,
      collectionId: collectionId === '' ? null : collectionId,
      orderIndex: 0,
    });

    // Update only that image in state — no refetch, no scroll jump
    setGallery((prev) =>
      prev.map((img) => {
        if (img._id !== galleryId) return img;
        const matchedCollection = collections.find((c) => c._id === collectionId);
        return {
          ...img,
          collectionId: collectionId === '' ? null : { _id: collectionId, name: matchedCollection?.name || '' },
        };
      })
    );
  } catch (err) {
    console.error('Failed to assign collection', err);
  }
};

  return (
    <div className="p-4">
      {/* Header + Tab Bar */}
      <div className="flex flex-row justify-between items-center mb-6">
        <p className="text-4xl font-bold">Gallery Section</p>
        <div className="flex gap-3 items-center">
          <div className="flex gap-2 bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('images')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'images' ? 'bg-white text-black' : 'text-white hover:bg-white/10'
              }`}
            >
              Images
            </button>
            <button
              onClick={() => setActiveTab('collections')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'collections' ? 'bg-white text-black' : 'text-white hover:bg-white/10'
              }`}
            >
              Collections
            </button>
          </div>
          {activeTab === 'images' && (
            <Button text="Add More" onClick={() => setShowAddGallery(true)} />
          )}
        </div>
      </div>

      {/* Images Tab */}
      {activeTab === 'images' && (
        <div className="flex flex-wrap justify-center gap-6 p-6">
          {loading ? (
            <p className="text-xl">Loading...</p>
          ) : gallery.length === 0 ? (
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
                <div className="p-4 bg-white/10 flex flex-col gap-3">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-2xl uppercase font-bold">{img.name}</p>
                      <p className="text-xl">{img.location}</p>
                      {img.feature && (
                        <span className="inline-block bg-green-500 text-white text-sm px-2 py-1 rounded-full w-fit">
                          Featured
                        </span>
                      )}
                      {/* Collection badge — uses populated name directly */}
                      {img.collectionId && (
                        <span className="inline-block bg-blue-500/30 text-blue-200 text-sm px-2 py-1 rounded-full w-fit">
                          📁 {img.collectionId?.name}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col text-2xl gap-2">
                      <button
                        onClick={() => { setCurrentGallery(img); setShowEditGallery(true); }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => { setGalleryToDelete(img); setShowDeleteGallery(true); }}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>

                  {/* Assign to collection dropdown */}
                  <div>
                    <label className="text-xs text-white/50 mb-1 block">Assign to collection</label>
                    <select
                      value={img.collectionId?._id || ''}
                      onChange={(e) => handleAssignCollection(img._id, e.target.value)}
                      className="w-full bg-black/40 text-white text-sm rounded-md px-3 py-2 border border-white/20 focus:outline-none"
                    >
                      <option value="">— None —</option>
                      {collections.map((col) => (
                        <option key={col._id} value={col._id}>
                          {col.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Collections Tab */}
      {activeTab === 'collections' && (
        <CollectionManager
          collections={collections}
          fetchCollections={fetchCollections}
        />
      )}

      {/* Popups */}
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
  );
}

export default Gallery;