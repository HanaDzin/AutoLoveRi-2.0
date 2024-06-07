import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

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


        //SOCKET.IO functionality
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            //send an event only to this particular user:
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json(newMessage); 


    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({ error: "Internal erver error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const userToChatId = req.params.userToChatId;        //user we want to chat with (see messages with them)
        const loggedInId = req.params.loggedInId;                  //currently logged in user

        //find convo between them:
        const conversation = await Conversation.findOne({
            participants: { $all: [loggedInId, userToChatId] },
        }).populate("messages");                        //to get message content, not only their id stored in messages array

        if (!conversation) return res.status(200).json([]);     //if there are no messages, return empty array


        res.status(200).json(conversation.messages);
        
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error"} );
    }
}

export const sendMessageToAdmin = async (req, res) => {
    try {
        const { message } = req.body;
        const senderId = req.params.senderId;

        //fetching the admin user from the database
        const adminUser = await User.findOne({ isAdmin: true });
        if (!adminUser) {
            return res.status(404).json({ error: "Admin user not found" });
        }

        //set the admin to be the receiver of the message
        const receiverId = adminUser._id;

        // find the conversation between the sender and the admin
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        // if there are no previous messages, create a new conversation
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        };

        // create the newly sent message
        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message,
        });

        // add the message to the conversation
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // save the message and conversation data in the database (runs in parallel)
        await Promise.all([conversation.save(), newMessage.save()]);

                //SOCKET.IO functionality
                const receiverSocketId = getReceiverSocketId(receiverId);
                if (receiverSocketId) {
                    //send an event only to this particular user:
                    io.to(receiverSocketId).emit("newMessage", newMessage);
                }

        return res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessageToAdmin controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessagesWithAdmin = async (req, res) => {
    try {
        const loggedInId = req.params.loggedInId;  // currently logged-in user

        if (!loggedInId) {
            return res.status(400).json({ error: "Logged in user ID is required" });
        }

        // Fetch the admin user from the database
        const adminUser = await User.findOne({ isAdmin: true });
        if (!adminUser) {
            return res.status(404).json({ error: "Admin user not found" });
        }
        const adminId = adminUser._id;

        // Find the conversation between the logged-in user and the admin
        const conversation = await Conversation.findOne({
            participants: { $all: [loggedInId, adminId] },
        }).populate("messages");  // to get message content, not only their ID stored in the messages array

        // If there are no messages, return an empty array
        if (!conversation) return res.status(200).json([]);

        // Return the messages in the conversation
        res.status(200).json(conversation.messages);

    } catch (error) {
        console.error("Error in getMessagesWithAdmin controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}