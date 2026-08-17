"use client";
import { useEffect, useState } from "react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Backend se saari bookings mangwana
    fetch("http://localhost:3001/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Customer Bookings</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Car Model</th>
              <th className="p-4">Price</th>
              <th className="p-4">Dates</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr><td colSpan="6" className="p-4 text-center">No bookings yet.</td></tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50 text-gray-800">
                  <td className="p-4 font-bold">{booking.customerName}</td>
                  <td className="p-4">{booking.phone}</td>
                  <td className="p-4 text-blue-600 font-bold">{booking.carModel}</td>
                  <td className="p-4">${booking.price}</td>
                  <td className="p-4 text-sm">
                    {booking.pickupDate} <br/> to {booking.dropoffDate}
                  </td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}