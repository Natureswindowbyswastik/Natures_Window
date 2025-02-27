import React from 'react'
import {Link} from 'react-router-dom'
function Navbar() {
  return (
    <>
    <nav className="navbar absolute top-0  z-10 lg:flex-wrap bg-black/2 w-full flex justify-center p-2   ">
      <div className=' text-white  w-[90%] flex flex-row border-b justify-center items-baseline'>
      <div className="text-5xl font-bold flex-[0.6] hidden md:flex">
        <Link to='/'>
             <span className="text-yellow">Nature's </span>Window
        </Link>
     
    </div>
    <div className='flex-[0.4]'>
    <ul className=" flex flex-row md:gap-0 gap-4 md:text-xl justify-between font-bold  p-2 ">
        <li className='hover:text'><Link to='/'>Home</Link></li>
        <li> <Link to='/collection'>Collection</Link></li>
        <li> <Link to='/about'>About</Link></li>
        <li><Link to='/blog'>Stories</Link></li>
      </ul>
    </div>
      </div>
    </nav>          
   
    </>
  )
}

export default Navbar