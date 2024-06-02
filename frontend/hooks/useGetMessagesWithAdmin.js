import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useConversation } from '../src/context/ConversationContext';
import { useAuthContext } from '../src/context/AuthContext';

const useGetMessagesWithAdmin = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation} = useConversation();
    const { authUser } = useAuthContext();

    useEffect(() => {
        const getMessagesWithAdmin = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:5000/api/messages/getMessagesWithAdmin/${authUser._id}`);

                const data = await res.json();
                if (data.error) throw new Error(data.error);

                setMessages(data);

            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getMessagesWithAdmin();

    }, [authUser._id]);

    return { loading, messages };
};

export default useGetMessagesWithAdmin;
