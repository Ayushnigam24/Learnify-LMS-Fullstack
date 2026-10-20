import React, { useState } from 'react'
import { server } from '../../main'
import toast from 'react-hot-toast'
import {motion} from 'framer-motion'
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaMapPin } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";



const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`${server}/api/user/contact-us`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      toast.success(data.message)

      setFormData({
        name: '',
        email: '',
        mobile: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      alert('Something went wrong')
    }
  }

  const container ={
    hidden :{},
    show:{
        transition:{
            staggerChildren:0.1
        }
    }
  }

  const itemAnimation = {
    hidden:{x:-80, y:-40, opacity:0},
    show:{x:0,y:0, opacity:1}
  }

  return (<>
<div className="bg-blue-50 px-4 sm:px-6 lg:px-8">
  <div className="carter-one-regular text-center p-6 sm:p-10">
    <p className='text-4xl md:text-5xl'>We'd Love to <span className='text-blue-700'></span></p>
        <h2 className="text-4xl md:text-5xl font-bold text-blue-700 underline">
         hear from you
        </h2>
        <p className="mt-2 text-gray-400">Have any question , Feedback , or just want to say Hello?.</p>
      </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-2 pb-10">
  <div className="form m-3 sm:m-5 shadow-lg p-6 sm:p-8 rounded-2xl bg-white border border-gray-100">
    <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-xl"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
            required
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="sm:col-span-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="sm:col-span-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
            required
          />

          <textarea
            name="message"
            rows={4}
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="sm:col-span-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 py-3 text-white text-sm font-semibold tracking-wide transition-all duration-200 shadow-md shadow-blue-200"
        >
          Let's Talk
        </button>
      </form>
  </div>

  <div className="phone p-3 sm:p-5 my-auto">
    <div className="bg-blue-700 text-white p-6 sm:p-8 rounded-2xl">
      <h1 className='black-ops-one-regular text-2xl sm:text-3xl font-semibold mb-3'>Contact Information</h1>
      <h1 className='text-sm sm:text-base'>Reach out anytime - our team is always ready for help you out.</h1>
      <div className="contact mt-8 sm:mt-10">
        <div className="flex items-center mb-5 gap-4">
          <div className="shrink-0 border-white h-10 w-10 shadow-lg border text-white p-3 bg-blue-500 rounded-2xl">
            <FaPhoneAlt/>
          </div>
          <h1 className='font-semibold text-sm sm:text-base'>+91 8808694461</h1>
        </div>
        <div className="flex items-center mb-5 gap-4">
          <div className="shrink-0 border-white h-10 w-10 shadow-lg border text-white p-3 bg-blue-500 rounded-2xl">
            <MdEmail/>
          </div>
          <h1 className='font-semibold text-sm sm:text-base break-all'>ayushnigamandh24@gmail.com</h1>
        </div>
        <div className="flex items-center mb-5 gap-4">
          <div className="shrink-0 border-white h-10 w-10 shadow-lg border text-white p-3 bg-blue-500 rounded-2xl">
            <FaMapPin/>
          </div>
          <h1 className='font-semibold text-sm sm:text-base'>Azamgarh , Up , India</h1>
        </div>
        <div className="flex items-center mb-5 gap-4">
          <div className="shrink-0 border-white h-10 w-10 shadow-lg border text-white p-3 bg-blue-500 rounded-2xl">
            <FaClock/>
          </div>
          <h1 className='font-semibold text-sm sm:text-base'>Mon - Sat * 9 AM - 6 PM</h1>
        </div>
      </div>
      <div className="links gap-4 flex flex-wrap">
        <motion.a whileHover={{scale:1.1}} className="border border-white shadow-lg p-3 bg-blue-500 rounded-2xl text-white cursor-pointer">
            <FaGithub/>
          </motion.a>
          <motion.a whileHover={{scale:1.1}} className="border border-white shadow-lg p-3 bg-blue-500 rounded-2xl text-white cursor-pointer">
            <FaInstagram/>
          </motion.a>
          <motion.a whileHover={{scale:1.1}} className="border border-white shadow-lg p-3 bg-blue-500 rounded-2xl text-white cursor-pointer">
            <FaLinkedinIn/>
          </motion.a>
          <motion.a whileHover={{scale:1.1}} className="border border-white shadow-lg p-3 bg-blue-500 rounded-2xl text-white cursor-pointer">
            <FaXTwitter/>
          </motion.a>
      </div>
    </div>
  </div>
</div>
      
    </div>
  </>
  )
}

export default Contact