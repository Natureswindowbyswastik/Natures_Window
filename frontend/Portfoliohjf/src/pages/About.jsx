import React, { useState,useEffect } from 'react';

import Footer from '../components/Footer';
import { InstagramEmbed } from 'react-social-media-embed';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from "aos";
import "aos/dist/aos.css";
import profile from '../assets/images/profile.jpeg';
function About() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    title: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form data
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.title ||
      !formData.message
    ) {
      toast.error('All fields are required!');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/form/submitForm`,
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data.message === 'Form submitted successfully') {
        toast.success('Form submitted successfully');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          title: '',
          message: '',
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form');
    } finally {
      setLoading(false);
    }
  };
useEffect(()=>{
      AOS.init({duration:"1200"})
    })
  return (
    <>
      <div>
        {/* Background Slider */}
        <div className="homeslider max-h-screen">
          <div className="relative" > 
            <img
              src="https://res.cloudinary.com/dj010hm7j/image/upload/v1738838497/DSC_3336_irxwkp.jpg"
              alt=""
             
              className="w-full h-screen flex object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/100"></div>
          </div>
          <div className="absolute flex flex-row justify-evenly h-fit w-full top-1/2 md:top-1/3">
            <div className="p-4 w-[60%] md:p-10 rounded-md text-center" >
              <p className="text-5xl text-left">Hello</p>
              <h1 className="text-4xl md:text-8xl font-bold">
                I'm <span className="text-yellow">Swastik Sharma</span>
              </h1>
              <p className="text-5xl text-right">Photographer</p>
            </div>
          </div>
        </div>

        {/* About Page */}
        <div className="w-full h-full">
          <div className="justify-center items-center flex ">
            <p className="text-6xl border-b-2 text-left w-[85%] flex text-yellow font-bold">
              About me
            </p>
          </div>
          <div className="flex w-full justify-center align-center mt-10 mb-10">
            <div className="flex md:flex-col lg:flex-row flex-col-reverse justify-between gap-40 w-[85%] items-center ">
              <div className="flex-[0.5] flex flex-col  text-justify" data-aos="fade-up">
                <h1 className="md:text-2xl text-xs">
                Nature's Window is a photography project built on one simple idea that the world, when observed with patience, reveals more than it conceals.
Based in Dehradun and working across India, the work moves between wildlife, landscape, and street photography  not as separate disciplines, but as different ways of paying attention to the same world. Every frame is made in the field, without intervention, waiting for the moment to arrive rather than forcing it.
The camera here is not a tool for capturing. It is a window for looking. What ends up in the frame is less about what was in front of the lens and more about what was worth waiting for.
Nature's Window is that wait, and everything it finds.
If something here resonates with you, or if you have a project worth building together, I would love to connect.

                </h1>
                <h1 className="text-2xl font-bold">
                  I'm always open to collaborations and new projects – let's
                  connect!
                </h1>
              </div>
              <div className="image flex-[0.5] text-yellow ">
                <img
                  src={profile}
                  alt="profile"
                   data-aos="fade-down"
                  className="flex object-cover rounded-md  w-[80%]" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="w-full full">
          <div className="justify-center items-center flex" data-aos="fade-up">
            <p className="text-6xl border-b-2 text-left w-[85%] flex text-yellow font-bold">
              Contact
            </p>
          </div>

          <div className="flex md:flex-row flex-col justify-center items-center gap-10">
            <div className="w-[90%] h-full flex text-yellow justify-between md:flex-col lg:flex-row flex-col lg:gap-20 md:gap-0">
              <div className="flex flex-col gap-6 justify-center p-10" data-aos="fade-right">
                <p className="text-2xl">Let's Collaborate.</p>
                <p className="text-2xl">Drop me a Message.</p>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-8 text-white/50 text-xl"
                >
                  <div className="flex md:flex-row flex-col gap-2">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="bg-grey/70 p-3"
                      placeholder="First Name"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="bg-grey/70 p-3"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                  <div className="flex flex-col bg-grey/40 gap-2">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-grey/40 p-3"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="flex flex-col bg-grey/40 gap-2">
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="bg-grey/40 p-3 rounded-md"
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                  <div className="flex flex-col bg-grey/40 gap-2">
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="bg-grey/40 p-3 rounded-md"
                      placeholder="Subject Title"
                      required
                    />
                  </div>
                  <div className="flex flex-col bg-grey/40 gap-2">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-grey/40 p-3"
                      placeholder="Your Message"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow/80 transition"
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              </div>
              <div className="justify-center items-center flex w-full" data-aos="fade-right">
                <InstagramEmbed
                  url="https://www.instagram.com/natureswindowbyswastik/?utm_source=ig_web_button_share_sheet"
                  className="w-full p-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-fit md:h-screen text-white overflow-hidden flex justify-center items-center text-center">
          <div className="h-[80%] relative md:overflow-hidden flex justify-center items-center" >
            <img
              src="https://res.cloudinary.com/dj010hm7j/image/upload/v1737966941/DSC_4037_qipg2v.jpg"
              alt=""
              className="object-center " data-aos="fade-right"
            />
            <div className="absolute inset-0 bg-gradient-to-b bg-black/50"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-yellow">
           
      <p className="md:text-4xl text-white text-2xl font-bold" data-aos="fade-left">
      Photography has little to do with the things you see and everything to do with the way you see them.
      </p>
      <p className='text-3xl font-bold'>—Elliot Erwitt</p>
    </div>
     
          </div>
        </div>
        

        <Footer/>
      </div>

  
      <ToastContainer />
    </>
  );
}

export default About;