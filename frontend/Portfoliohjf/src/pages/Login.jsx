import React, { useEffect, useState } from 'react';
import { IoMdMail, IoMdEyeOff, IoMdEye } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../components/Button';
import axios from 'axios';
function Login() {
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

console.log(import.meta.env.VITE_REACT_APP_API_URL)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prevState => ({ ...prevState, [name]: value }));
    };

    const handlePasswordVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleError = (message) => {
        toast.error(message);
    };

    const handleLogin = async (e) => {

        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) return handleError("All fields are required");

        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/login`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo)
            });

            const result = await response.json();
            console.log(result);
            if (result.success) {
                localStorage.setItem('token', result.jwtToken);
                localStorage.setItem('role', result.role);

                toast.success("Login successful!");

                 setTimeout(()=>{
                  navigate('/admindashboard');
                 },[],2000)
            } else {
                if (result.message === "Wrong password") {
                    handleError("Incorrect password. Please try again.");
                } else if (result.message === "Invalid email") {
                    handleError("Email not found. Please check and try again.");
                } else if (result.details && result.details.length > 0) {
                    handleError(result.details[0]);
                } else {
                    handleError(result.message || "Login failed");
                }
            }
        } catch (err) {
            toast.error("Server error");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-grey/40 shadow-2xl rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-blue-600">Welcome Back!</h2>
                <p className="text-center text-gray-500 mb-6">Login to continue</p>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <div className="relative mt-1">
                            <IoMdMail className="absolute right-3 top-3 text-grey/40" />
                            <input type="email" id="email" name="email" placeholder="Enter your email" 
                                className="w-full border text-grey/40 p-2 pl-3 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                                value={loginInfo.email} onChange={handleChange} required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                        <div className="relative mt-1">
                            <button type="button" onClick={handlePasswordVisibility} 
                                className="absolute right-3 top-3 text-grey/40">
                                {isVisible ? <IoMdEye /> : <IoMdEyeOff />}
                            </button>
                            <input type={isVisible ? "text" : "password"} id="password" name="password" placeholder="Enter your password"
                                className="w-full text-grey/40 border p-2 pl-3 rounded-lg shadow-sm focus:ring focus:ring-yellow/30"
                                value={loginInfo.password} onChange={handleChange} required />
                        </div>
                    </div>
                    <Button text="Login" type="submit"/>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;