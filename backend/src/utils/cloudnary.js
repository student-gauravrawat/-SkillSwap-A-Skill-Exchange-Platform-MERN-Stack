import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
 cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
 api_key: process.env.CLOUDINARY_API_KEY,
 api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async(localfilePath)=>{
  try {
    if(!localfilePath) return null;
    const response = await cloudinary.uploader.upload(localfilePath, {
           resource_type:"auto"
        })
       fs.unlinkSync(localfilePath)
       return response
  } catch (error) {
       fs.unlinkSync(localfilePath)
  }
}


const deleteOnCloudinary = async(public_id, resource_type="image")=>{
    try {
        if(!public_id) return null;
        const result = await cloudinary.uploader.destroy(public_id, {
            resource_type: `${resource_type}`
        })
    } catch (error) {
        console.log("Error:", error?.message)
    }
}


export {uploadOnCloudinary, deleteOnCloudinary}