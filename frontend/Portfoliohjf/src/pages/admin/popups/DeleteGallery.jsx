import axios from 'axios'
import React from 'react'

import Button from '../../../components/Button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function DeleteGallery({showDeleteGallery,setShowDeleteGallery, galleryToDelete}) {

    const handleDelete = async() =>{
        console.log(galleryToDelete)
        try {
            await axios.delete(`http://localhost:3001/gallery/deletegallery/${galleryToDelete._id}`)
            toast.success("Gallery Deleted successfully");
            setTimeout(()=>{
                setShowDeleteGallery(false);
            },500)
        } catch (error) {
            console.log('Error delteting gallery', error);
            toast.error("Failed to delete the gallery")
        }
    }
  return (
   <>
   {showDeleteGallery && (
     <div className="fixed inset-0 z-50 flex flex-col gap-10 items-center justify-center bg-grey/80">
     <div className="bg-white rounded-md shadow-2xl p-8 w-96 text-black">
       <h2 className="font-bold text-center text-xl ">Delete Gallery</h2>
       <p className="text-center">Are you sure you want to delete this Gallery: <strong>{galleryToDelete.name}</strong>?</p>
       <div className="flex justify-between mt-4">
       <Button
        onClick={handleDelete}
        isPrimary
        text="Yes,Delete"
       />
         
       <Button 
        onClick={() => setShowDeleteGallery(false)}
        text="Cancel"
        />
       </div>
     </div>
   </div>
   )}
         <ToastContainer />
   </>
  )
}

export default DeleteGallery