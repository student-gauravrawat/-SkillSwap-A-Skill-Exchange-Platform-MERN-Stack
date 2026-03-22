import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetUser } from "../../hooks/GetUser";
import { useSelector } from "react-redux";
import { updateProfile } from "../../services/auth.service";

function EditPage() {

  const states = [
   "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
   "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
   "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
   "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
   "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
   "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Delhi", "Jammu & Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
 ].sort();

 const [user, setUser] = useState({
    fullName: "",
    email: "",
    location: "",
    profession: "",
    availability: "",
    about: ""
 })
 const [loading, setLoading] = useState(false)
 const { authUser } = useSelector((state) => state.user);
 const getUser = useGetUser()

  const handleUserUpdate = async(e)=>{
    e.preventDefault()   
    setLoading(true)
    try {
        await updateProfile(user)
        await getUser(authUser._id)
     
    } catch (error) {
       console.log(error)

    }finally{
      setUser(
        {
          fullName: "",
          email: "",
          profession: "",
          about: "",
          availability: "",
          location: ""

        }
      )
      setLoading(false)
    }
  }

  return (
    <div className="mt-20  sm:mt-23.5 ml-5 mr-4 bg-white sm:bg-white rounded-3xl sm:-mb-20 hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]
 ">
      <div className=" md:flex justify-center items-center mx-auto lg:gap-70 md:gap-30 sm:gap-40 lg:p-10 p-5">
       
        <section className=" flex flex-col items-center justify-center md:-mt-15">
          
            <div className=" group flex items-center justify-center">
            <img
              src={authUser?.avatar?.url?.replace("http://", "https://") || "/userimage.webp"}
              alt="Profile"
              className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-lg border-4 border-white"
            />
          </div>
          <button className="mt-4 bg-orange-500 text-white px-5 py-2  text-sm font-medium hover:bg-orange-600 rounded-sm  hover:bg-[#d8320a hover:shadow-xl hover:scale-105 cursor-pointer">
              <Link to="/editimg">Edit Photo</Link>
          </button>
        </section>

        <section>
            <form onSubmit={handleUserUpdate}>
               <div  className=" space-y-5 ">

              <div className=" space-y-6  md:space-x-2  md:flex items-center justify-between ">
                <div className="">
                  <label className=' text-[18px]'>Name</label>
                  <input type="text" 
                         placeholder="Enter Your Name" 
                         value={user.fullName}
                         onChange={(e)=> setUser({...user, fullName: e.target.value})}
                         className='w-full border rounded-lg px-3 py-2 mt-1.5 focus:border-blue-500 focus:outline-none bg-[#f5f5fc]'
                         />
                </div>

                <div className="md:-mt-5">
                  <label className=' text-[18px]'>Profession</label>
                  <input type="text" 
                         placeholder="Enter Your Profession" 
                         value={user.profession}
                         onChange={(e)=> setUser({...user, profession: e.target.value})}
                         className='w-full border rounded-lg px-3 py-2 mt-1.5 focus:border-blue-500 focus:outline-none bg-[#f5f5fc]'
                         />
                </div>
              </div>

              <div className=" space-y-5 md:space-x-2 md:flex items-center justify-between ">
                <div>
                  <label className=' text-[18px]'>Email</label>
                  <input type="text" 
                         placeholder="Enter Your Email" 
                         value={user.email}
                         onChange={(e)=> setUser({...user, email: e.target.value})}
                         className='w-full border rounded-lg px-3 py-2 mt-1.5 focus:border-blue-500 focus:outline-none bg-[#f5f5fc]'
                         />
                </div>

                <div className="flex flex-col md:-mt-4.5">
                  <label className=' text-[18px]'>Availability</label>
                  <select  
                  value={user.availability}
                  onChange={(e)=> setUser({...user, availability: e.target.value})}
                   className="w-full lg:w-70 border rounded-lg px-3 py-2 mt-1.5 focus:border-blue-500 focus:outline-none bg-[#f5f5fc]">
                    <option disabled hidden value="">
                      Select Your Comfort
                    </option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                    <option value="night">Night</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col md:mb-9 md:space-y-1">
                <label className=' text-[18px]'>Location</label>
                <select 
                  value={user.location}
                  onChange={(e)=> setUser({...user, location: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 mt-1.5 focus:border-blue-500 focus:outline-none bg-[#f5f5fc]">
                  <option disabled hidden value="">
                     Select Your City
                  </option>
                  {states.map((state, idx)=>(
                    <option key={idx} value={state.toLowerCase().replace(/\s+/g, "-")}>
                       {state}
                    </option>
                  ))}
                </select>
              </div>

              <div className=" md:mb-5 space-y-2">
                <label className=' text-[18px] '>About</label>
                <textarea type="text" 
                       placeholder="Write About You"
                       value={user.about}
                       onChange={(e)=> setUser({...user, about: e.target.value})}
                       className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-[#f5f5fc] mt-1"
                />
              </div>
             
              <div className="flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-x-4 sm:mb-22 md:mb-2">
                 <button
                    type="submit" 
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 cursor-pointer">
                    {loading ? "Updating Profile" : "Update Profile"}
                    </button>
                 <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 sm:-mt-3 cursor-pointer">
                    <Link to="/changepass">
                        Change Password
                    </Link>
                 </button>
              </div>

               </div>
            </form>

        </section>

      </div>
    </div>
  );
}

export default EditPage;


