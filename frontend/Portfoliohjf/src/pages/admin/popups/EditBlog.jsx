import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../../components/Button';
import axios from 'axios';
import { FaTimes } from "react-icons/fa";

function EditBlog({ showEditBlog, setShowEditBlog, currentBlog }) {
  const [formData, setFormData] = useState({
    heading: '',
    subheading: '',
    images: [], // Multiple images
    descriptions: '',
    link: '',
  });

  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (currentBlog) {
      setFormData({
        heading: currentBlog.heading,
        subheading: currentBlog.subheading,
        images: currentBlog.images || [],
        descriptions: currentBlog.descriptions,
        link: currentBlog.link || '',
      });
    }
  }, [currentBlog]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setFiles(Array.from(files)); // Convert file list to array
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = new FormData();

    updatedFormData.append('heading', formData.heading);
    updatedFormData.append('subheading', formData.subheading);
    updatedFormData.append('descriptions', formData.descriptions);
    updatedFormData.append('link', formData.link);

    files.forEach((file) => updatedFormData.append('images', file)); // Append multiple images

    try {
      await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/blog/editblog/${currentBlog._id}`, updatedFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Blog updated successfully!');
      setTimeout(() => {
        setShowEditBlog(false);
      }, 500);
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('Failed to update the blog');
    }
  };

  return (
    <>
      {showEditBlog && (
        <div className="fixed inset-0 z-50 flex flex-col gap-10 items-center justify-center bg-grey-900 bg-opacity-80">
          <div className="bg-white rounded-md shadow-2xl p-8 w-fit text-black">
            <div className="flex justify-between items-center">
              <p className=" font-bold text-yellow  text-4xl text-center ">Edit Blog</p>
             
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className='flex flex-row gap-40'>
                <div className="flex flex-col font-bold">
                <label>Heading</label>
                <input
                  type="text"
                  name="heading"
                  value={formData.heading}
                  onChange={handleChange}
                  className="bg-grey/20 rounded-md p-2"
                />
              </div>

              <div className="flex flex-col font-bold">
                <label>Subheading</label>
                <input
                  type="text"
                  name="subheading"
                  value={formData.subheading}
                  onChange={handleChange}
                  className="bg-grey/20 rounded-md p-2"
                />
              </div>
                </div>
              

              <div className="flex flex-col font-bold">
                <label>Description</label>
                <textarea
                  name="descriptions"
                  value={formData.descriptions}
                  onChange={handleChange}
                  className="bg-grey/20 rounded-md p-2"
                  rows="4"
                ></textarea>
              </div>

              <div className="flex flex-col font-bold">
                <label>Link (Optional)</label>
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="bg-grey/20 rounded-md p-2"
                />
              </div>

              <div className="flex flex-col font-bold">
                <label>Current Images</label>
                <div className="flex flex-wrap gap-2">
                  {formData.images.length > 0 ? (
                    formData.images.map((image, index) => (
                      <img key={index} src={image} alt={`Blog ${index}`} className="w-20 h-20 object-cover rounded" />
                    ))
                  ) : (
                    <p>No images uploaded</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col font-bold">
                <label>Upload New Images</label>
                <input type="file" name="images" multiple onChange={handleChange} />
              </div>

              <div className="flex flex-row justify-between">
                <Button isPrimary text="Update" type="submit" />
                <Button text="Cancel" onClick={() => setShowEditBlog(false)} />
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default EditBlog;
