import express from "express";

import { sendMessage, getMessages, getUsersForSidebar } from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/send/:id", protect, sendMessage);        //id is receiverId - to whom we send the message
router.get("/:id", protect, getMessages);              //get messages between current user and :id user
router.get("/", protect, getUsersForSidebar);

export default router;