"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Agar token nahi milta toh login page par bhejo
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Jab tak token check nahi hota tab tak page content render nahi hoga
  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white font-semibold">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold text-blue-500 border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-2">
          {/* Link component use kiya hai full reload bachane ke liye */}
          <Link href="/dashboard" className="block py-2.5 px-4 rounded hover:bg-gray-800 transition">
            🚗 Overview
          </Link>

          <Link href="/dashboard/add" className="block py-2.5 px-4 rounded hover:bg-gray-800 transition">
            ➕ Add Listing
          </Link>

          <Link href="/dashboard/bookings" className="block py-2.5 px-4 rounded hover:bg-gray-800 transition">
            📅 View Bookings
          </Link>

          <Link href="/" className="block py-2.5 px-4 rounded hover:bg-gray-800 transition text-gray-400">
            🏠 Back to Home
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-700 text-sm text-gray-500">
          Logged in as Admin
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto bg-gray-900 text-white">
        {children}
      </main>
    </div>
  );
}