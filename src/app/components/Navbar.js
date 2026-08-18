"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  User,
  LogOut,
  Calendar,
  ChevronDown,
  Menu,
  X,
  Car
} from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef(null);

  // Fetch user on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      fetch(`https://car-rental-website-backend.vercel.app/auth/profile/${userId}`)
        .then((res) => { if (res.ok) return res.json(); throw new Error("Failed"); })
        .then((data) => setUser(data))
        .catch(() => setUser(null));
    }
  }, []);

  // Scroll listener for transparent → solid transition
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  // Close mobile on outside click
  useEffect(() => {
    if (!isMobileOpen) return;
    const handler = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isMobileOpen]);

  // Hide entirely on dashboard routes
  if (pathname && pathname.startsWith("/dashboard")) return null;

  const isHomePage = pathname === "/";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    setIsDropdownOpen(false);
    router.push("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/listing", label: "Fleet" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  // Navbar bg: on home → transparent until scrolled; on other pages → always solid
  const navBg = isHomePage
    ? scrolled
      ? "bg-gray-950/95 backdrop-blur-xl shadow-2xl shadow-black/20 border-b border-white/5"
      : "bg-transparent"
    : "bg-gray-950/95 backdrop-blur-xl shadow-2xl shadow-black/20 border-b border-white/5";

  return (
    <>
      <nav className={`w-full z-50 transition-all duration-500 ${isHomePage ? 'fixed top-0 left-0' : 'relative'} ${navBg}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform duration-300">
              <Car size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Car<span className="text-blue-400">Rental</span>
            </span>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 group ${isActive
                        ? "text-white bg-white/10"
                        : "text-gray-300 hover:text-white hover:bg-white/8"
                      }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* AUTH SECTION */}
          <div className="hidden md:flex items-center gap-3 relative">
            {user ? (
              <div className="relative">
                <button
                  id="user-menu-btn"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 px-3 py-2 rounded-full transition-all border border-white/10 backdrop-blur-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {getInitials(user.name)}
                  </div>
                  <span className="text-sm font-semibold text-white">{user.name || "User"}</span>
                  <ChevronDown size={15} className={`text-gray-300 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-64 bg-gray-950 border border-white/10 rounded-2xl shadow-2xl py-2 z-20 animate-slide-down">
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-sm font-bold text-white">{user.name || "User"}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/8 transition-colors">
                          <Calendar size={15} className="text-blue-400" /> Dashboard
                        </Link>
                        <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/8 transition-colors">
                          <User size={15} className="text-blue-400" /> Profile
                        </Link>
                      </div>
                      <div className="border-t border-white/10 pt-2">
                        <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors font-medium">
                          <LogOut size={15} /> Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors px-3 py-2">
                  Sign In
                </Link>
                <Link href="/signup" className="btn-shimmer text-sm font-bold text-white px-5 py-2.5 rounded-full shadow-lg">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            id="mobile-menu-btn"
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden fixed top-0 left-0 right-0 z-40 bg-gray-950 border-b border-white/10 transition-all duration-300 ease-in-out ${isMobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
          }`}
        style={{ paddingTop: '80px' }}
      >
        <div className="px-6 py-6 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${isActive
                    ? "text-white bg-blue-600/20 text-blue-400"
                    : "text-gray-300 hover:text-white hover:bg-white/8"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            {user ? (
              <>
                <div className="px-4 py-3 bg-white/5 rounded-xl">
                  <p className="font-bold text-white">{user.name}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
                <Link href="/dashboard" className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/8 rounded-xl transition">Dashboard</Link>
                <button onClick={handleLogout} className="text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition font-medium">Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-center py-3 text-gray-300 font-semibold hover:text-white transition border border-white/10 rounded-xl">Sign In</Link>
                <Link href="/signup" className="block text-center py-3 btn-shimmer text-white font-bold rounded-xl shadow-lg">Get Started</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
      )}
    </>
  );
}