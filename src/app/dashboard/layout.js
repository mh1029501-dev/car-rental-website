
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, Car, PlusSquare, Calendar, Home } from "lucide-react";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Logout Function: LocalStorage clear karke direct Home Page ('/') par bhejega
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/");
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white font-semibold">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col border-r border-gray-800">
        <div className="p-6 text-2xl font-bold text-blue-500 border-b border-gray-800 flex items-center gap-2">
          Admin Panel
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 py-2.5 px-4 rounded-xl hover:bg-gray-800 transition text-gray-300 hover:text-white font-medium">
            <Car size={18} className="text-blue-400" /> Overview
          </Link>

          <Link href="/dashboard/add" className="flex items-center gap-3 py-2.5 px-4 rounded-xl hover:bg-gray-800 transition text-gray-300 hover:text-white font-medium">
            <PlusSquare size={18} className="text-blue-400" /> Add Listing
          </Link>

          <Link href="/dashboard/bookings" className="flex items-center gap-3 py-2.5 px-4 rounded-xl hover:bg-gray-800 transition text-gray-300 hover:text-white font-medium">
            <Calendar size={18} className="text-blue-400" /> View Bookings
          </Link>

          <Link href="/" className="flex items-center gap-3 py-2.5 px-4 rounded-xl hover:bg-gray-800 transition text-gray-400 hover:text-white font-medium">
            <Home size={18} /> Back to Home
          </Link>
        </nav>

        {/* LOGOUT BUTTON SECTION */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition font-semibold"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto bg-gray-950">
        {children}
      </main>
    </div>
  );
}