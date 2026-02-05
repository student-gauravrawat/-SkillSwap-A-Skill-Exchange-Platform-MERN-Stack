import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAuthUser } from "../../redux/userSlice";
import { deleteAccount } from "../../services/auth.service";

function Profile() {
  const { authUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAccountDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      await deleteAccount()
      dispatch(clearAuthUser());
      navigate("/login");
      
    } catch (error) {
       console.log(error)
    }
  };

  return (
    <div className="mt-24 mb-10 mx-auto max-w-6xl px-4">
      {/* Main Profile Card */}
      <div className="bg-white shadow-2xl rounded-4xl overflow-hidden border border-gray-100 flex flex-col md:flex-row min-h-100">
        <div className="w-full md:w-[35%] bg-linear-to-br from-indigo-50 via-white to-white p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
          <div className=" group flex items-center justify-center">
            <img
              src={authUser?.avatar?.url || "/userimage.webp"}
              alt="Profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg border-4 border-white"
            />
          </div>

          <div className="mt-6 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 capitalize">
              {authUser.fullName}
            </h2>
            {authUser.profession && (
              <p className="mt-2 px-4 py-1 bg-indigo-600 text-white rounded-full text-xs font-bold uppercase tracking-widest inline-block shadow-md">
                {authUser.profession}
              </p>)}
          </div>
        </div>

        {/* Right Section: Core Info */}
        <div className="w-full md:w-[65%] p-8 md:p-12 flex flex-col justify-around bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                Username
              </p>
              <p className="text-gray-800 font-semibold text-lg">
                {authUser.username}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                Email Address
              </p>
              <p className="text-gray-800 font-semibold truncate">
                {authUser.email}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                Availability
              </p>
              <p className="text-gray-800 font-semibold capitalize">
                {authUser.availability}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                Location
              </p>
              <div className="flex items-center gap-1.5 text-gray-800 font-semibold">
                <CiLocationOn className="text-indigo-600 text-xl" />
                <span className="capitalize">
                  {authUser.location || "Not Set"}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link to="/edit" className="flex-1">
              <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700  transition-all active:scale-95 cursor-pointer">
                Edit Profile
              </button>
            </Link>
            <button
              onClick={handleAccountDelete}
              className="flex-1 py-3 bg-white text-red-500 font-bold border-2 border-red-50 rounded-2xl hover:bg-red-50 hover:border-red-100 transition-all active:scale-95 cursor-pointer"
            >
              Delete Account
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
            {authUser.about ||
              <span className="text-gray-400" >
                No bio added yet. Tell us something about yourself!
              </span>
            }
          </p>
        </div>

        {/* Skills Section */}
        <div className="bg-white p-8 rounded-4xl shadow-lg border border-gray-50 flex flex-col gap-6">
          {/* Offering */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800 uppercase text-xs tracking-widest">
                Skills Offered
              </h3>
              <Link
                to="/skilledit"
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                + Add
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {authUser.offerskills?.length > 0 ? (
                authUser.offerskills?.map((skill) => (
                  <span
                    key={skill._id}
                    className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold capitalize border border-indigo-100"
                  >
                    {skill.skillname}
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800 uppercase text-xs tracking-widest">
                Skills Learning
              </h3>
              <Link
                to="/skilleditlearn"
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                + Add
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {authUser.learningskills?.length > 0 ? (
                authUser.learningskills?.map((skill) => (
                  <span
                    key={skill._id}
                    className="px-3 py-1.5 bg-indigo-50 text-emerald-700 rounded-lg text-xs font-bold capitalize border border-indigo-100"
                  >
                    {skill.skillname}
                    <span className="ml-1 text-emerald-400 text-[10px]">
                      {skill.level}
                    </span>
                  </span>
                ))
              ) : (
                <p className="text-gray-400 text-xs italic">
                  Add learning skills
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
