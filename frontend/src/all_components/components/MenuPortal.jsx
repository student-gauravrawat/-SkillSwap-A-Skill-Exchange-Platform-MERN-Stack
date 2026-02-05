import React from "react";
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaCircleInfo, FaEnvelope } from "react-icons/fa6";

function MenuPortal({ open }) {

  return ReactDOM.createPortal(
   open ? (
    <div
      className="
        fixed 
        z-50 
        w-44 
        rounded-2xl 
        shadow-2xl 
        top-16 
        sm:top-16 sm:right-5
        max-sm:top-14 
        max-sm:right-1/5 
        md:right-1/32  
        max-sm:translate-x-1/2
        overflow-hidden 
        bg-white/90 
        backdrop-blur-md 
        border border-white/50
        animate-in fade-in zoom-in duration-200
      "
    >
      <div className="flex flex-col p-1.5">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              isActive 
              ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
              : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          <FaHome className="text-lg opacity-80 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-sm">Home</span>
        </NavLink>

        <NavLink 
          to="/about" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 mt-1 group ${
              isActive 
              ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
              : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          <FaCircleInfo className="text-lg opacity-80 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-sm">About</span>
        </NavLink>

        <NavLink 
          to="/contact" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 mt-1 group ${
              isActive 
              ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
              : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          <FaEnvelope className="text-lg opacity-80 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-sm">Contact Us</span>
        </NavLink>
      </div>
    </div>
   ) : null,
    document.getElementById("portal")
  );
}

export default MenuPortal;