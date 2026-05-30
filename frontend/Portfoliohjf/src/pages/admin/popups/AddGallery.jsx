import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../../components/Button';
import imageCompression from 'browser-image-compression'; // 1. Imported compression utility

function AddGallery({showAddGallery,setShowAddGallery}) {

    const [uploading, setUploading] = useState(false); // Tracks background compression state
    const [formData,setFormData] = useState({
        name:"",
        location:"",
        image:null,
        link:"",
        feature:false,
    })
    const handlechange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        })
    } 
    const handlechangeImage =(e)=>{
        setFormData({
            ...formData,
            image:e.target.files[0],
        })
    }
    const handlesubmit  = async(e)=>{
        e.preventDefault();

        if (!formData.name || !formData.location || !formData.image) {
          toast.error("All fields are required!");
          return;
        }

        setUploading(true);
        try {
            const rawFile = formData.image;
            console.log("--- FRONTEND COMPRESSION STARTED ---");
            console.log(`Original camera file size: ${(rawFile.size / 1024 / 1024).toFixed(2)} MB`);

            // 2. Strict compression profile target tailored to safely bypass Vercel's 4.5MB gateway limit
            const compressionOptions = {
                maxSizeMB: 1.5,          // Force final file footprint to stay around 1.5MB max
                maxWidthOrHeight: 2000,  // Retain crisp details up to 2K resolution profiles
                useWebWorker: true,      // Handle image calculations smoothly on a separate thread
                initialQuality: 0.85     // Strips away invisible raw color details cleanly
            };

            // 3. Wait for client-side image optimization to finish
            const optimizedFile = await imageCompression(rawFile, compressionOptions);
            console.log(`Optimized upload file size: ${(optimizedFile.size / 1024 / 1024).toFixed(2)} MB`);

            // 4. Construct form data payload using the optimized file blob
            const form = new FormData();
            form.append("name", formData.name);
            form.append("location", formData.location);
            form.append("feature", formData.feature);
            form.append("link", formData.link);
            // Append the optimized binary block instead of the original raw asset
            form.append("image", optimizedFile, rawFile.name);

            await axios.post (`${import.meta.env.VITE_REACT_APP_API_URL}/gallery/addimage`,form,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            
            toast.success('Added To Gallery');
            setTimeout(()=>{
                setShowAddGallery(false);
            },900)
        } catch (error) {
            console.error("Error adding To the gallery", error)
            toast.error("Failed to add to the gallery")
        } finally {
            setUploading(false);
        }
    }
  return (
    <>{showAddGallery &&( 
    <div className='fixed inset-0 z-50 flex flex-col gap-10 items-center justify-center bg-grey/80 backdrop-blur-sm'>
      
        <div className='bg-white rounded-md shadow-2xl p-8 w-96  text-black'>
        <p className='text-center font-bold text-yellow text-2xl'>Add Images</p>
      
        <form  onSubmit={handlesubmit} className='flex flex-col gap-6'>
            <div className='flex flex-col  font-bold'>
                <label htmlFor="">Name</label>
                <input type="text"
                    name="name"
                    value={formData.name}
                    onChange={handlechange}
                    className=' bg-grey/30 rounded-md p-2 outline-none focus:border-yellow border border-transparent' required/>

            </div>
            <div className='flex flex-col font-bold'>
                <label htmlFor="">Location</label>
                <input type="text" 
                    name="location"
                    value={formData.location}
                    onChange={handlechange}
                    className=' bg-grey/30 rounded-md p-2 outline-none focus:border-yellow border border-transparent' required/>
            </div>
            <div className="flex flex-col font-bold">
                <label htmlFor="">Link</label>
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handlechange}
                  className="bg-grey/30 rounded-md p-2 outline-none focus:border-yellow border border-transparent"
                />
              </div>
            <div className='flex flex-col  font-bold'>
                <label htmlFor="">Image</label>
                <input type="file" 
                     name="image"
                     accept="image/*"
                     onChange={handlechangeImage}
                     className='text-sm text-zinc-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-zinc-100 file:text-black hover:file:bg-zinc-200 cursor-pointer' />
            </div>
          
            <div className="flex flex-col font-bold">
                <label htmlFor="feature">Featured</label>
                <select
                  name="feature"
                  value={formData.feature}
                  onChange={handlechange}
                  className="bg-grey/30 rounded-md p-2 cursor-pointer outline-none"
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
            <div className='flex flex-row justify-between pt-2'>
                <Button 
                  isPrimary 
                  text={uploading ? "Compressing..." : "Upload"} 
                  type="submit" 
                  disabled={uploading} 
                />
                <Button 
                  text="Cancel"  
                  disabled={uploading}
                  onClick={() =>{
                    setShowAddGallery(false)
                }}/>
            </div>
           
        </form>
      
        </div>
       
    </div>
)}
    <ToastContainer />
    </>
  )
}

export default AddGallery;