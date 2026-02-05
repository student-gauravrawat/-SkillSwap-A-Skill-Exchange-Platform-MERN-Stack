import React, { useState } from 'react'
import {changePassword} from "../../services/auth.service"

function ChangePassword() {

  const[passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [loading, setLoading] = useState(false)

  const handlePassword = async(e)=>{
     e.preventDefault()
     setLoading(true)

     try {
        await changePassword(passwords)
       
     } catch (error) {
         console.log(error) 
     }finally{
        setPasswords({
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        })
       setLoading(false)
       
     }

  }

  return (
     <div className='w-full mt-21'>

        <section className='sm:mt-25 '>
            <div className=' flex justify-center items-center mx-auto'>

                 <div className=' text-center bg-white  w-85 md:w-157.5 lg:w-162.5 rounded-3xl p-6 shadow-xl border border-gray- hover:shadow-blue-300 '>
                      <h1 className='text-[40px]  mb-1 font-semibold '>Change Password</h1>
                      <p className=' '>Keep your account secure with a fresh password.</p>

                      <form onSubmit={handlePassword}>
                          <div className= 'mt-4.5 text-left'>
                             <label >
                                 <span className=' text-[18px] '>Old Password</span>
                             </label>
                             <input 
                                type="password" 
                                placeholder='Enter your old password'
                                required
                                value={passwords.oldPassword}
                                onChange={(e)=> setPasswords({...passwords, oldPassword: e.target.value})}
                                className='w-[95%] border rounded-lg px-3 py-2 mt-1.5 focus:border-blue-500 focus:outline-none bg-[#f5f5fc]'
                             />
                          </div>
                          
                          <div className= 'mt-4.5 text-left'>
                             <label>
                                 <span className=' text-[18px]'>New Password</span>
                             </label>
                             <input 
                                type="password" 
                                placeholder='Enter new password'
                                required
                                value={passwords.newPassword}
                                onChange={(e)=> setPasswords({...passwords, newPassword: e.target.value})}
                                className='w-[95%] border rounded-lg px-3 py-2 mt-1.5 focus:border-blue-500 focus:outline-none bg-[#f5f5fc]'
                             />
                          </div>
                          <div className= 'mt-4.5 text-left'>
                             <label>
                                 <span className=' text-[18px]'>Confirm Password</span>
                             </label>
                             <input 
                                type="password" 
                                placeholder='Enter confirm password'
                                required
                                value={passwords.confirmPassword}
                                onChange={(e)=> setPasswords({...passwords,  confirmPassword: e.target.value})}
                                className='w-[95%] border rounded-lg px-3 py-2 mt-1.5 focus:border-blue-500 focus:outline-none bg-[#f5f5fc]'
                             />
                          </div>
                          <button type='submit' 
                          className="w-[95%] bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg text-center mt-5 mr-6 cursor-pointer active:cursor-wait">
                             {loading ? "Password Changing" : " Change Password"}
                          </button>
                      </form>
                       
                 </div>
            </div>   
        </section>
    </div>
  )
}

export default ChangePassword
