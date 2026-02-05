import React, { useState } from "react";
import { FaArrowRight, FaIdCard, FaUser, FaEnvelope, FaLock } from "react-icons/fa6";
import {Footer, Base_URL} from "../index"
import { Link, useNavigate } from "react-router-dom";
import {register} from "../../services/auth.service"

function Signup() {

  const [user, setUser] = useState({
    username: "",
    fullName: "",
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)

 const navigate = useNavigate()

  const onSubmitHander = async(e)=>{
     e.preventDefault()
     setLoading(true)

     try {
        await register(user)
        navigate("/emailverify", {
          state: {email: user.email}
        })

     } catch (error) {
        console.log(error)

     }finally{
        setLoading(false)  
     }
  }


  return (
    <>
      {/* Background Wrapper with Gradient */}
      <div className="min-h-screen w-full">
        
        {/* Top Banner - Sleeker transition */}
        <div className="bg-blue-600 text-white text-center text-[75%] md:text-[85%] lg:text-[95%] rounded-full w-[90%] max-w-4xl mx-auto mt-4 py-2 flex items-center justify-center gap-2 shadow-lg hover:bg-blue-700 transition-colors cursor-default">
          <p className="font-medium tracking-wide">
            Start your journey — unlock your potential
          </p>
          <FaArrowRight className="text-lg animate-pulse" />
        </div>

        <section className="flex justify-center items-center px-4">
          <div className="bg-white/80 backdrop-blur-md mt-10 md:mt-14 mx-auto w-full max-w-125 rounded-4xl p-8 md:p-10 shadow-2xl border border-white transition-all duration-300 hover:shadow-blue-200">
            
            <header className="text-center mb-8">
              <h1 className="text-4xl font-extrabold mb-3 text-gray-900 tracking-tight">
                Sign Up
              </h1>
              <p className="text-gray-500 font-medium">
                Create an account to unlock exclusive features.
              </p>
            </header>

            <form onSubmit={onSubmitHander} className="space-y-5">
              {/* Full Name */}
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700 ml-1 mb-1.5">Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <FaIdCard />
                  </span>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={user.fullName}
                    required
                    onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                    className="w-full border-2 border-gray-100 rounded-xl pl-10 pr-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none bg-white transition-all"
                  />
                </div>
              </div>

              {/* Username */}
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700 ml-1 mb-1.5">Username</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <FaUser size={14}/>
                  </span>
                  <input
                    type="text"
                    placeholder="johndoe123"
                    value={user.username}
                    required
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    className="w-full border-2 border-gray-100 rounded-xl pl-10 pr-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none bg-white transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700 ml-1 mb-1.5">Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="w-full border-2 border-gray-100 rounded-xl pl-10 pr-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none bg-white transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700 ml-1 mb-1.5">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    placeholder="••••••••"
                    required
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    className="w-full border-2 border-gray-100 rounded-xl pl-10 pr-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none bg-white transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl text-lg font-bold shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Account...
                  </span>
                ) : "Create Account"}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-semibold tracking-widest">OR</span></div>
            </div>

            <div className="text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className='text-blue-600 font-bold hover:underline decoration-2 underline-offset-4'>
                Login
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
