"use client";

import React, { useEffect, useState } from 'react';
import { X, Check, Calendar, MapPin, Fuel, Gauge, Settings, User, Briefcase } from 'lucide-react';

export default function Listings() {
  const [loaded, setLoaded] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null); 
  const [showSuccess, setShowSuccess] = useState(false); 
  
 
  const staticCars = [
    {
      id: 'static-1',
      model: "Mitsubishi Pajero",
      price: "389.00",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop",
      description: "Automatic, Diesel, 12 km/l. Best for off-road."
    },
    {
      id: 'static-2',
      model: "Nissan Moco",
      price: "250.00",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
      description: "Automatic, Petrol, 20 km/l. Compact and fuel efficient."
    },
    {
      id: 'static-3',
      model: "Honda Fitta",
      price: "280.00",
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2036&auto=format&fit=crop",
      description: "Manual, Hybrid, 25 km/l. Smooth city drive."
    }
  ];

  const [cars, setCars] = useState(staticCars);

  const [formData, setFormData] = useState({
      name: '',
      phone: '',
      pickupDate: '',
      dropoffDate: ''
  });

  useEffect(() => {
    setLoaded(true);

    
    const fetchCars = async () => {
      try {
        const res = await fetch("http://localhost:3001/cars");
        if (res.ok) {
          const dbCars = await res.json();
          
          setCars([...dbCars, ...staticCars]); 
        }
      } catch (error) {
        console.error("Error connecting to backend:", error);
      }
    };

    fetchCars();
  }, []);

  const handleRentClick = (car) => { setSelectedCar(car); };
  
  const handleClose = () => { 
    setSelectedCar(null); 
    setFormData({ name: '', phone: '', pickupDate: '', dropoffDate: '' }); 
  };

  
  const handleSubmitBooking = async (e) => {
    e.preventDefault();

    
    const bookingData = {
      carModel: selectedCar.model,
      price: String(selectedCar.price), 
      customerName: formData.name,
      phone: formData.phone,
      pickupDate: formData.pickupDate,
      dropoffDate: formData.dropoffDate
    };

    try {
      // Backend API Call (Port 3001)
      const res = await fetch("http://localhost:3001/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        
        setShowSuccess(true); 
        handleClose(); 
        setFormData({ name: '', phone: '', pickupDate: '', dropoffDate: '' });
        
        
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        alert("Booking Failed! Please try again.");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Server Error. Backend shayad band hai.");
    }
  };

  return (
    <main className="min-h-screen font-sans relative selection:bg-blue-500 selection:text-white bg-gray-900">
      
      <style jsx global>{`
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
      `}</style>

      
      {showSuccess && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] bg-green-600 text-white px-8 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in-up border border-green-400/50 backdrop-blur-md">
           <div className="bg-white/20 p-2 rounded-full">
              <Check size={24} className="text-white" />
           </div>
           <div>
              <h4 className="font-bold text-lg leading-none">Booking Successful!</h4>
              <p className="text-sm text-green-100 mt-1">Details saved in Database.</p>
           </div>
        </div>
      )}

     
      <div className="fixed inset-0 w-full h-full -z-10">
         <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop" alt="Background" className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-black/70"></div> 
      </div>

      <div className="relative z-10 overflow-x-hidden">
        
        {/* HEADER */}
        <div className={`h-[300px] w-full flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-12 pt-10 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg leading-tight">Premium Fleet</h1>
          <p className="text-gray-300 text-base md:text-lg font-medium drop-shadow-md">
            <span className="hover:text-blue-400 cursor-pointer transition">Home</span> <span className="mx-2 text-blue-400">/</span> <span className="text-white border-b-2 border-blue-500 pb-1">Listings</span>
          </p>
        </div>

        {/* CARS SECTION */}
        <section className="py-16 md:py-20 max-w-7xl mx-auto px-6 md:px-12">
          <div className={`mb-12 opacity-0 ${loaded ? 'animate-fade-in-up delay-100' : ''}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-md">Available Cars</h2>
            <p className="text-gray-300 max-w-2xl font-medium">Choose from our latest collection added by the admin.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {cars.map((car, index) => (
              <div key={car.id || index} className={`bg-white/10 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 group opacity-0 ${loaded ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                
                {/* Image */}
                <div className="h-56 md:h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition z-10" />
                  <img 
                    src={car.image || "https://via.placeholder.com/500x300?text=No+Image"} 
                    alt={car.model} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-in-out" 
                  />
                  <div className="absolute top-4 right-4 z-20 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">RENTAL</div>
                </div>

                {/* Details */}
                <div className="p-6 md:p-8">
                  <div className="mb-5">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Latest Model</span>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{car.model}</h3>
                    <p className="text-blue-400 font-bold mt-2 text-lg">${car.price} <span className="text-gray-400 text-sm font-normal">/ day</span></p>
                    
                    <p className="text-gray-400 text-sm mt-2 line-clamp-2">{car.description}</p>
                  </div>

                  <div className="flex justify-between border-b border-white/10 pb-5 mb-5 text-sm text-gray-400">
                    <div className="flex flex-col items-center"><Briefcase size={16} className="mb-1"/><span className="text-xs uppercase">Bags</span><span className="font-bold text-white">2</span></div>
                    <div className="flex flex-col items-center"><Settings size={16} className="mb-1"/><span className="text-xs uppercase">Auto</span><span className="font-bold text-white">Yes</span></div>
                    <div className="flex flex-col items-center"><User size={16} className="mb-1"/><span className="text-xs uppercase">Seats</span><span className="font-bold text-white">4</span></div>
                  </div>

                  {/* Rent Button */}
                  <button 
                    onClick={() => handleRentClick(car)}
                    className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3 md:py-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-md"
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS (SAME AS BEFORE) */}
        <section className="py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center md:text-left drop-shadow-md">Happy Clients</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[{ name: "Mike Fisher", role: "Owner, Ford", text: "Great service and amazing cars!" }, { name: "Jean Stanley", role: "Traveler", text: "Loved the smooth booking process." }, { name: "Katie Rose", role: "Customer", text: "Highly recommended for luxury drives." }].map((t, i) => (
                <div key={i} className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg hover:shadow-2xl hover:bg-white/20 transition-all">
                  <p className="text-gray-200 italic mb-6">"{t.text}"</p>
                  <div><h4 className="font-bold text-white">{t.name}</h4><span className="text-sm text-gray-400">{t.role}</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="pt-20 pb-10 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center pt-10 border-t border-white/10 text-gray-400 text-sm">
              <p>&copy; {new Date().getFullYear()} CarRental. All rights reserved</p>
            </div>
          </div>
        </footer>

      </div>

      {/* POPUP MODAL */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose}></div>
          <div className="relative bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up">
            
            <button onClick={handleClose} className="absolute top-4 right-4 z-50 bg-white/50 hover:bg-red-500 hover:text-white text-gray-800 p-2 rounded-full transition border border-gray-200 backdrop-blur-md">
              <X size={24} />
            </button>

            <div className="w-full md:w-1/2 relative bg-gray-100">
               <img src={selectedCar.image || "https://via.placeholder.com/500x300?text=No+Image"} alt={selectedCar.model} className="w-full h-64 md:h-full object-cover" />
               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-white">
                  <h3 className="text-3xl font-bold mb-1">{selectedCar.model}</h3>
                  <p className="text-xl font-medium text-blue-400">${selectedCar.price} <span className="text-sm text-white/70">/ Day</span></p>
                  <p className="text-xs text-gray-300 mt-2 line-clamp-3">{selectedCar.description}</p>
               </div>
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-8 max-h-[80vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      { icon: Settings, label: "Transmission", value: "Automatic" },
                      { icon: Fuel, label: "Fuel", value: "Petrol" },
                      { icon: Gauge, label: "Mileage", value: "15 km/l" },
                      { icon: MapPin, label: "Location", value: "New York" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
                          <item.icon className="text-blue-600" size={20} />
                          <div>
                              <p className="text-xs text-gray-500">{item.label}</p>
                              <p className="font-bold text-gray-900 text-sm">{item.value}</p>
                          </div>
                      </div>
                    ))}
                </div>

                <h4 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                    <Calendar className="text-blue-600" size={20} /> Book this Car
                </h4>
                
                
                <form onSubmit={handleSubmitBooking} className="space-y-4">
                    {['Full Name', 'Phone Number'].map((label, idx) => (
                      <div key={idx}>
                          <label className="text-xs font-bold text-gray-500 uppercase">{label}</label>
                          <input 
                              required
                              type={label.includes('Phone') ? 'tel' : 'text'}
                              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 mt-1 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-gray-800"
                              value={label.includes('Phone') ? formData.phone : formData.name}
                              onChange={(e) => setFormData({...formData, [label.includes('Phone') ? 'phone' : 'name']: e.target.value})}
                          />
                      </div>
                    ))}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Pick-up Date</label>
                            <input required type="date" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 mt-1 focus:bg-white focus:border-blue-500 outline-none text-gray-800" value={formData.pickupDate} onChange={(e) => setFormData({...formData, pickupDate: e.target.value})} />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Drop-off Date</label>
                            <input required type="date" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 mt-1 focus:bg-white focus:border-blue-500 outline-none text-gray-800" value={formData.dropoffDate} onChange={(e) => setFormData({...formData, dropoffDate: e.target.value})} />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all mt-4 flex justify-center items-center gap-2">
                        <Check size={20} /> Confirm Booking
                    </button>
                </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}