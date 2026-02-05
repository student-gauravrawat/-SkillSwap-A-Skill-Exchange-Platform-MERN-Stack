import api from "../utils/axiosInterceptor"
import toast from "react-hot-toast"


export const register = async(userData)=>{
   try {
      const response =  await api.post(`/users/register`, 
         userData, 
         {
           headers: {
            'Content-Type' : 'application/json'
           },
          }
        )
       toast.success(response?.data?.message)
       return response.data; 

   } catch (error) {
       const msg = error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    "Something went wrong";
          toast.error(msg)  
          console.log("Error:", error)
   }
}

export const emailVerify = async(data)=>{
   try {
     const response = await api.post(`/users/email-verify`,
        data,
        {
            headers: {
                "Content-Type": "application/json"
            },
        }
     )

     toast.success(response?.data?.message)
     return response.data;

   } catch (error) {
       const msg = error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    "Something went wrong";
          toast.error(msg)  
          console.log(error?.response?.data)
   }
}

export const resendOtp = async(data)=>{
   try {
      const response =  await api.post(`/users/resend-otp`, 
           data, 
           {
              headers: {
               'Content-Type' : 'application/json'
              },
             }
        )
       toast.success(response?.data?.message)
       return response.data; 
       
   } catch (error) {
       const msg = error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    "Something went wrong";
          toast.error(msg)  
          console.log(error?.response?.data)
   }
}

export const login = async(userData)=>{
   try {
      const response = await api.post(`/users/login`,
         userData,
         {
            headers: {
               "Content-Type": "application/json"
            },
         }
      )
       if(!response) return;
       console.log(response.data.data)
       toast.success(response?.data?.message)
       return response.data.data;

   } catch (error) {
       const msg = error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    "Something went wrong";
          toast.error(msg)  
          console.log(error?.response?.data)
   }
}

export const logout = async()=>{
   try {
      const response = await api.get(`/users/logout`)
     toast.success(response?.data?.message)

   } catch (error) {
       const msg = error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    "Something went wrong";
          toast.error(msg)  
          console.log(error?.response?.data)
   }
}

export const getUser = async(userId)=>{
   try {
      const response = await api.get(`/users/get-user/${userId}`);
       return response.data.data[0];
       
   } catch (error) {
       const msg = error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    "Something went wrong";
          toast.error(msg)  
          console.log(error?.response?.data)
   }
}

export const deleteAccount = async()=>{
   try {
       const response = await api.delete(`/users/account-delete`)
       toast.success(response?.data?.message);
       
   } catch (error) {
       const msg = error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    "Something went wrong";
          toast.error(msg)  
          console.log(error?.response?.data)
   }
}

export const changePassword = async(data)=>{
   try {
      const response = await api.post(`/users/password-change`,
         data,
         {
            headers:{
                "Content-Type": "application/json"
            }
         }
      )
       toast.success(response?.data?.message)

   } catch (error) {
       const msg = error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    "Something went wrong";
          toast.error(msg)  
          console.log(error?.response?.data)
   }
}

export const updateProfile = async(data)=>{
   try {
     const response = await api.patch(`/users/update-user`,
         data,
         {
           headers:{
             "Content-Type": "application/json"
          }
         }
      )
       toast.success(response?.data?.message);

   } catch (error) {
        const msg = error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    "Something went wrong";
          toast.error(msg)  
          console.log(error?.response?.data)
   }
}

export const updateProfilePhoto = async(url, data)=>{
   try {
     const response = await api.patch(`/users${url}`,
        data,
        {
         headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )
      toast.success(response?.data?.message);

   } catch (error) {
        const msg = error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    "Something went wrong";
          toast.error(msg)  
          console.log(error?.response?.data)
   }
}

export const getAllUser = async(searchQuery)=>{
  try {
    const response = await api.get(`/users/search-skill?query=${searchQuery}`)
   //  console.log(response.data.data)
    return response.data.data;

  } catch (error) {
      const msg = error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    "Something went wrong";
          toast.error(msg)  
          console.log(error?.response?.data)
  }
}