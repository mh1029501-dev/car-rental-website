"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchCars();
    }
  }, []);

  const fetchCars = async () => {
    try {
      const res = await fetch("http://localhost:3001/cars");
      if (res.ok) {
        const data = await res.json();
        setCars(data);
      }
    } catch (error) {
      console.log("Error fetching cars");
    }
  };

  // 👇 DELETE FUNCTION
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this car?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3001/cars/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // UI se bhi car hata do (Refresh kiye baghair)
        setCars(cars.filter((car) => car.id !== id));
        alert("Car Deleted Successfully!");
      } else {
        alert("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* --- ADD LISTING SECTION --- */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Car Listing</h2>
        <p className="text-gray-600 mb-4">Click below to add a new car to the database.</p>
        <button 
          onClick={() => router.push('/dashboard/add')} 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          + Add New Car
        </button>
      </div>

      {/* --- DISPLAY LISTINGS --- */}
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Your Listings</h2>
      
      {cars.length === 0 ? (
        <p className="text-gray-500">No cars added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              
              {/* 👇 IMAGE SECTION */}
              <div className="h-48 w-full bg-gray-200 relative">
                <img 
                  src={car.image || "https://via.placeholder.com/400"} 
                  alt={car.model} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* DETAILS SECTION */}
              <div className="p-4">
                <h3 className="font-bold text-xl text-gray-800">{car.model}</h3>
                <p className="text-blue-600 font-bold text-lg mt-1">${car.price}/day</p>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{car.description}</p>
                
                {/* 👇 DELETE BUTTON */}
                <button 
                  onClick={() => handleDelete(car.id)}
                  className="mt-4 w-full bg-red-100 text-red-600 py-2 rounded font-semibold hover:bg-red-200 transition"
                >
                  Delete Listing
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}