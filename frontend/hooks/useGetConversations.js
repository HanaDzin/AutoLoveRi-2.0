import React, { useEffect, useState } from 'react'
import {toast} from 'react-toastify';
import { useAuthContext } from '../src/context/AuthContext';

const useGetConversations = () => {

    const { authUser } = useAuthContext();

    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);


    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:5000/api/users/sidebar/${authUser._id}`);

                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }

                setConversations(data);

            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }

        getConversations(); //call this function so the code gets executed
    }, [])

    return {loading, conversations };
}

export default useGetConversations