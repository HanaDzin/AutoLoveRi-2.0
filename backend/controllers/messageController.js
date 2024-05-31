import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;                  
        const senderId = req.params.senderId;
        const receiverId = req.params.receiverId;         
        
        //first try to find conversation between these 2 users:
        let conversation = await Conversation.findOne({
            participants: { $all : [senderId, receiverId]}
        })

        //if there are no previous message between these users, create a new conversation:
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [ senderId, receiverId ],

            })
        };

        //create the newly sent message:
        const newMessage =  new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message,
        });

        //add the message to the conversation
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        //save the message and conversation data in database (runs in parallel):
        await Promise.all([conversation.save(), newMessage.save()]);

        return res.status(201).json(newMessage); 


    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({ error: "Internal erver error" });
    }
}
