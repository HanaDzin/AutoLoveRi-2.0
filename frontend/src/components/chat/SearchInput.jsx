import React, { useState } from "react";
import { toast } from "react-toastify";
import { IoSearchSharp } from "react-icons/io5";

import { useConversation } from "../../context/ConversationContext";
import useGetConversations from "../../../hooks/useGetConversations";


const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const submitHandler = (e) => {
		e.preventDefault();

		if (!search) return;
		if (search.length < 3) {
			return toast.error("Traženi pojam mora imati barem 3 znaka");
		}

		const conversation = conversations.find((c) =>
			c.name.toLowerCase().includes(search.toLowerCase())
		);

		console.log("Found conversation:", conversation);

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else {
			toast.error("Nema traženog korisnika");
		}
	};
	
	return (
		<form className='flex items-center gap-2' onSubmit={submitHandler}>
			<input type='text' placeholder='Pretraži korisnike' 
			className='input input-bordered rounded-full bg-white-300 border-primary border-2 text-black
            focus:border-primary focus:ring-primary focus:outline-primary
            dark:bg-dark'
			value={search}
			onChange={(e) => setSearch(e.target.value)} 
		        />
			<button type='submit' className='btn btn-circle bg-white border-primary border-2
             hover:bg-primary/70 hover:border-primary/70 text-black dark:bg-dark dark:text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;