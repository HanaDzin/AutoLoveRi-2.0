import { useState } from 'react'
import { useAuthContext } from '../src/context/AuthContext';
import {toast} from 'react-toastify';
import { redirect } from 'react-router-dom';

const useLogout = () => {
    const [ loading, setLoading ] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/users/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json"}
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            //if there is no error, remove user from localStorage:
            localStorage.removeItem("userInfo");

            //update AuthContext value (authUser) so we can navigate to LoginPage:
            setAuthUser(null);

            redirect("/");

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout };

}

export default useLogout