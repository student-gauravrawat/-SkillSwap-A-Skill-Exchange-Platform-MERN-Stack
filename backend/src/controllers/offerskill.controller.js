import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {Offerskill} from "../models/offerskills.model.js"
import { isValidObjectId } from "mongoose"
import {Learningskill} from "../models/learningskills.model.js"

const addSkill = asyncHandler( async(req, res)=>{
     const {skillname, level} = req.body

  if([skillname, level].some((field)=> field.trim()==="")){
         throw new ApiError(400, "All fields are required")
  }

 const normalSkillName = skillname.toLowerCase().trim()

const existingSkill = await Offerskill.findOne({
    skillname: normalSkillName,
    owner: req.user?._id
 })

 if(existingSkill){
      throw new ApiError(409, `Skill ${skillname} is already available`)
 }

 const existingLearningSkill = await Learningskill.findOne({
    skillname: normalSkillName,
    level: level,
    owner: req.user?._id
  })

  if(existingLearningSkill){
       throw new ApiError(409, `You Cannot add ${skillname} Skill. This ${skillname} Skill with ${level} level is already part of your learning skills.`)
  }
  const userSkill = await Offerskill.create({
    skillname: skillname,
    level: level,
    owner: req.user?._id
  })

  if(!userSkill){
      throw new ApiError(500, "Skill created failed")
  }

  return res.status(200)
            .json(new ApiResponse(200, userSkill, "Skill created sucessfully"))

})

const deleteSkill = asyncHandler( async(req, res)=>{
     const { skillId } = req.params

     if(!isValidObjectId(skillId)){
         throw new ApiError(400, "Invalid Id")
     }
    
    const deleteSkill = await Offerskill.findByIdAndDelete(skillId)
    
    if(!deleteSkill){
     throw new ApiError(500, "skill deletation falied")
    }
    
    return res.status(200)
              .json(new ApiResponse(200, {}, "skill delete sucessfully"))

})

export {
    addSkill,
    deleteSkill
}
