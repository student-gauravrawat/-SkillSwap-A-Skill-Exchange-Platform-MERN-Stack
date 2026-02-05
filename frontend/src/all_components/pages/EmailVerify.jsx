import React, { useState } from 'react'
import { FaArrowRight, FaEnvelope, FaShieldHalved } from "react-icons/fa6";
import {emailVerify, resendOtp} from "../../services/auth.service";
import { useLocation, useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";
import {Footer} from "../index";


function EmailVerify() {
 const [otp, setOtp] = useState("")
 const [loading, setLoading] = useState(false)

 const location = useLocation()
 const navigate = useNavigate()
 const registerEmail = location.state?.email || ""
 const [email, setEmail] = useState(registerEmail)

 const handleOtpChange = (e)=>{
   e.preventDefault()
   let value = e.target.value

   value = value.replace(/\D/g, "")

   if(value.length <= 6){
     setOtp(value)
   }
 }
 
 const handleEmailVerify = async(e)=>{
   e.preventDefault()
   setLoading(true)
   try {
     await emailVerify({email, otp})
     navigate("/login")

   } catch (error) {
     console.log(error)
     
   }finally{
     setLoading(true)
   }
  
 }
 
 const handleResendOtp = async(e)=>{
   e.preventDefault()

   try {
     await resendOtp({email})

   } catch (error) {
     console.log(error)

   }
   
 }

  return (
    <>
      <div className='min-h-screen w-full'>
        {/* Top Banner Consistent with other pages */}
        <div className='bg-blue-600 text-white text-center text-[75%] md:text-[85%] lg:text-[95%] rounded-full w-[90%] max-w-4xl mx-auto mt-4 py-2 flex items-center justify-center gap-2 shadow-lg hover:bg-blue-700 transition-colors cursor-default'>
          <p className="font-medium tracking-wide"> Start your journey — log in and unlock your potential.</p>
          <FaArrowRight className='text-lg animate-pulse' />
        </div>

        <section className="flex justify-center items-center px-4">
          <div className='bg-white/80 backdrop-blur-md mt-10 md:mt-14 mx-auto w-full max-w-125 rounded-4xl p-8 md:p-10 shadow-2xl border border-white transition-all duration-300 hover:shadow-blue-200'>
            
            <header className="text-center mb-8">
              <h1 className='text-4xl font-extrabold mb-3 text-gray-900 tracking-tight'>Email Verify</h1>
              <p className='text-gray-500 font-medium'>Welcome back! Please verify your account.</p>
            </header>

            <form onSubmit={handleEmailVerify} className="space-y-5">
              {/* Email Field */}
              <div className='text-left'>
                <label className="block text-sm font-semibold text-gray-700 ml-1 mb-1.5">Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <FaEnvelope size={14} />
                  </span>
                  <input
                    type="text"
                    placeholder='Enter your email'
                    disabled={!!registerEmail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full border-2 border-gray-100 rounded-xl pl-10 pr-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none bg-white/50 disabled:bg-gray-50 disabled:text-gray-400 transition-all'
                  />
                </div>
              </div>

              {/* OTP Field */}
              <div className='text-left'>
                <div className="flex justify-between items-center ml-1 mb-1.5">
                  <label className='text-sm font-semibold text-gray-700'>OTP Code</label>
                  <button 
                    type="button"
                    onClick={handleResendOtp}
                    className='text-xs text-blue-600 font-bold hover:underline'
                  >
                    Resend OTP
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                    <FaShieldHalved size={14} />
                  </span>
                  <input
                    type="text"
                    placeholder='••••••'
                    inputMode='numeric'
                    value={otp}
                    onChange={handleOtpChange}
                    className='w-full border-2 border-gray-100 rounded-xl pl-10 pr-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none bg-white transition-all text-center tracking-[0.5em] font-bold text-lg'
                  />
                </div>
              </div>

              <button 
                type='submit'
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl text-lg font-bold shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 mt-4 cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : "Verify Email"}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-semibold tracking-widest">OR</span></div>
            </div>

            <div className='flex justify-between items-center text-sm px-1'>
              <Link to="/signup" className='text-gray-500 hover:text-blue-600 font-semibold transition-colors'>
                Create Account
              </Link>
              <Link to="/login" className='text-blue-600 font-bold hover:underline decoration-2 underline-offset-4'>
                Back to Login
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default EmailVerify
