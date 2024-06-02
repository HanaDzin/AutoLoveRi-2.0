import React, { useEffect } from "react";
import {TiMessages } from "react-icons/ti"

import { useAuthContext} from "../../context/AuthContext"
import { useConversation} from "../../context/ConversationContext"

import MessageInput from "./MessageInput";
import Messages from "./Messages";



const MessageContainer = () => {
	
	const { selectedConversation, setSelectedConversation } = useConversation();

	//so that no chat stays selected when logging out then returning:
	useEffect(() => {
		//cleanup function
	return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='md:min-w-[450px] flex flex-col'>
				{!selectedConversation ? (
					<NoChatSelected /> ) :
					(
				<>
				<div className='bg-primary px-4 py-2 mb-2 dark:bg-primary'>
					<span className='label-text'>Za:</span> <span className='text-gray-900 font-bold'>{selectedConversation.name}</span>
				</div>
				<Messages />
				<MessageInput />
				</>
				)}
		</div>
	);
};

const NoChatSelected = () => {

	const { authUser } = useAuthContext();
	
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-black/70  dark:text-white font-semibold flex flex-col items-center gap-2'>
				<p><span className="text-primary text-3xl">AutoLoveRi</span></p>
				<p>korisnička podrška</p>
				<TiMessages className='text-3xl md:text-6xl text-center text-primary' />
			</div>
		</div>
	);
};

export default MessageContainer;

