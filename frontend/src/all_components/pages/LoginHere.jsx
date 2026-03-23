import React, { useState } from 'react'
import { FaArrowRight, FaUser, FaLock } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../../redux/userSlice';
import {login} from "../../services/auth.service"
import {Footer} from "../index"


function LoginHere() {
 
    const [user, setUser] = useState({
        field: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

  const handleSubmit = async(e)=>{
     e.preventDefault()
     setLoading(true)
     const data = {
        password: user.password
     }

     if(user.field.endsWith('@gmail.com')){
        data.email= user.field      
     }else{
        data.username= user.field
     }

     try {
        const response = await login(data)

        dispatch(setAuthUser(response.user[0]))
   //   const redirectPath = location.state?.from?.pathname || "/"
   //   navigate(redirectPath, {replace: true})
       navigate("/")

     } catch (error) {
         console.log(error)

     }finally{
         setLoading(false)
     }
  }  

  return (
    <>
      {/* Background Wrapper matching Signup */}
            <div className='min-h-screen w-full  '>
                
                {/* Top Banner */}
                <div className='bg-blue-600 text-white text-center text-[75%] md:text-[85%] lg:text-[95%] rounded-full w-[90%] max-w-4xl mx-auto mt-4 py-2 px-2 flex items-center justify-center gap-2 shadow-lg hover:bg-blue-700 transition-colors cursor-default'>
                    <p className="font-medium tracking-wide"> Start your journey — log in and unlock your potential.</p>
                    <FaArrowRight className='text-lg animate-pulse' />
                </div>

                <section className="flex justify-center items-center px-4">
                    <div className='bg-white/80 backdrop-blur-md mt-10 md:mt-14 mx-auto w-full max-w-125 rounded-4xl p-8 md:p-10 shadow-2xl border border-white transition-all duration-300 hover:shadow-blue-200'>
                        
                        <header className="text-center mb-8">
                            <h1 className='text-4xl font-extrabold mb-3 text-gray-900 tracking-tight'>Login</h1>
                            <p className='text-gray-500 font-medium'>Please log in to access your account.</p>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email/Username Field */}
                            <div className='text-left'>
                                <label className="block text-sm font-semibold text-gray-700 ml-1 mb-1.5">
                                    Email or Username
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                                        <FaUser size={14} />
                                    </span>
                                    <input
                                        type="text"
                                        placeholder='Enter your username or email'
                                        required
                                        value={user.field}
                                        onChange={(e) => setUser({ ...user, field: e.target.value })}
                                        className='w-full border-2 border-gray-100 rounded-xl pl-10 pr-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none bg-white transition-all'
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className='text-left'>
                                <label className="block text-sm font-semibold text-gray-700 ml-1 mb-1.5">
                                    Password
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                                        <FaLock />
                                    </span>
                                    <input
                                        type="password"
                                        placeholder='Enter your password'
                                        required
                                        value={user.password}
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                        className='w-full border-2 border-gray-100 rounded-xl pl-10 pr-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none bg-white transition-all'
                                    />
                                </div>
                            </div>

                            <button type='submit'
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl text-lg font-bold shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 mt-4 cursor-pointer"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Login...
                                    </span>
                                ) : "Login"}
                            </button>
                        </form>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-semibold tracking-widest">OR</span></div>
                        </div>

                        <div className='flex justify-between items-center text-sm px-1'>
                            <Link to="/emailverify"
                                className='text-gray-500 hover:text-blue-600 font-semibold transition-colors'
                            >
                                Verify Email
                            </Link>
                            <Link to="/signup"
                                className='text-blue-600 font-bold hover:underline decoration-2 underline-offset-4'>
                                Create Account
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
     <Footer/>
    </>
  )
}

export default LoginHere
