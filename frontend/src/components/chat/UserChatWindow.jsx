import React, { useState } from 'react';
import whiteCar from '../../assets/whiteCar.png';
import { IoClose } from "react-icons/io5";

import MessageInput from './MessageInput';
import Messages from './Messages';

const UserChatWindow = (props) => {
    const [visible, setVisible] = useState(true);

    const handleClose = () => {
        setVisible(!visible);
    };

    return (
        <>
            {visible && ( <>
                <div className="flex flex-col fixed bottom-[116px] right-[24px] w-[420px] h-[530px] rounded-[12px] border-2 overflow-hidden shadow-lg bg-white/70 dark:bg-dark/70"
                    style={{ opacity: '1' }}>
                    <div className="flex items-center justify-between px-4 m-2 bg-primary rounded-t-[12px]">
                        <div className="flex items-center space-x-2">
                            <div className="w-12 h-12 rounded-full items-center mt-4">
                                <img src={whiteCar} alt="" />
                            </div>
                            <p className="text-white dark:text-black font-semibold">AutoLoveRi - korisnička podrška</p>
                        </div>
                        <button onClick={handleClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none">
                            <IoClose className='text-3xl' />
                        </button>
                    </div>
                    <Messages />
                    <MessageInput/>
                </div>
                
            </>)}
        </>
    );
}

export default UserChatWindow;
