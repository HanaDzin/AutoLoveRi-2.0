import React from "react";

import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
	return (
		<div className='md:min-w-[450px] flex flex-col'>
			<>
				{/* Header */}
				<div className='bg-primary px-4 py-2 mb-2 dark:bg-primary'>
					<span className='label-text'>Za:</span> <span className='text-gray-900 font-bold'>Ime Korisnika</span>
				</div>

				<Messages />
				<MessageInput />
			</>
		</div>
	);
};
export default MessageContainer;