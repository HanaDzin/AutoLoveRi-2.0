import React from "react";
import { useConversation } from "../../context/ConversationContext";

const Conversation = ({conversation, lastIdx}) => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	const isSelected = selectedConversation?._id === conversation._id;

	return (
		<>
			<div className={`flex gap-2 items-center hover:bg-primary rounded p-2 py-1 cursor-pointer
			${isSelected ? "bg-primary " : ""}
			`}
			onClick={() => setSelectedConversation(conversation)}>
			
				<div className='avatar online'>
					<div className='w-12 rounded-full'>
						<img
							src='https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png'
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between  dark:text-primary hover:text-white '>
						<p className='font-bold text-black dark:text-white'>{conversation.name}</p>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='shadow-md my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;