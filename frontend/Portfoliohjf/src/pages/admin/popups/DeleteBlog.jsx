import axios from 'axios';
import React from 'react';
import Button from '../../../components/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DeleteBlog({ showDeleteBlog, setShowDeleteBlog, blogToDelete }) {
  const handleDelete = async () => {
    console.log(blogToDelete._id);
    
    try {
      await axios.delete(`http://localhost:3001/blog/deleteblog/${blogToDelete._id}`);
      toast.success("Blog deleted successfully!");
      setTimeout(() => {
        setShowDeleteBlog(false);
      }, 500);
    } catch (error) {
      console.log('Error deleting blog:', error);
      toast.error("Failed to delete the blog");
    }
  };

  return (
    <>
      {showDeleteBlog && (
        <div className="fixed inset-0 z-50 flex flex-col gap-10 items-center justify-center bg-grey/80">
          <div className="bg-white rounded-md shadow-2xl p-8 w-96 text-black">
            <h2 className="font-bold text-center text-xl">Delete Blog</h2>
            <p className="text-center">
              Are you sure you want to delete this blog: <strong>{blogToDelete.heading}</strong>?
            </p>
            <div className="flex justify-between mt-4">
              <Button onClick={handleDelete} isPrimary text="Yes, Delete" />
              <Button onClick={() => setShowDeleteBlog(false)} text="Cancel" />
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default DeleteBlog;
