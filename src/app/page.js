"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDown, MapPin, Play, Calendar, Car, X,
  Facebook, Twitter, Instagram, Mail, Phone,
  Star, Shield, Clock, Award, ArrowRight, CheckCircle2,
  Zap, Users, Globe, TrendingUp
} from 'lucide-react';

// --- Animated Counter Hook ---
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// --- Stat Card ---
function StatCard({ icon: Icon, value, suffix, label, color, start }) {
  const count = useCounter(value, 2000, start);
  return (
    <div className="flex flex-col items-center p-6 glass-card rounded-2xl group hover:bg-white/10 transition-all duration-300">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
        <Icon size={22} className="text-white" />
      </div>
      <div className="text-3xl font-bold text-white mb-1">
        {count}<span className="text-blue-400">{suffix}</span>
      </div>
      <p className="text-gray-400 text-sm font-medium text-center">{label}</p>
    </div>
  );
}

// --- Testimonial Card ---
const testimonials = [
  { name: "Ahmed Raza", role: "Business Traveler", text: "Absolutely seamless experience. The car was spotless and the booking took under 2 minutes. Highly recommend!", stars: 5, avatar: "AR" },
  { name: "Sara Malik", role: "Family Trip", text: "We rented an SUV for our Murree trip and it was perfect. Great rates, zero hidden charges. Will definitely use again!", stars: 5, avatar: "SM" },
  { name: "Usman Khan", role: "Daily Commuter", text: "The fuel efficiency and condition of the car exceeded my expectations. A truly premium service at a fair price.", stars: 5, avatar: "UK" },
];

// --- Popular Car Card ---
const popularCars = [
  {
    model: "Mitsubishi Pajero",
    type: "SUV",
    price: "389",
    rating: 4.9,
    reviews: 128,
    fuel: "Diesel",
    seats: 7,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop",
    badge: "Most Popular",
    badgeColor: "bg-amber-500",
  },
  {
    model: "Honda City",
    type: "Sedan",
    price: "280",
    rating: 4.8,
    reviews: 214,
    fuel: "Petrol",
    seats: 5,
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=800&auto=format&fit=crop",
    badge: "Best Value",
    badgeColor: "bg-green-500",
  },
  {
    model: "Nissan Moco",
    type: "Economy",
    price: "250",
    rating: 4.7,
    reviews: 96,
    fuel: "Petrol",
    seats: 4,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop",
    badge: "Fuel Saver",
    badgeColor: "bg-blue-500",
  },
];

