import React, { useEffect, useState, useRef } from 'react'

import { AiOutlineMessage } from "react-icons/ai";
import UserChatWindow from './UserChatWindow';


const UserPopUpChat = () => {
    const [ visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    }

    //so the chat goes away once user clicks outside of it:
    const ref = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setVisible(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    })


    return (
        <div className='fixed bottom-10 right-12'>
            <div className="chat chat-end  p-3 rounded-[28px] shadow-md border-2 transition-transform transform hover:scale-110
             bg-white text-black dark:bg-primary dark:text-white hover:bg-primary"
              onClick={toggleVisibility}>
                <div className="chat-image avatar">
                    <div className="w-14 rounded-full">
                        <AiOutlineMessage className='text-5xl' />
                    </div>
                </div>
            </div>
            <div ref={ref}>
                {visible && <UserChatWindow visible={visible} onClose={() => setVisible(false)} />}
            </div>
        </div>
    );
}

export default UserPopUpChat