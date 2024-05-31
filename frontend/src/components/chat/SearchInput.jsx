import React, { useState } from "react";

import { IoSearchSharp } from "react-icons/io5";
import { useConversation } from "../../context/ConversationContext";


const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	
	return (
		<form className='flex items-center gap-2'>
			<input type='text' placeholder='Pretraži korisnike' 
			className='input input-bordered rounded-full bg-white-300 border-primary border-2 text-black
            focus:border-primary focus:ring-primary focus:outline-primary
            dark:bg-dark'
		        />
			<button type='submit' className='btn btn-circle bg-white border-primary border-2
             hover:bg-primary/70 hover:border-primary/70 text-black dark:bg-dark dark:text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;