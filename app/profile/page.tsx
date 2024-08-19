"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

const ProfilePage = () => {
  const { data: session } = useSession();
  useEffect(() => {
    document.title = "Profile";
    if (!session) {
      window.location.href = "/";
    }
  }, []);
  return (
    <>
      <main className="flex flex-col w-full h-[90vh] max-h-dvh">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile Picture"
              className="w-32 h-32 rounded-full shadow-md mb-4"
            />
          </div>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold">John Doe</h1>
            <p className="text-gray-600">johndoe@example.com</p>
          </div>

          <div className="space-y-4">
            {/* Date of Birth */}
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-semibold">
                Date of Birth:
              </span>
              <span className="text-gray-600">January 1, 1990</span>
            </div>

            {/* Phone Number */}
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-semibold">Phone Number:</span>
              <span className="text-gray-600">+1 234 567 890</span>
            </div>

            {/* Hospital */}
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-semibold">Hospital:</span>
              <span className="text-gray-600">City Hospital</span>
            </div>

            {/* Emergency Contact */}
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-semibold">
                Emergency Contact:
              </span>
              <span className="text-gray-600">Jane Doe - +1 987 654 3210</span>
            </div>

            {/* Profile Picture */}
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-semibold">
                Profile Picture:
              </span>
              <span className="text-gray-600">Uploaded</span>
            </div>

            {/* Active Status */}
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-semibold">Status:</span>
              <span className="text-green-500 font-semibold">Active</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Edit Profile
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
