import React, { useState } from "react";

import { BsSend } from "react-icons/bs";
import useSendMessageToAdmin from "../../../hooks/useSendMessageToAdmin";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessageToAdmin} = useSendMessageToAdmin();

	const submitHandler = async (e) => {
		e.preventDefault();

		if (!message) return;		//so user can't spam empty messages
		await sendMessageToAdmin(message);
		setMessage("");



	}

	return (
		<form className='px-4 my-3' onSubmit={submitHandler}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-primary border-gray-600 text-white'
					placeholder='Pošalji poruku'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{ loading ? <div className="loading loading-spinner"></div> : <BsSend /> }
				</button>
			</div>
		</form>
	);
};
export default MessageInput;