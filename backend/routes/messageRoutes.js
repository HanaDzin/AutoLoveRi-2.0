import express from "express";

import { getMessages, sendMessage, sendMessageToAdmin, getMessagesWithAdmin } from "../controllers/messageController.js";

const router = express.Router();


router.get("/getMessagesWithAdmin/:loggedInId", getMessagesWithAdmin);
router.post("/sendToAdmin/:senderId", sendMessageToAdmin);

router.post("/send/:senderId/to/:receiverId", sendMessage); 
router.get("/:loggedInId/:userToChatId", getMessages);       
 



export default router;