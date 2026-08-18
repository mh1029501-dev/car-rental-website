"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, Car, PlusSquare, Calendar, Home, Menu, X } from "lucide-react";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

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
    <div className="flex flex-col md:flex-row h-screen bg-gray-950 text-gray-100">

      {/* MOBILE TOP NAVBAR HEADER */}
      <div className="md:hidden flex items-center justify-between bg-gray-900 p-4 border-b border-gray-800">
        <span className="text-xl font-bold text-blue-500">Admin Panel</span>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-300 hover:text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* SIDEBAR (DESKTOP & MOBILE RESPONSIVE) */}
      <aside
        className={`fixed md:relative z-50 inset-y-0 left-0 w-64 bg-gray-900 text-white flex flex-col border-r border-gray-800 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <div className="p-6 text-2xl font-bold text-blue-500 border-b border-gray-800 hidden md:flex items-center gap-2">
          Admin Panel
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-2">
          <Link
            href="/dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 py-2.5 px-4 rounded-xl hover:bg-gray-800 transition text-gray-300 hover:text-white font-medium"
          >
            <Car size={18} className="text-blue-400" /> Overview
          </Link>

          <Link
            href="/dashboard/add"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 py-2.5 px-4 rounded-xl hover:bg-gray-800 transition text-gray-300 hover:text-white font-medium"
          >
            <PlusSquare size={18} className="text-blue-400" /> Add Listing
          </Link>

          <Link
            href="/dashboard/bookings"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 py-2.5 px-4 rounded-xl hover:bg-gray-800 transition text-gray-300 hover:text-white font-medium"
          >
            <Calendar size={18} className="text-blue-400" /> View Bookings
          </Link>

          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 py-2.5 px-4 rounded-xl hover:bg-gray-800 transition text-gray-400 hover:text-white font-medium"
          >
            <Home size={18} /> Back to Home
          </Link>
        </nav>

        {/* LOGOUT BUTTON */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition font-semibold"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* OVERLAY FOR MOBILE WHEN MENU IS OPEN */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto bg-gray-950 p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}