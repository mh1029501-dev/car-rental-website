'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// ANIMATIONS
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const FormInput = ({ type, name, placeholder, value, onChange, required = true }) => (
  <div className="group">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-5 py-4 bg-white/80 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm group-hover:shadow-md placeholder-gray-500 text-gray-900"
      required={required}
    />
  </div>
);

const ContactInfoCard = () => (
  <motion.div
    variants={fadeInUp}
    className="bg-white/90 backdrop-blur-md p-8 md:p-10 border border-white/20 rounded-2xl shadow-2xl h-full relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-bl-full -mr-16 -mt-16 z-0"></div>
    <div className="relative z-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">Contact Info</h3>
        <div className="space-y-8 text-gray-700">
        <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shrink-0 text-white shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>
            <div>
            <p className="font-bold text-gray-900 text-lg">Address</p>
            <p className="mt-1">34 Street Name, City Name Here, Kahna</p>
            </div>
        </div>
        <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shrink-0 text-white shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            </div>
            <div>
            <p className="font-bold text-gray-900 text-lg">Phone</p>
            <p className="mt-1">+923024331286</p>
            </div>
        </div>
        <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shrink-0 text-white shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <div>
            <p className="font-bold text-gray-900 text-lg">Email</p>
            <Link href="hammadrasheed596@gmail.com" className="mt-1 text-blue-600 hover:text-blue-800 transition">hammadrasheed596@gmail.com</Link>
            </div>
        </div>
        </div>
    </div>
  </motion.div>
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });
    
    
    const payload = {
        firstName: formData.firstName, 
        lastName: formData.lastName,
        email: formData.email,
        message: formData.message,
    };

    try {
      
      const res = await fetch('http://localhost:3001/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), 
      });

      if (!res.ok) {
        throw new Error('Server error occurred');
      }

      setStatus({ loading: false, success: true, error: null });
      setFormData({ firstName: '', lastName: '', email: '', message: '' }); 

    } catch (error) {
      console.error(error);
      setStatus({ loading: false, success: false, error: `Failed to send message: ${error.message}` });
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden text-gray-800">

    
      <div className="fixed inset-0 z-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop"
          alt="Background Car"
          fill
          className="object-cover"
          priority
          quality={100}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        <div className="pt-32 pb-12 md:pt-40 md:pb-16 max-w-7xl mx-auto px-6 md:px-12 w-full">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-left"
            >
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-xl">
                Contact Us
                </h1>
                <p className="mt-4 text-lg md:text-xl font-medium text-gray-200">
                    <Link href="/" className="hover:text-white hover:underline transition">Home</Link>
                    <span className="mx-2">/</span>
                    <span className="text-blue-400">Contact</span>
                </p>
            </motion.div>
        </div>
        <section className="pb-20 px-4 sm:px-6 grow">
            <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto"
            >
           
            <motion.div variants={fadeInUp} className="max-w-3xl mx-auto mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
                Get in Touch Or <span className="text-blue-400">Rent A Car</span>
                </h2>
                <p className="mt-4 text-lg text-gray-200 leading-relaxed drop-shadow-md max-w-2xl mx-auto">
                We are here to help you with your car rental needs. Fill out the form below and we'll get back to you as soon as possible.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
               
              
                <motion.form
                  variants={fadeInUp}
                  className="lg:col-span-2 space-y-6 bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-white/20 shadow-2xl"
                  onSubmit={handleSubmit}
                >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    <FormInput
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                </div>
                <FormInput
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
               
                <div className="group">
                    <textarea
                      name="message"
                      placeholder="Write your message here..."
                      rows="7"
                      className="w-full px-5 py-4 bg-white/80 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm group-hover:shadow-md resize-none placeholder-gray-500 text-gray-900"
                      required
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                </div>

               
                {status.success && (
                  <div className="p-4 bg-green-100 text-green-700 rounded-lg font-semibold">
                    Message sent successfully! We will contact you soon.
                  </div>
                )}
                {status.error && (
                  <div className="p-4 bg-red-100 text-red-700 rounded-lg font-semibold">
                    {status.error}
                  </div>
                )}

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={status.loading}
                        className="w-full md:w-auto bg-blue-600 text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    {status.loading ? 'Sending...' : 'Send Message'}
                    </button>
                </div>
                </motion.form>
                <div className="lg:col-span-1 h-full">
                <ContactInfoCard />
                </div>

            </div>
            </motion.div>
        </section>
      </div>
    </main>
  );
}