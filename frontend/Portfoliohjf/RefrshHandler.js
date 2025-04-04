import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefrshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
            if (location.pathname === '/login' 
                
            ) {
                navigate('/admindashboard', { replace: false });
            }
        }
    }, [location, navigate, setIsAuthenticated])

    return (
        null
    )
}

export default RefrshHandler