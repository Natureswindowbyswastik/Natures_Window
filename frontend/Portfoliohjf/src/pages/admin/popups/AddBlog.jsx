import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../../components/Button';

function AddBlog({ showAddBlog, setShowAddBlog }) {
  const [formData, setFormData] = useState({
    heading: '',
    subheading: '',
    images: [],
    descriptions: '',
    link: '',
    
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e) => {
    setFormData({
      ...formData,
      images: [...e.target.files], // Store multiple files
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.heading || !formData.subheading || !formData.images.length || !formData.descriptions ) {
      toast.error('All fields are required!');
      return;
    }

    const form = new FormData();
    form.append('heading', formData.heading);
    form.append('subheading', formData.subheading);
    form.append('descriptions', formData.descriptions);
    form.append('link', formData.link);

    // Append multiple images
    formData.images.forEach((image) => {
      form.append('images', image);
    });
    try {
      await axios.post('http://localhost:3001/blog/addblog', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Blog added successfully');
      setTimeout(() => {
        setShowAddBlog(false);
      }, 900);
    } catch (error) {
      console.error('Error adding blog:', error);
      toast.error('Failed to add blog');
    }
  };

  return (
    <>
      {showAddBlog && (
        <div className="fixed inset-0 z-50 flex flex-col gap-10 items-center justify-center bg-grey/80">
          <div className="bg-white rounded-md shadow-2xl p-8 w-96 text-black">
            <p className="text-center font-bold text-yellow text-2xl">Add Blog</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col font-bold">
                <label htmlFor="heading">Heading</label>
                <input
                  type="text"
                  name="heading"
                  value={formData.heading}
                  onChange={handleChange}
                  className="bg-grey/30 rounded-md p-2"
                  required
                />
              </div>

              <div className="flex flex-col font-bold">
                <label htmlFor="subheading">Subheading</label>
                <input
                  type="text"
                  name="subheading"
                  value={formData.subheading}
                  onChange={handleChange}
                  className="bg-grey/30 rounded-md p-2"
                  required
                />
              </div>

              <div className="flex flex-col font-bold">
                <label htmlFor="descriptions">Description</label>
                <textarea
                  name="descriptions"
                  value={formData.descriptions}
                  onChange={handleChange}
                  className="bg-grey/30 rounded-md p-2"
                  required
                />
              </div>

              <div className="flex flex-col font-bold">
                <label htmlFor="link">Link</label>
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="bg-grey/30 rounded-md p-2"
              
                />
              </div>

              <div className="flex flex-col font-bold">
                <label htmlFor="images">Images</label>
                <input type="file" name="images" multiple onChange={handleChangeImage} className="" />
              </div>

              <div className="flex flex-row justify-between">
                <Button isPrimary text="Upload" type="submit" />
                <Button text="Cancel" onClick={() => setShowAddBlog(false)} />
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default AddBlog;
