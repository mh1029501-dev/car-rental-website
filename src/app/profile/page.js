"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Shield, Save } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null); // ID ko state mein rakh liya

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (!token || !storedUserId) {
      router.push("/login");
      return;
    }

    setUserId(storedUserId);

    // Data Mangwana
    const fetchProfile = async () => {
      try {
        const res = await fetch(`https://car-rental-website-backend.vercel.app/auth/profile/${storedUserId}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          console.error("Profile fetch failed");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 👇 YEH FUNCTION ADD KIYA HAI (Save karne ke liye)
  const handleSave = async () => {
    try {
      const res = await fetch(`https://car-rental-website-backend.vercel.app/auth/profile/${userId}`, {
        method: "PUT", // Update request
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: user.name }), // Sirf naam bhej rahe hain
      });

      if (res.ok) {
        alert("Profile Updated Successfully!");
        window.location.reload(); // Refresh taaky naya naam har jagah dikhe
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Server Error");
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-gray-900 text-white">Loading...</div>;
  }

  if (!user) {
    return <div className="p-10 text-center">User not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        <div className="h-32 bg-blue-600"></div>

        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6">
            <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg inline-block">
              <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center text-4xl font-bold text-blue-600 uppercase">
                {user.name ? user.name.charAt(0) : "U"}
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {user.name || "No Name Set"}
          </h1>
          <p className="text-gray-500 mb-8 flex items-center gap-2">
            <Shield size={16} className="text-blue-500" /> {user.role}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Full Name Input (Editable) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 hover:border-blue-500 transition">
                <User size={20} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  value={user.name || ""}
                  // 👇 YEH CHANGE KIYA: User ko type karne ki ijazat di
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="bg-transparent w-full outline-none text-gray-700 font-medium"
                />
              </div>
            </div>

            {/* Email (ReadOnly) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-100">
                <Mail size={20} className="text-gray-400 mr-2" />
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="bg-transparent w-full outline-none text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Role (ReadOnly) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-100">
                <Shield size={20} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  value={user.role}
                  readOnly
                  className="bg-transparent w-full outline-none text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">

            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
            >
              <Save size={18} /> Save Changes
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-6 py-2.5 rounded-lg font-semibold text-gray-600 hover:bg-gray-100 transition border border-gray-300"
            >
              Back to Dashboard
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}