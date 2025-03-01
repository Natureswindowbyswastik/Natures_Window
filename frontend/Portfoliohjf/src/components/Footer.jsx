import React from 'react'
import { FaFacebookF,FaInstagram,FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {Link } from "react-router-dom"
function Footer() {
  return (
    <>
    <div className='w-full flex-col flex justify-center items-center text-center'>
    <div className=' flex w-[90%] py-1 text-left  border-t-2 text-yellow/20 '  >
      <Link to="/">
      <p className=" items-center text-4xl font-bold text-white"><span className='text-yellow'>Nature's</span> Window</p>
      </Link>
     </div>
     <div className='flex lg:flex-row md:flex-col flex-col  w-[90%] gap-2 justify-between md:items-left'>
      <div className='flex flex-col  text-left '>
        <p className='text-xl'>by</p>
      <p className='md:text-3xl text-xl'>Swastik  </p> 
      <p className='md:text-xl'>contact@natureswindowbyswastik.com</p>
      </div>

      <div className='md:text-2xl text-ls flex flex-row gap-20'>
   <a href="https://www.instagram.com/natureswindowbyswastik?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><FaInstagram/></a>
   <a href="https://x.com/NWbySwastik"> <FaXTwitter/></a>
   </div>
   <div className=''>
      <ul className='  flex flex-wrap flex-row  md:text-left lg:text-center text-left  lg:gap-40 uppercase md:gap-4  gap-4  lg:justify-evenly text-sm md:text-xl'>
         <li>
           <Link to="/" >Home</Link>
         </li>
         <li>
         <Link to="/about">About</Link>
         </li>
         <li>
         <Link to="/collection">Collection</Link>
         </li>
         <li>
         <Link to="/blog">Stories</Link>
         </li>
         </ul>
         

      </div>
     </div>
     <div className='bg-grey/20 w-full'>
      All Rights Reserved 
     </div>

    </div>
    </>
  )
}

export default Footer