import mongoose from "mongoose";

//has an array of ids of participants + messages array ( containing only ids of messages)

const conversationSchema = new mongoose.Schema({
    participants: [    
        {
            type: mongoose.Schema.Types.ObjectId,      
            ref: "User"
        }
    ],

    messages: [        
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: [],        //starts as an empty array (no previous messages)
        }
    ]

}, {timestamps: true});     

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;