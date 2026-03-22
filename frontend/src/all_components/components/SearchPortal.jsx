import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function SearchPortal({ open, result, close, loading }) {
  const navigate = useNavigate();

  const handleData = (userId) => {
    close();
    navigate(`/userprofile/${userId}`);
  };

  return (
    <div
      className={`absolute top-20 left-1/2 -translate-x-1/2
      w-[95%] max-w-lg bg-white shadow-2xl z-50 rounded-2xl overflow-hidden
      transition-all duration-300 border border-gray-100
      ${open ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}
    >
      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-gray-500">Searching skills...</p>
        </div>
      )}

      {/* No Results State */}
      {!loading && result.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <div className="bg-gray-50 p-4 rounded-full mb-3">
             <span className="text-2xl">🔍</span>
          </div>
          <p className="text-gray-700 font-semibold">No users found</p>
          <p className="text-sm text-gray-400">Try adjusting your search keywords.</p>
        </div>
      )}

      {/* Results List */}
      <div className="max-h-[65vh] overflow-y-auto custom-scrollbar">
        {!loading && result.map((user) => (
          <div
            key={user._id}
            className="flex items-center gap-4 p-5 border-b border-gray-50 hover:bg-blue-50/40 cursor-pointer transition-all duration-200"
            onClick={() => handleData(user.userId)}
          >
            {/* Left Side: Avatar */}
            <div className="shrink-0">
              <img
                src={user.avatar?.replace("http://", "https://") || "/userimage.webp"}
                alt={user.fullName}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-gray-100"
              />
            </div>

            {/* Right Side: Details */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-800 text-lg truncate capitalize">
                  {user.fullName}
                </h3>
                <span
                  className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border ${
                    user.isMatched 
                    ? "bg-green-50 border-green-200 text-green-600" 
                    : "bg-red-50 border-red-200 text-red-600"
                  }`}
                >
                  {user.isMatched ? "Matched" : "Unmatched"}
                </span>
              </div>
              
              <p className="text-blue-600 text-xs md:text-sm font-semibold mt-0.5 capitalize italic">
                {user.profession || "Skill Sharer"}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-2">
                {user.offerSkills?.map((skill, index) => (
                  <span
                    key={index}
                    className="text-[10px] md:text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1 text-gray-400 mt-2">
                <CiLocationOn className="text-sm" />
                <p className="text-xs truncate font-medium uppercase tracking-tight">
                  {user.location || "Remote"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Close Button */}
      <button
        className="w-full py-3.5 bg-red-500 text-white font-bold text-sm hover:bg-red-400 transition-colors sticky bottom-0 uppercase tracking-widest"
        onClick={close}
      >
        Close Portal
      </button>
    </div>
  );
}

export default SearchPortal;