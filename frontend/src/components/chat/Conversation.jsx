import React from "react";
const Conversation = () => {
	return (
		<>
			<div className='flex gap-2 items-center hover:bg-primary  rounded p-2 py-1 cursor-pointer'>
				<div className='avatar online'>
					<div className='w-12 rounded-full'>
						<img
							src='https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png'
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-black dark:text-primary '>Korisnik</p>
					</div>
				</div>
			</div>

			<div className='shadow-md my-0 py-0 h-1' />
		</>
	);
};
export default Conversation;