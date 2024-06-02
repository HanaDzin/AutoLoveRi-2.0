import React, { useState } from 'react'
import { toast } from 'react-toastify';

import { useAuthContext } from '../src/context/AuthContext'
import {useConversation} from '../src/context/ConversationContext'

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();
    const { messages, setMessages, selectedConversation} = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
        const res = await fetch(`http://localhost:5000/api/messages/send/${authUser._id}/to/${selectedConversation._id}`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({message})
        })

        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }

        //add the new message (data) onto the previously exchanged messages:
        setMessages([...messages, data]);

    } catch (error) {
        toast.error(error.message);
    } finally {
        setLoading(false);

    }
  }

  return { loading, sendMessage};
}

export default useSendMessage