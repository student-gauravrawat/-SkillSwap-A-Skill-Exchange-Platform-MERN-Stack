import React, {useEffect, useState} from "react";
import { GrUserSettings } from "react-icons/gr";
import { LuMessageSquare } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import {NavLink, Link} from "react-router-dom"
import {UserMenuPortal, MenuPortal} from "../index"
import { useSelector } from "react-redux";
import SearchPortal from "./SearchPortal";
import { getAllUser } from "../../services/auth.service";

function Navbar() {

  const [openMenu, setOpenMenu] = useState(false);
  const [menu, setMenu] = useState(false)
  const {authUser} = useSelector(state=> state.user)
  const [searchQuery, setSearchQuery] = useState("");
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [result, setResult] = useState([]);
  const [isLoading, setLoading] = useState(false)
 
  useEffect(() => {
  
      if (!searchQuery.trim()) return;
  
      const timeout = setTimeout(() => {
         fetchSkillData();
      }, 500);
  
      return () => clearTimeout(timeout);
  
   }, [searchQuery]);

   async function fetchSkillData(){
    setLoading(true)
      try {
        const response = await getAllUser(searchQuery)
        console.log("response", response)
        setResult(response)

      } catch (error) {
         setResult([])
         console.log(error)

      } finally {
         setLoading(false);
      }
   }

  return (
    <div className=" w-full fixed top-0 shadow ">
      <nav className="w-full h-16 lg:h-19 sm:h-15 mx-auto flex items-center justify-between  bg-[#ebecf3] sm:text-[15px] sm:gap-2 px-4 md:px-8">
      {/* logo section */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src="/skilllogo.png"
              alt="logo"
              className="w-28 md:w-36 lg:w-40 hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

      {/* Navigation Links */}
        <div className="flex  lg:gap-41 md:gap-10 sm:gap-9">
          <div className="hidden sm:flex items-center lg:gap-12 md:gap-8 sm:gap-4">
          <ul className="flex items-center lg:gap-10 md:gap-6 sm:gap-4 font-semibold text-gray-600">
            {["Home", "About", "Contact"].map((item) => (
              <li key={item}>
                <NavLink
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `relative py-2 transition-all duration-300 md:text-md lg:text-lg hover:text-blue-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full ${
                      isActive ? "text-blue-600 after:w-full" : ""
                    }`
                  }
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

          <div className=" flex justify-center items-center gap-4 mr-2 lg:gap-18 sm:gap-10 md:gap-12">
          {/* Search Area */}
            <div className="relative flex items-center bg-gray-100 rounded-full border border-transparent focus-within:border-blue-400 focus-within:bg-white focus-within:shadow-md transition-all duration-300 lg:w-80 md:w-60">
            <input
              type="text"
              placeholder="Explore Skills Here.."
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);

                if (value.trim()) {
                  setOpenSearchModal(true);
                } else {
                  setOpenSearchModal(false);
                }
              }}
              className="w-full text-[83%] lg:text-[14px] py-2.5 pl-5 pr-10 rounded-full outline-none text-gray-700 bg-transparent"
            />
            <button>
              <CiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600" />
            </button>
          </div>

            <div className="flex lg:gap-5 sm:gap-3 " >
              <div className="hidden sm:block text-right">
                <p className="text-md font-bold text-gray-500 hover:text-black hover:underline">{authUser.username}</p>
              </div>

              <div className="flex items-center gap-5">
              <GrUserSettings 
                className="text-xl md:text-2xl cursor-pointer text-gray-600 hover:text-blue-600 transition-colors" 
                onClick={() => setOpenMenu(!openMenu)}
              />

              <Link to="/chathomepage">
                <LuMessageSquare className="text-xl md:text-2xl cursor-pointer text-gray-600 hover:text-blue-600 transition-colors" />
              </Link>

              <GiHamburgerMenu 
                className="sm:hidden cursor-pointer text-xl text-gray-600" 
                onClick={() => setMenu(!menu)}
              />
            </div>
            </div>
          </div>
        </div>
      </nav>
      <UserMenuPortal open={openMenu} />
      <MenuPortal open={menu}/>
      <SearchPortal 
        open={openSearchModal}
        result={result}
        close={()=> setOpenSearchModal(false)}
        loading={isLoading}
        />
    </div>
  );
}

export default Navbar;
