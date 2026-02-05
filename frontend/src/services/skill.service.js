import api from "../utils/axiosInterceptor"
import toast from "react-hot-toast";


export const addOfferSkill = async(data)=>{
  try {
   const response = await api.post(`/offerskills/create-skill`,
         data,
         {
            headers: {
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

export const deleteOfferSkill = async(id)=>{
  try {
    const response = await api.delete(`/offerskills/delete-skill/${id}`)
    toast.success(response?.data?.message);
    return response.data;

  } catch (error) {
      const msg = error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    "Something went wrong";
          toast.error(msg)  
          console.log(error?.response?.data)
  } 
}

export const addLearningSkill = async(data)=>{
  try {
      const response = await api.post(`/learningskills/create-skill`,
         data,
         {
            headers: {
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

export const deleteLearningSkill = async(id)=>{
  try {
      const response = await api.delete(`/learningskills/delete-skill/${id}`)
      toast.success(response?.data?.message);

  } catch (error) {
      const msg =   error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    "Something went wrong";
          toast.error(msg)  
          console.log(error?.response?.data)
  } 
}
