import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
 },
  email:{
     type: String,
     required: true,
     unique: true,
     lowercase: true,
     trim: true
  },
  fullName:{
      type: String,
      required: true,
      trim: true,
      index: true
    },
  password:{
       type: String,
       required: [true, "Password is required"]
  },
  avatar: {
     type:{
         public_id: String,
         url: String
     },
  },
  profession: {
     type: String,
     trim: true,
  },
  location:{
     type: String,
     trim: true
  },
  availability:{
     type: String,
     enum: ["Morning", "Afternoon", "Evening", "Night", "Weekend"],
     default: "Weekend"
  },
  about: {
     type: String,
     trim: true
  },

//   offerskills: [
//     {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Offerskill"
//     }
//   ],

//   learningskills: [
//      {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Learningskill"
//      }
//   ],
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailOtp: {
     type: String
  },
  emailOtpExpiry: {
     type: Date
  },
  refreshToken: {
    type: String
  }

},{timestamps: true})


//? Here I am using bcrypt to make password secure
userSchema.pre("save", async function(){ 
  if(!this.isModified("password")) return;
  try {
    this.password = await bcrypt.hash(this.password, 12)     
  } catch (error) {
    throw error
  }
})

//? Custom Hook For Password Checking
userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password, this.password)
}

//?  Generate Access Token Method
userSchema.methods.generateAccessToken = function(){
   return jwt.sign(
      {
         _id: this._id,
         email: this.email,
         username: this.username,
         fullName: this.fullName
      },
         process.env.ACCESS_TOKEN_SECRET,
      {
         expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      } 
  )
}

//? Generate Refresh Token Method
userSchema.methods.generateRefreshToken = function(){
   return jwt.sign(
      {
          _id: this._id
      },
          process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
   )
}

export const User = mongoose.model("User", userSchema) 