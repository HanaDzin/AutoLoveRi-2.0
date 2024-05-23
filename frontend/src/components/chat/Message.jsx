import React from "react";

const Message = ({ message }) => {
	
	return (
		<div className='chat chat-start'>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' 
                    src='https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png' />
				</div>
			</div>
			<div className='chat-bubble text-white bg-primary pb-2 dark:text-black'>Hello</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>11:20</div>
		</div>
	);
};
export default Message;