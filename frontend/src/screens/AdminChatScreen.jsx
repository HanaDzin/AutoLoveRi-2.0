import React from 'react'
import Sidebar from '../components/chat/Sidebar'
import MessageContainer from '../components/chat/MessageContainer'

const AdminChatScreen = () => {
  return (
    <div className='pt-16 h-screen flex items-center justify-center dark:bg-dark text-white'>
        <div className='flex sm:h-[500px] md:h-[600px]  rounded-lg overflow-hidden
        bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <Sidebar />
            <MessageContainer />
        </div>
    </div>


  )
}

export default AdminChatScreen