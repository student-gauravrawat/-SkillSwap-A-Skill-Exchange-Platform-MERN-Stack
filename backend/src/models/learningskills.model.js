import mongoose, {Schema} from "mongoose";

const learningskillschema = new Schema({
    skillname:{
      type: String,
      required: true,
      index: true,
      lowercase: true
    },
    level:{
       type: String,
       required: true,
       enum: ["Beginner", "Intermidiate", "Advance"]
    },
    owner: {
       type: Schema.Types.ObjectId,
       ref: "User"
    }
},{timestamps: true})


export const Learningskill = mongoose.model("Learningskill", learningskillschema)