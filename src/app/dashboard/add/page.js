"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    model: "",
    price: "",
    description: "",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1000&auto=format&fit=crop" // Default image
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    
    const dataToSend = { ...formData, price: Number(formData.price) };

    try {
      const res = await fetch("http://localhost:3001/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        alert("Car Added Successfully!");
        router.push("/dashboard"); 
      } else {
        alert("Error adding car");
      }
    } catch (error) {
      console.error(error);
      alert("Backend se connect nahi ho paya");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Car</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md flex flex-col gap-4">
        
        <div>
          <label className="block text-gray-700 font-bold mb-2">Car Model</label>
          <input 
            type="text" 
            className="w-full border p-2 rounded" 
            
            value={formData.model}
            onChange={(e) => setFormData({...formData, model: e.target.value})}
             
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Price per Day ($)</label>
          <input 
            type="number" 
            className="w-full border p-2 rounded" 
           
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
           
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2"> ($)</label>
          <input 
            type="number" 
            className="w-full border p-2 rounded" 
          
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            required 
          />
        </div>
      
        <div>
          <label className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea 
            className="w-full border p-2 rounded" 
            rows="3"
           
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Image URL</label>
          <input 
            type="text" 
            className="w-full border p-2 rounded" 
          
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
          />
          <p className="text-xs text-gray-500 mt-1">Abhi ke liye default image set hai.</p>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Saving..." : "Save Car Listing"}
        </button>

      </form>
    </div>
  );
}