export default function Home() {
  const [carType, setCarType] = useState('HONDA');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  const carTypes = ["COROLLA", "CIVIC", "125", "MEHRAN", "70", "PAJERO", "MOCO"];

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Intersection observer for stats counter
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSearch = () => {
    if (!location || !pickupDate || !dropoffDate) {
      alert("Please fill in all fields!");
      return;
    }
    alert(`Searching for ${carType} in ${location}...`);
  };

  return (
    <main className="min-h-screen font-sans text-gray-700 bg-[#050810] overflow-x-hidden flex flex-col">

      {/* ===== HERO SECTION ===== */}
      <div className="relative w-full h-screen min-h-[680px]">

        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/background.jpg"
            alt="Premium Car Background"
            fill
            className={`object-cover transition-transform duration-[2500ms] ease-out ${loaded ? 'scale-100' : 'scale-110'}`}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-[#050810]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-start max-w-7xl mx-auto px-6 md:px-12 z-20 pb-32">

          {/* Badge pill */}
          <div className={`transition-all duration-700 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

          </div>

          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tight mb-6 transition-all duration-1000 ease-out ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Drive Your <br />
            <span className="gradient-text">Dream Car</span><br />
            <span className="text-white font-light text-4xl md:text-5xl lg:text-6xl">on your terms.</span>
          </h1>

          <p className={`text-gray-300 text-lg md:text-xl max-w-xl leading-relaxed mb-8 transition-all duration-1000 delay-200 ease-out ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Premium fleet. Unbeatable rates. Instant booking. Experience hassle-free car rentals across Pakistan.
          </p>

          <div className={`flex items-center gap-4 transition-all duration-1000 delay-300 ease-out ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Link href="/listing" className="btn-shimmer text-white font-bold py-4 px-8 rounded-2xl shadow-xl flex items-center gap-2 group">
              Browse Fleet <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button onClick={() => setIsVideoOpen(true)} className="flex items-center gap-3 text-white font-semibold hover:text-blue-300 transition-colors">
              <div className="bg-white/15 hover:bg-white/25 border border-white/20 text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm">
                <Play size={18} fill="currentColor" />
              </div>
              How it Works
            </button>
          </div>
        </div>

        {/* Search Form */}
        <div className={`absolute bottom-0 left-0 right-0 z-30 px-4 transition-all duration-1000 delay-500 ease-out ${loaded ? 'translate-y-[45%] opacity-100' : 'translate-y-[100%] opacity-0'}`}>
          <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-5 md:p-6 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center border border-gray-100/80">

            {/* Car Type */}
            <div className="relative lg:flex-1">
              <div className="border border-gray-200 rounded-2xl p-3 px-4 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all bg-white group" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <span className="text-xs text-gray-400 mb-1 flex items-center gap-1.5 font-medium uppercase tracking-wide"><Car size={11} /> Car Type</span>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800">{carType}</span>
                  <ChevronDown className={`w-4 h-4 text-blue-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>
              <div className={`absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden transition-all duration-300 origin-top ${isDropdownOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none h-0'}`}>
                {carTypes.map((type) => (
                  <div key={type} className="p-3 px-4 hover:bg-blue-50 hover:text-blue-600 cursor-pointer text-sm font-semibold text-gray-700 transition-colors border-b border-gray-50 last:border-none" onClick={() => { setCarType(type); setIsDropdownOpen(false); }}>
                    {type}
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-10 bg-gray-200" />

            {/* Location */}
            <div className="lg:flex-1 border border-gray-200 rounded-2xl p-3 px-4 hover:border-blue-500 hover:shadow-md transition-all bg-white">
              <label className="text-xs text-gray-400 mb-1 flex items-center gap-1.5 font-medium uppercase tracking-wide"><MapPin size={11} /> Location</label>
              <input type="text" id="search-location" placeholder="Lahore, Islamabad..." className="w-full text-gray-800 font-bold placeholder:text-gray-300 outline-none text-sm bg-transparent" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>

            <div className="hidden lg:block w-px h-10 bg-gray-200" />

            {/* Pick up */}
            <div className="lg:flex-1 border border-gray-200 rounded-2xl p-3 px-4 hover:border-blue-500 hover:shadow-md transition-all bg-white">
              <label className="text-xs text-gray-400 mb-1 flex items-center gap-1.5 font-medium uppercase tracking-wide"><Calendar size={11} /> Pick Up</label>
              <input type="date" id="search-pickup" className="w-full font-bold text-gray-800 outline-none text-sm cursor-pointer bg-transparent uppercase" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
            </div>

            <div className="hidden lg:block w-px h-10 bg-gray-200" />

            {/* Drop off */}
            <div className="lg:flex-1 border border-gray-200 rounded-2xl p-3 px-4 hover:border-blue-500 hover:shadow-md transition-all bg-white">
              <label className="text-xs text-gray-400 mb-1 flex items-center gap-1.5 font-medium uppercase tracking-wide"><Calendar size={11} /> Drop Off</label>
              <input type="date" id="search-dropoff" className="w-full font-bold text-gray-800 outline-none text-sm cursor-pointer bg-transparent uppercase" value={dropoffDate} onChange={(e) => setDropoffDate(e.target.value)} />
            </div>

            {/* Search Button */}
            <button id="search-btn" onClick={handleSearch} className="lg:flex-none btn-shimmer text-white font-bold py-4 px-8 rounded-2xl shadow-lg whitespace-nowrap flex items-center gap-2">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for search form overlap */}
      <div className="h-52 lg:h-36 bg-[#050810]" />

      {/* ===== STATS STRIP ===== */}
      <section ref={statsRef} className="py-16 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Car} value={500} suffix="+" label="Vehicles in Fleet" color="bg-blue-600" start={statsVisible} />
          <StatCard icon={Users} value={10000} suffix="+" label="Happy Customers" color="bg-violet-600" start={statsVisible} />
          <StatCard icon={Globe} value={12} suffix="" label="Cities Covered" color="bg-emerald-600" start={statsVisible} />
          <StatCard icon={TrendingUp} value={5} suffix="★" label="Average Rating" color="bg-amber-500" start={statsVisible} />
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="text-center mb-16">
          <span className="text-blue-400 text-sm font-bold uppercase tracking-widest mb-3 block">Simple Process</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">How it <span className="gradient-text">works?</span></h2>
          <p className="text-gray-400 max-w-md mx-auto">Three easy steps and you're on the road. No paperwork hassle, no hidden fees.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {[
            { id: "01", icon: Car, title: "Select a Car", desc: "Browse our premium fleet and pick the perfect vehicle that matches your style and needs." },
            { id: "02", icon: Calendar, title: "Book Instantly", desc: "Enter your location, dates, and personal details. Our smart system confirms in seconds." },
            { id: "03", icon: CheckCircle2, title: "Hit the Road", desc: "Securely pay, collect your keys, and enjoy the drive. We handle everything else." },
          ].map((item, index) => (
            <div key={index} className="group glass-card p-8 rounded-2xl hover:bg-white/12 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
              <span className="absolute -right-4 -bottom-4 text-[120px] font-black text-white/[0.03] select-none leading-none">{index + 1}</span>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600/30 transition-all duration-300">
                  <item.icon size={24} className="text-blue-400" />
                </div>
                <div className="text-blue-400 font-black text-sm mb-2 tracking-widest">{item.id}.</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button onClick={() => setIsVideoOpen(true)} className="group flex items-center gap-3 text-gray-400 font-semibold hover:text-white transition-colors">
            <div className="bg-blue-600 text-white rounded-full p-3.5 shadow-lg shadow-blue-600/30 group-hover:scale-110 group-hover:shadow-blue-600/50 transition-all duration-300">
              <Play size={18} fill="currentColor" />
            </div>
            Watch the full tutorial video
          </button>
        </div>
      </section>

      {/* ===== POPULAR CARS ===== */}
      <section className="py-20 md:py-28 bg-white/[0.02] w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-blue-400 text-sm font-bold uppercase tracking-widest mb-3 block">Our Fleet</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">Popular <span className="gradient-text">Cars</span></h2>
            </div>
            <Link href="/listing" className="flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors group">
              View All Cars <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularCars.map((car, i) => (
              <Link key={i} href="/listing" className="group glass-card rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 block">
                <div className="relative h-52 overflow-hidden">
                  <Image src={car.image} alt={car.model} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className={`absolute top-4 left-4 ${car.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}>{car.badge}</span>
                  <span className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-lg border border-white/10">{car.type}</span>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-white text-lg group-hover:text-blue-300 transition-colors">{car.model}</h3>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      <span className="text-white text-sm font-bold">{car.rating}</span>
                      <span className="text-gray-500 text-xs">({car.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span>⛽ {car.fuel}</span>
                    <span>👤 {car.seats} Seats</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-white">${car.price}</span>
                      <span className="text-gray-400 text-sm"> / day</span>
                    </div>
                    <span className="text-sm font-bold text-blue-400 group-hover:text-blue-300 flex items-center gap-1 transition-colors">
                      Rent Now <ArrowRight size={15} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROMO SECTION ===== */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <span className="text-blue-400 text-sm font-bold uppercase tracking-widest mb-3 block">Limited Offer</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.15] mb-6">
              Get up to <span className="gradient-text">30% off</span> on your first rental today.
            </h2>
            <p className="text-gray-400 mb-4 leading-relaxed text-lg">
              Use code <span className="bg-blue-600/20 border border-blue-500/30 text-blue-300 font-bold px-3 py-1 rounded-lg text-sm tracking-widest">DRIVE30</span> at checkout and drive your dream car without breaking the bank.
            </p>
            <ul className="space-y-3 mb-8">
              {["No hidden charges", "Free cancellation within 24h", "24/7 roadside assistance"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 size={18} className="text-blue-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/listing" className="btn-shimmer inline-flex items-center gap-2 text-white font-bold py-4 px-8 rounded-2xl shadow-xl group">
              Explore Deals <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center relative order-1 lg:order-2">
            <div className="relative w-full max-w-md h-[460px] overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white/10 group">
              <Image src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8" alt="Happy Driver" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-gray-950 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-sm animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Shield size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Fully Insured</p>
                  <p className="text-gray-400 text-xs">All vehicles covered</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-gray-950 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-sm animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <Clock size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">24/7 Support</p>
                  <p className="text-gray-400 text-xs">Always available</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-violet-600/15 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 md:py-28 bg-white/[0.02] w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-blue-400 text-sm font-bold uppercase tracking-widest mb-3 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">What our <span className="gradient-text">clients say</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST BADGES ===== */}
      <section className="py-16 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: "Fully Insured", desc: "All our vehicles carry comprehensive insurance for your complete peace of mind.", color: "bg-blue-600" },
            { icon: Zap, title: "Instant Booking", desc: "Confirm your reservation in under 2 minutes with our streamlined system.", color: "bg-violet-600" },
            { icon: Award, title: "Award Winning", desc: "Rated #1 car rental service in Pakistan for 3 consecutive years.", color: "bg-amber-500" },
          ].map((item, i) => (
            <div key={i} className="glass-card p-7 rounded-2xl flex gap-5 items-start hover:bg-white/10 transition-all duration-300 group">
              <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                <item.icon size={22} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== VIDEO MODAL ===== */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in">
          <div className="absolute inset-0" onClick={() => setIsVideoOpen(false)} />
          <div className="relative w-full max-w-4xl bg-gray-950 rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10 animate-scale-in">
            <button onClick={() => setIsVideoOpen(false)} className="absolute top-4 right-4 text-white hover:text-red-400 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all z-20 border border-white/10 backdrop-blur-sm">
              <X size={22} />
            </button>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/h9dTYG1y21k"
                title="How it works video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-950 text-white pt-20 pb-10 border-t border-white/8 w-full mt-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
                <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                  <Car size={18} className="text-white" />
                </div>
                <span className="text-xl font-bold text-white">Car<span className="text-blue-400">Rental</span></span>
              </Link>
              <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                Pakistan's most trusted car rental service. Premium vehicles, transparent pricing, exceptional service.
              </p>
              <div className="flex gap-3">
                <a href="#" aria-label="Facebook" className="w-9 h-9 bg-white/8 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors border border-white/10"><Facebook size={16} /></a>
                <a href="#" aria-label="Twitter" className="w-9 h-9 bg-white/8 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors border border-white/10"><Twitter size={16} /></a>
                <a href="#" aria-label="Instagram" className="w-9 h-9 bg-white/8 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors border border-white/10"><Instagram size={16} /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-bold mb-5 text-white uppercase tracking-widest">Quick Links</h4>
              <ul className="space-y-3">
                {[["About Us", "/about"], ["Car Fleet", "/listing"], ["Blog", "/blog"], ["Contact", "/contact"]].map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 bg-blue-500 rounded-full group-hover:w-3 transition-all duration-300" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-bold mb-5 text-white uppercase tracking-widest">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="text-blue-400 shrink-0 mt-0.5" size={16} />
                  <span className="text-gray-400 text-sm">Lahore, Kahna Nau, Punjab, Pakistan</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-blue-400 shrink-0" size={16} />
                  <span className="text-gray-400 text-sm">+923024331286</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-blue-400 shrink-0" size={16} />
                  <span className="text-gray-400 text-sm">hammadrasheed596@gmail.com</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-sm font-bold mb-5 text-white uppercase tracking-widest">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">Get exclusive deals and rental tips straight to your inbox.</p>
              <div className="flex gap-2">
                <input type="email" id="newsletter-email" placeholder="your@email.com" className="flex-1 bg-white/8 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-blue-500 transition-colors" />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shrink-0">Go</button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} CarRental. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}