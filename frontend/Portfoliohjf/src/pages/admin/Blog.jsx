import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AddBlog from './popups/AddBlog';
import EditBlog from './popups/EditBlog';
import DeleteBlog from './popups/DeleteBlog';

function Blog() {
  const [blog, setBlog] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [showEditBlog, setShowEditBlog] = useState(false);
  const [showDeleteBlog, setShowDeleteBlog] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [blogToDelete, setBlogToDelete] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/blog/showblog');
        setBlog(response.data.blog);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, []);

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col gap-20">
          <div className="flex flex-row justify-around">
            <p className="text-4xl font-bold">Blog Section</p>
            <Button text="Add More" onClick={() => setShowAddBlog(true)} />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-xl">Loading...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-xl text-red-500">Error: {error}</p>
            </div>
          ) : blog.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-xl">No blogs available</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-6 p-6 border">
              {blog.map((blogs) => (
                <div
                  key={blogs._id}
                  className="w-full h-[350px] md:w-[400px] bg-white/20 rounded-lg overflow-hidden shadow-lg border"
                >
                  {/* Display Single Image */}
                  <div>
                    <img
                      src={blogs.images?.[0] || "https://via.placeholder.com/400x256"} // Use the first image or a placeholder
                      alt={blogs.heading}
                      className="w-full h-64 object-cover"
                    />
                  </div>

                  <div className="p-4 bg-white/10 flex flex-row justify-between">
                    <div>
                      <p className="text-2xl uppercase font-bold">{blogs.heading}</p>
                      <p className="text-xl">{blogs.subheading}</p>
                    </div>
                    <div className="flex flex-col text-2xl gap-2">
                      <button onClick={() => { setCurrentBlog(blogs); setShowEditBlog(true); }}>
                        <FaEdit />
                      </button>
                      <button onClick={() => { setBlogToDelete(blogs); setShowDeleteBlog(true); }}>
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Popups */}
        {showAddBlog && <AddBlog showAddBlog={showAddBlog} setShowAddBlog={setShowAddBlog} />}
        {showEditBlog && <EditBlog showEditBlog={showEditBlog} setShowEditBlog={setShowEditBlog} currentBlog={currentBlog} />}
        {showDeleteBlog && <DeleteBlog showDeleteBlog={showDeleteBlog} setShowDeleteBlog={setShowDeleteBlog} blogToDelete={blogToDelete} />}
      </div>
    </>
  );
}

export default Blog;