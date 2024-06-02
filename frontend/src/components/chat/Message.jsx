import React from "react";
import { useConversation } from "../../context/ConversationContext";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {

	const { selectedConversation }  = useConversation();
	const { authUser } = useAuthContext();

	//layout & bg color adjusted according to sender-receiver
	const fromMe = message.senderId === authUser._id
	const chatClassName = fromMe ? 'chat-end' : 'chat-start'
	const bubbleBgColor = fromMe ? 'bg-primary' : "bg-inputColor"

	const formattedTime = extractTime(message.createdAt);

	
	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' 
                    src='https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png' />
				</div>
			</div>
			<div className={`chat-bubble text-white pb-2 ${bubbleBgColor} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center text-black'>{formattedTime}</div>
		</div>
	);
};
export default Message;