import React from 'react'
import { FaFacebookF,FaInstagram,FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {Link } from "react-router-dom"
function Footer() {
  return (
    <>
    <div className="ending w-full flex-col flex justify-center items-center text-center"  data-aos="fade-right">
    <div className='  flex w-[90%] text-left'  >
      <Link to="/">
      <p className=" items-center text-4xl font-bold"><span className='text-yellow'>Nature's</span> Window</p>
      </Link>

      </div>
      <div className='flex md:flex-row flex-col  justify-between w-[90%] mt-4'>
      <div className='logo-area flex flex-col gap-4 ' >
 
 <div className='flex flex-col gap-4 text-left'>
   <p className='text-2xl'>Swastik Sharma <br /> Photographer</p>
   <div className='flex gap-3 text-2xl '>
   <a href="https://www.instagram.com/natureswindowbyswastik?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><FaInstagram/></a>
   <a href="https://x.com/NWbySwastik"> <FaXTwitter/></a>
   </div>
   
 
 </div>
</div>
<div className="pages text-left flex flex-col gap-4" >
 <p className='logo-name font-bold text-3xl'>Pages</p>
   <ul className='  flex flex-col  gap-4 text-2xl'>
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

<div className="contact text-left flex flex-col gap-4"  >
 <p className='logo-name  items-center text-3xl font-bold'>Contact</p>

   <p className='text-xl'>contact@natureswindowbyswastik.com</p>
</div>
      </div>
    
    </div>
    </>
  )
}

export default Footer