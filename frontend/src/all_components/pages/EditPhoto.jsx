import React, { useRef, useState } from 'react'
import { MdOutlineUploadFile } from "react-icons/md";
import { useGetUser } from '../../hooks/GetUser';
import { useSelector } from 'react-redux';
import { updateProfilePhoto } from '../../services/auth.service';


function EditPhoto() {
    
  const fileRef = useRef()
  const getUser = useGetUser()
  const {authUser} = useSelector(state=> state.user)
  const [loading, setLoading] = useState(false)


  const handlePhoto = async(e)=>{
    e.preventDefault()
    setLoading(true)

    if(!fileRef.current.files[0]){
        toast.error("Please select an image");
        return;
     }

     const file = fileRef.current.files[0]
 
     const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"]
     if(!allowedTypes.includes(file.type)){
         toast.error("Only image files are allowed (jpeg, jpg, png, webp)")
         fileRef.current.value = ""
         return;
     }
     
     const formData =  new FormData()
     formData.append("avatar", fileRef.current.files[0])

     try {
        const url = authUser.avatar ? "/update-avatar" : "/upload-avatar"

        await updateProfilePhoto(url, formData)
        await getUser(authUser._id)

     } catch (error) {
        console.log(error)

     } finally{
        setLoading(false)
     }
  }

  return (
       <div className='w-full mt-25 sm:mt-30'>

        <section className=' '>
            <div className=' flex justify-center items-center   mx-auto'>

                 <div className=' text-center bg-white  mx-auto w-85 md:w-157.5 lg:w-162.5 rounded-3xl p-6 shadow-xl border border-gray- hover:shadow-blue-300 '>
                      <h1 className='text-[40px]  mb-1 font-semibold '>Upload Your Picture</h1>
                      <p className=' '>Upload your Profile Photo and make your profile truly yours.</p>

                      <form onSubmit={handlePhoto}>
                          <div className= 'mt-4.5 text-left'>
                             <label >
                                 <span className=' text-[18px] '>Avatar</span>
                             </label>
                             <div className=' flex justify-center items-center  border rounded-lg focus:border-blue-500 focus:outline-none bg-[#f5f5fc]'>
                              <MdOutlineUploadFile className='mt-0.75 w-5 h-7 ml-2' />
                                <input 
                                type="file" 
                                ref={fileRef}
                                accept='image/*'
                                placeholder='Enter your profile picture'
                                className='w-[95%] px-2 py-2 mt-1.5 '
                             />
                             </div>
                          </div>
                          
                        <button type='submit' 
                            className="w-[95%] bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg text-center mt-5 mr-6 cursor-pointer active:cursor-wait  ">
                             {loading ? "Uploading..." : " Upload"}
                          </button>
                      </form>
                       
                 </div>
            </div>   
        </section>
    </div>
  )
}

export default EditPhoto
