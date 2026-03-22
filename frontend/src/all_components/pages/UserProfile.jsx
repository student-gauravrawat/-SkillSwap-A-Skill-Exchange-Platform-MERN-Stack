import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import {getUser} from "../../services/auth.service"

function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const response = await getUser(userId)
        setUser(response);

      } catch (error) {
         console.log(error)

      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 font-medium">Loading profile...</p>
      </div>
    );

  if (!user)
    return (
      <div className="text-center mt-32">
        <p className="text-xl text-gray-500">User not found.</p>
      </div>
    );

  return (
    <div className="mt-24 mb-10 mx-auto max-w-6xl px-4">
      {/* Main Profile Card (Profile.jsx Style) */}
      <div className="bg-white shadow-2xl rounded-4xl overflow-hidden border border-gray-100 flex flex-col md:flex-row min-h-100">
        {/* Left Section: Visual Identity */}
        <div className="w-full md:w-[35%] bg-linear-to-br from-indigo-50 via-white to-white p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
          <div className=" group flex items-center justify-center">
            <img
              src={user?.avatar?.url?.replace("http://", "https://") || "/userimage.webp"}
              alt="Profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg border-4 border-white"
            />
          </div>

          <div className="mt-6 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 capitalize">
              {user.fullName}
            </h2>
            {user.profession && (
              <p className="mt-2 px-4 py-1 bg-indigo-600 text-white rounded-full text-xs font-bold uppercase tracking-widest inline-block shadow-md">
                {user.profession}
              </p>
            )}
          </div>
        </div>

        {/* Right Section: Core Info */}
        <div className="w-full md:w-[65%] p-8 md:p-12 flex flex-col justify-between bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                Username
              </p>
              <p className="text-gray-800 font-semibold text-lg">
                {user.username}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                Email Address
              </p>
              <p className="text-gray-800 font-semibold truncate">
                {user.email}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                Availability
              </p>
              <p className="text-gray-800 font-semibold capitalize">
                {user.availability || "Not Specified"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                Location
              </p>
              <div className="flex items-center gap-1.5 text-gray-800 font-semibold">
                <CiLocationOn className="text-indigo-600 text-xl" />
                <span className="capitalize">{user.location || "Not Set"}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons (Message & Match Status) */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 py-4 bg-[#49AA19] text-white font-bold rounded-2xl shadow-lg shadow-green-100 hover:bg-[#3e9415]  transition-all active:scale-95">
              <Link to="/chathomepage">Message User</Link>
            </button>
            <button
              className={`flex-1 py-4 font-bold border-2 rounded-2xl transition-all active:scale-95 
                        ${
                          user.isMatched
                            ? "bg-indigo-50 border-indigo-100 text-indigo-600"
                            : "bg-black border-black text-white hover:bg-gray-800"
                        }`}
            >
              {user.isMatched ? "✓ Matched" : "UnMatched"}
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Sections (About & Skills) */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* About Section */}
        <div className="lg:col-span-2 bg-white p-8 rounded-4xl shadow-lg border border-gray-50">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
            <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
            About Me
          </h3>
          <p className="text-gray-700 leading-relaxed text-lg italic">
            {user.about ||
               <span className="text-gray-400">
                  This user hasn't added a bio yet.
               </span>
            }
          </p>
        </div>

        {/* Skills Section */}
        <div className="bg-white p-8 rounded-4xl shadow-lg border border-gray-50 flex flex-col gap-6">
          {/* Offering */}
          <div>
            <h3 className="font-bold text-gray-800 uppercase text-xs tracking-widest mb-4">
              Skills Offered
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.offerskills?.length > 0 ? (
                user.offerskills.map((skill) => (
                  <span
                    key={skill._id}
                    className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold capitalize border border-indigo-100"
                  >
                    {skill.skillname}{" "}
                    <span className="ml-1 text-indigo-400 text-[10px]">
                      {skill.level}
                    </span>
                  </span>
                ))
              ) : (
                <p className="text-gray-400 text-xs italic">No skills listed</p>
              )}
            </div>
          </div>

          {/* Learning */}
          <div className="pt-4 border-t border-gray-50">
            <h3 className="font-bold text-gray-800 uppercase text-xs tracking-widest mb-4">
              Interested in Learning
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.learningskills?.length > 0 ? (
                user.learningskills.map((skill) => (
                  <span
                    key={skill._id}
                    className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold capitalize border border-emerald-100"
                  >
                    {skill.skillname}{" "}
                    <span className="ml-1 text-emerald-400 text-[10px]">
                      {skill.level}
                    </span>
                  </span>
                ))
              ) : (
                <p className="text-gray-400 text-xs italic">
                  No learning interests listed
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
