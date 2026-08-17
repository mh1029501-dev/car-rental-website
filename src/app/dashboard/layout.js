export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      
      <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold text-blue-500 border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 mt-6 px-4 space-y-2">
          
          
          <a href="/dashboard" className="block py-2.5 px-4 rounded hover:bg-gray-800 transition">
            🚗 Overview
          </a>
          
        
          <a href="/dashboard/add" className="block py-2.5 px-4 rounded hover:bg-gray-800 transition">
            ➕ Add Listing
          </a>

          
          <a href="/dashboard/bookings" className="block py-2.5 px-4 rounded hover:bg-gray-800 transition">
            📅 View Bookings
          </a>

         
          <a href="/" className="block py-2.5 px-4 rounded hover:bg-gray-800 transition text-gray-400">
            🏠 Back to Home
          </a>
        </nav>
        
        <div className="p-4 border-t border-gray-700 text-sm text-gray-500">
          Logged in as Admin
        </div>
      </aside>

      
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}