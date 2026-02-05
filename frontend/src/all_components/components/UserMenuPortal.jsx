import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import {clearAuthUser} from "../../redux/userSlice"
import {logout} from "../../services/auth.service"
import { FaUserCircle, FaPowerOff } from "react-icons/fa";

function UserMenuPortal({ open }) {
    
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async()=>{
        try {
          await logout()
          dispatch(clearAuthUser())
          navigate("/login")

        } catch (error) {
          console.log(error)
        }
  }


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
        {/* Profile Link */}
        <Link 
          to="/profile" 
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
        >
          <FaUserCircle className="text-lg opacity-80 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-sm tracking-wide">Profile</span>
        </Link>

        {/* Separator line for better visual hierarchy */}
        <div className="h-px bg-gray-100 mx-2 my-1"></div>

        {/* Log Out Link */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200 group"
        >
          <FaPowerOff className="text-lg opacity-80 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-sm tracking-wide">Log Out</span>
        </button>
      </div>
    </div>
   ) : null,
    document.getElementById("portal")
  );
}

export default UserMenuPortal;
