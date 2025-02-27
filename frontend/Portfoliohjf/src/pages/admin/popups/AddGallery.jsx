import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../../components/Button';
function AddGallery({showAddGallery,setShowAddGallery}) {

    const [formData,setFormData] = useState({
        name:"",
        location:"",
        image:null,
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

   
        const form = new FormData();
        form.append("name",formData.name);
        form.append("location",formData.location);
        form.append("image",formData.image);
        form.append("feature",formData.feature)

        try {
            await axios.post ("http://localhost:3001/gallery/addimage",form,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            toast.success('Added To Gallery');
            setTimeout(()=>{
                setShowAddGallery(false);
            },900)
        } catch (error) {
            console.error("Error adding To the gallery",error)
            toast.error("Failed to add to the gallery")
        }
    }
  return (
    <>{showAddGallery &&( 
    <div className='fixed inset-0 z-50 flex flex-col gap-10 items-center justify-center bg-grey/80'>
      
        <div className='bg-white rounded-md shadow-2xl p-8 w-96  text-black'>
        <p className='text-center font-bold text-yellow text-2xl'>Add Images</p>
      
        <form  onSubmit={handlesubmit} className='flex flex-col gap-6'>
            <div className='flex flex-col  font-bold'>
                <label htmlFor="">Name</label>
                <input type="text"
                    name="name"
                    value={formData.name}
                    onChange={handlechange}
                    className=' bg-grey/30 rounded-md p-2' required/>

            </div>
            <div className='flex flex-col font-bold'>
                <label htmlFor="">Location</label>
                <input type="text" 
                    name="location"
                    value={formData.location}
                    onChange={handlechange}
                    className=' bg-grey/30 rounded-md p-2' required/>
            </div>
            <div className='flex flex-col  font-bold'>
                <label htmlFor="">Image</label>
                <input type="file" 
                     name="image"
                     onChange={handlechangeImage}
                className='' />
            </div>
            <div className="flex flex-col font-bold">
                <label htmlFor="feature">Featured</label>
                <select
                  name="feature"
                  value={formData.feature}
                  onChange={handlechange}
                  className="bg-grey/30 rounded-md p-2"
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
            <div className='flex flex-row justify-between'>
                <Button isPrimary text="Upload" type="submit" />
                <Button text="Cancel"  onClick={() =>{
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

export default AddGallery