import mongoose from "mongoose";

//has ids of sender and receiver + the actual text 

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,           
        ref: "User",
        required: true              
    },

    receiverId: {
        type: mongoose.Schema.Types.ObjectId,          
        ref: "User", 
        required: true               
    },

    message: {
        type: String,
        required: true,
    },

}, {timestamps: true});     //to use createdAt --> time when message was sent

const Message = mongoose.model("Message", messageSchema);

export default Message;