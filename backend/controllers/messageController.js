import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;                   //get the actual text of message from sent request
        const { id: receiverId } = req.params;          //get the id of receiver from url
        const senderId = req.user._id;                  

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

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;        // we want to get messages exchanged with this user
        const senderId = req.user._id;                  //current user id is sent via protect (jwt)

        //find convo between them:
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");                        //to get message content, not only their id stored in messages array

        if (!conversation) return res.status(200).json([]);     //if there are no messages, return empty array


        res.status(200).json(conversation.messages);

    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error"} );
    }
}

export const getUsersForSidebar = async (req, res) => {
    try {

        const loggedInUserId = req.user._id;            //from the protectRoute

        //get users from db (besides the one currently logged in):
        const allUsers = await User.find({ _id: { $ne: loggedInUserId }}).select("-password");

        res.status(200).json(allUsers);


    } catch (error) {
        console.log("Error in getUsersForSidebar controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}