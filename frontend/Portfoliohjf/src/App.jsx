import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import About from './pages/About';
import Collection from './pages/Collection';

import Footer from './components/Footer';
import Dashboard from './pages/admin/Dashboard';
import Login from './pages/Login';

import Gallery from './pages/admin/Gallery';
import Blog from './pages/admin/Blog';
import AdminHome from './pages/admin/AdminHome';
import RefrshHandler from '../RefrshHandler';
import BlogPage from './pages/BlogPage';
import Forms from './pages/admin/Forms'
import BlogDetail from './pages/BlogDetail';

import ScrollToTop from './components/ScrollToTop';

function App() {
  const location = useLocation();
  const isLoginOrAdminRoute = 
    location.pathname.startsWith('/admin') || location.pathname === '/login';

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  
 
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <div className="w-full h-screen">
      {!isLoginOrAdminRoute && <Navbar />}
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <ScrollToTop/>
      <Routes>
    
        {/* Public Routes */}
        
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/blog" element={<BlogPage/>} />
        <Route path="blog/:slug" element={<BlogDetail/>}/>
        <Route path="/login" element={<Login />} />

        {/* Private Admin Routes */}
        <Route path="/admindashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}>

        <Route index element={<AdminHome />} />
     
          <Route path="admin-gallery" element={<Gallery />} />
          <Route path="admin-blog" element={<Blog />} />
          <Route path="admin-form" element={<Forms/>} />
        </Route>
      </Routes>
         <Footer />
    </div>
  );
}

export default App;
