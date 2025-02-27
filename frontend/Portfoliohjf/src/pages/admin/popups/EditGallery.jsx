import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../../components/Button';
import axios from 'axios';
function EditGallery({showEditGallery,setShowEditGallery,currentGallery}) {
    const [formData,setFormData]= useState({
        name:'',
        location:'',
        image:'',
        feature:'',
    })

    const [file,setFile] = useState(null);

    useEffect(()=>{
      console.log(currentGallery)
      if(currentGallery){
        setFormData({
          name: currentGallery.name,
          location: currentGallery.location,
          image: currentGallery.image,
          feature:currentGallery.feature
        })
      }
    },[currentGallery])


    const handleChange = (e)=>{
      const{
        name, value,files
      }=e.target;
      if(name== 'image'){
        setFile(files[0]);
      }else{
        setFormData({
          ...formData,
          [name]:value,
        })
      }
    }

    const handleSubmit = async(e)=>{
      e.preventDefault();
      const updatedFormData = new FormData();

      updatedFormData.append('name',formData.name);
      updatedFormData.append('location', formData.location);
      updatedFormData.append('feature',formData.feature)
      
      if(file){
        updatedFormData.append('image',file);
      }
         
    try {
      await axios.post(`http://localhost:3001/gallery/editgallery/${currentGallery._id}`, updatedFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Gallery updated successfully');
      setTimeout(() => {
        setShowEditGallery(false);
      }, 500);
    } catch (error) {
      console.error('Error updating gallery:', error);
      toast.error('Failed to update the gallery');
    }
  };

  return (
    <>
    {showEditGallery && (
       <div className='fixed inset-0 z-50 flex flex-col gap-10 items-center justify-center bg-grey/80'>
      
       <div className='bg-white rounded-md shadow-2xl p-8 w-96  text-black'>
       <p className='text-center font-bold text-yellow text-2xl'>Add Images</p>
     
       <form  onSubmit={handleSubmit} className='flex flex-col gap-6'>
           <div className='flex flex-col  font-bold'>
               <label htmlFor="">Name</label>
               <input type="text"
                   name="name"
                   value={formData.name}
                   onChange={handleChange}
                   className=' bg-grey/30 rounded-md p-2' />

           </div>
           <div className='flex flex-col font-bold'>
               <label htmlFor="">Location</label>
               <input type="text" 
                   name="location"
                   value={formData.location}
                   onChange={handleChange}
                   className=' bg-grey/30 rounded-md p-2' />
           </div>
           <div className='flex flex-col  font-bold'>
           {formData.image && (
                  <img
                    src={formData.image}
                    alt="Current image"
                    style={{ width: '300px', height: 'auto', marginBottom: '10px' }}
                  />
                )}
               <label htmlFor="">Image</label>
               <input type="file" 
                    name="image"
                    onChange={handleChange}
               className='' />
           </div>
           <div className="flex flex-col font-bold">
                <label htmlFor="feature">Featured</label>
                <select
                  name="feature"
                  value={formData.feature}
                  onChange={handleChange}
                  className="bg-grey/30 rounded-md p-2"
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
           <div className='flex flex-row justify-between'>
               <Button isPrimary text="Upload" type="submit" />
               <Button text="Cancel"  onClick={() =>{
                   setShowEditGallery(false);
                   setFile(null)
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

export default EditGallery