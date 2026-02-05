import { Base_URL } from "../all_components/index";
import axios from "axios";
import toast from "react-hot-toast";
import { setAuthUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { getUser } from "../services/auth.service";


export const useGetUser = ()=>{
  
  const dispatch  = useDispatch()
  return async(id)=>{
     try {
      const response = await getUser(id)
      console.log(response)
      dispatch(setAuthUser(response));

     } catch (error) {
      console.log(error)
     }
  }

}

export const useGetSearchUser = ()=>{

  return async(id)=>{
     try {
     const updateUser = await axios.get(`${Base_URL}/users/get-user/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(updateUser.data.data[0])
      
  } catch (error) {
    const msg =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "something went wrong";

      toast.error(msg);
      console.log(error?.response?.data);
  }
  }


}