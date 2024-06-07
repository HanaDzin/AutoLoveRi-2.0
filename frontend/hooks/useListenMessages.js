import React, { useEffect } from 'react'
import { useSocketContext} from "../src/context/SocketContext";
import {useConversation} from '../src/context/ConversationContext';



const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    //listening for the newMessage event
    socket?.on("newMessage", (newMessage) => {
        //add this new message to messages
        setMessages([...messages, newMessage])
    })
    //when component unmounts, we don't want to still listen for this event
    return () => socket?.off("newMessage");
  }, [ socket, setMessages, messages])
}

export default useListenMessages