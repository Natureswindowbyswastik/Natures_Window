import React, { useState } from 'react';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { MdDragIndicator } from 'react-icons/md';
import { MdStar, MdStarBorder } from 'react-icons/md';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableImage({ image, onRemove, onSetCover, isCover }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: image._id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} className="relative bg-white/10 rounded-lg overflow-hidden shadow group">
      <img src={image.images[0]?.url} alt={image.name} className="w-full h-40 object-cover" />

      {/* Cover badge */}
      {isCover && (
        <div className="absolute top-2 left-10 bg-yellow text-black text-xs font-bold px-2 py-0.5 rounded-full">
          Cover
        </div>
      )}

      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 bg-black/60 rounded p-1 cursor-grab active:cursor-grabbing text-white"
      >
        <MdDragIndicator size={18} />
      </div>

      {/* Set as cover */}
      <button
        onClick={() => onSetCover(image.images[0]?.url)}
        className={`absolute top-2 right-8 bg-black/60 rounded p-1 ${isCover ? 'text-yellow' : 'text-white/50 hover:text-yellow'}`}
        title="Set as cover image"
      >
        {isCover ? <MdStar size={18} /> : <MdStarBorder size={18} />}
      </button>

      {/* Remove */}
      <button
        onClick={() => onRemove(image._id)}
        className="absolute top-2 right-2 bg-black/60 rounded p-1 text-red-400 hover:text-red-300"
        title="Remove from collection"
      >
        <MdDelete size={18} />
      </button>

      <div className="p-2">
        <p className="text-sm font-bold truncate">{image.name}</p>
        <p className="text-xs text-white/50 truncate">{image.location}</p>
      </div>
    </div>
  );
}

function CollectionManager({ collections, fetchCollections }) {
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [creating, setCreating] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [collectionImages, setCollectionImages] = useState({});
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/collection/create`, {
        name: newName.trim(),
        description: newDesc.trim(),
      });
      setNewName('');
      setNewDesc('');
      fetchCollections();
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this collection? Images will stay but be unassigned.')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/collection/delete/${id}`);
      if (expandedId === id) setExpandedId(null);
      fetchCollections();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCollectionImages = async (collectionId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/collection/images/${collectionId}`
      );
      setCollectionImages((prev) => ({ ...prev, [collectionId]: res.data.images }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      if (!collectionImages[id]) fetchCollectionImages(id);
    }
  };

  const handleDragEnd = (event, collectionId) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setCollectionImages((prev) => {
      const images = prev[collectionId];
      const oldIndex = images.findIndex((img) => img._id === active.id);
      const newIndex = images.findIndex((img) => img._id === over.id);
      return { ...prev, [collectionId]: arrayMove(images, oldIndex, newIndex) };
    });
  };

  const handleSaveOrder = async (collectionId) => {
    setSaving(true);
    try {
      const images = collectionImages[collectionId];
      const orderedImages = images.map((img, index) => ({ _id: img._id, orderIndex: index }));
      await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/collection/reorder`, { orderedImages });
      alert('Order saved!');
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleSetCover = async (collectionId, imageUrl) => {
    try {
      await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/collection/update/${collectionId}`, {
        coverImage: imageUrl,
      });
      fetchCollections(); // refresh so the cover shows in the header
    } catch (err) {
      console.error('Failed to set cover', err);
    }
  };

  const handleRemoveFromCollection = async (galleryId, collectionId) => {
    try {
      await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/collection/assign`, {
        galleryId,
        collectionId: null,
        orderIndex: 0,
      });
      setCollectionImages((prev) => ({
        ...prev,
        [collectionId]: prev[collectionId].filter((img) => img._id !== galleryId),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-4">
      {/* Create new collection */}
      <div className="bg-white/10 rounded-xl p-6 flex flex-col gap-4 max-w-lg">
        <p className="text-xl font-bold">Create New Collection</p>
        <input
          type="text"
          placeholder="Collection name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="bg-black/40 border border-white/20 rounded-md px-4 py-2 text-white placeholder-white/30 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          className="bg-black/40 border border-white/20 rounded-md px-4 py-2 text-white placeholder-white/30 focus:outline-none"
        />
        <button
          onClick={handleCreate}
          disabled={creating || !newName.trim()}
          className="bg-yellow text-black font-semibold px-6 py-2 rounded-md disabled:opacity-40"
        >
          {creating ? 'Creating...' : 'Create Collection'}
        </button>
      </div>

      {/* Collection list */}
      <div className="flex flex-col gap-4">
        {collections.length === 0 ? (
          <p className="text-white/40">No collections yet. Create one above.</p>
        ) : (
          collections.map((col) => (
            <div key={col._id} className="bg-white/10 rounded-xl overflow-hidden">
              {/* Collection header */}
              <div className="flex flex-row justify-between items-center p-4 gap-4">
                <div className="flex items-center gap-4">
                  {/* Cover image preview */}
                  {col.coverImage ? (
                    <img
                      src={col.coverImage}
                      alt={col.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center text-white/20 text-xs">
                      No cover
                    </div>
                  )}
                  <div>
                    <p className="text-lg font-bold">{col.name}</p>
                    {col.description && (
                      <p className="text-sm text-white/50">{col.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => handleExpand(col._id)}
                    className="text-sm px-4 py-1.5 rounded-full border border-white/30 hover:bg-white/10 transition"
                  >
                    {expandedId === col._id ? 'Close' : 'Manage Images'}
                  </button>
                  <button onClick={() => handleDelete(col._id)} className="text-red-400 hover:text-red-300">
                    <MdDelete size={22} />
                  </button>
                </div>
              </div>

              {/* Expanded drag-to-reorder grid */}
              {expandedId === col._id && (
                <div className="p-4 border-t border-white/10">
                  {!collectionImages[col._id] ? (
                    <p className="text-white/40 text-sm">Loading...</p>
                  ) : collectionImages[col._id].length === 0 ? (
                    <p className="text-white/40 text-sm">
                      No images assigned. Use the dropdown on each image card to assign here.
                    </p>
                  ) : (
                    <>
                      <p className="text-xs text-white/40 mb-4">
                        Drag to reorder · ★ to set cover · trash to remove from collection
                      </p>
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={(e) => handleDragEnd(e, col._id)}
                      >
                        <SortableContext
                          items={collectionImages[col._id].map((img) => img._id)}
                          strategy={rectSortingStrategy}
                        >
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {collectionImages[col._id].map((image) => (
                              <SortableImage
                                key={image._id}
                                image={image}
                                isCover={col.coverImage === image.images[0]?.url}
                                onSetCover={(url) => handleSetCover(col._id, url)}
                                onRemove={(id) => handleRemoveFromCollection(id, col._id)}
                              />
                            ))}
                          </div>
                        </SortableContext>
                      </DndContext>
                      <button
                        onClick={() => handleSaveOrder(col._id)}
                        disabled={saving}
                        className="mt-6 bg-yellow text-black font-semibold px-6 py-2 rounded-md disabled:opacity-40"
                      >
                        {saving ? 'Saving...' : 'Save Order'}
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CollectionManager;