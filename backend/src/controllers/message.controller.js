import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js" 
import {ApiResponse} from "../utils/ApiResponse.js"

const sendMessage = asyncHandler( async(req, res)=>{
     const senderId =  req.user?._id
     const receiverId = req.params.id
     const {message} = req.body
     console.log(`senderId:${senderId} receiverId: ${receiverId} message: ${message}`)

     if(!senderId || !receiverId || !message){
         throw new ApiError(400, "senderId, receiverId, message all are required")
     }

    let gotConversation = await Conversation.findOne({
        participants: {
            $all: [senderId, receiverId]
        }
     })

     if(!gotConversation){
        gotConversation = await Conversation.create({
            participants: [senderId, receiverId]
        })
     }

     const newMessage = await Message.create({
        senderId,
        receiverId,
        message
     })

     if(!newMessage){
        throw new ApiError(500, "failed to create message")
     }

     gotConversation.messages.push(newMessage._id)

     gotConversation.save()

    //  Socket IO

    return res.status(200)
              .json(new ApiResponse(200, newMessage, "message created sucessfully"))   

})


const getMessage = asyncHandler(async(req, res)=>{
        const receiverId = req.params.id
        const senderId = req.user._id

        if(!senderId || !receiverId){
            throw new ApiError(400, "sender and receiver ID are required")
        }
       const conversation = await Conversation.findOne(
            {
                participants: {$all: [senderId, receiverId]}
            }
        ).populate("messages")

        if(!conversation){
           throw new ApiError(400, "No conversation")
        }

        return res.status(200)
                  .json(new ApiResponse(200, conversation, "conversaton get sucessfully"))

})

export{
    sendMessage,
    getMessage
}