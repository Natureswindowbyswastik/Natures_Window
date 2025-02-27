import React, { useState } from 'react'
import { Link,Outlet } from 'react-router-dom'
import { useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import Button from '../../components/Button';
function Dashboard() {

  const [loggedInuser,setLoggedInUser]=useState('');
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInuser'));
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
   
    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <>
    <div className=' flex w-full md:flex-row flex-col-reverse h-screen'>
    <div className=" flex flex-[0.2] md:h-screen md:bg-black bg-grey/60 h-fit md:flex-col gap-10 items-center w-full drop-shadow-2xl fixed md:relative md:left-0 bottom-0 z-10  p-3">
        
          <h1 className='text-4xl font-bold md:flex hidden'>Nature's Window</h1>
          <h2 className='md:flex hidden'>Admin Dashboard</h2>
            <ul className=' flex flex-row md:flmd:text-sm   md:flex-col  justify-around w-full md:gap-3  md:p-2 gap-10 text-xl font-bold items-center'>
              <Link to="/admindashboard/admin-gallery"><li>Gallery</li></Link>
              <Link to="/admindashboard/admin-blog"><li>Blog</li></Link>   
              <Link to="/admindashboard/admin-form"><li>Form</li></Link>   

                
          <div className="md:inline-block hidden">
            <Button text="Logout" onClick={handleLogout} />
          </div>
            </ul>
       
      </div>
      <div className='flex-[0.9] flex flex-col gap-6 p-4 pt-0 bg-bgcolor md:overflow-y-auto overflow-y-auto md:h-auto h-screen  '>
<Outlet/>
      </div>
    </div>
    </>
  )
}

export default Dashboard