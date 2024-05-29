import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAuthContext } from '../src/context/AuthContext';

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  //to be able to updated the authenticated user in context
  const {setAuthUser} = useAuthContext();

  const login = async (email, password) => {

    //first check if every input is valid
    const success = handleInputErrors({ email, password });
    if (!success) return;


    setLoading(true);

    try {
        const res = await fetch("http://localhost:5000/api/users/auth", {     //sending a POST request to appropriate server route
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify({ email, password })      //values sent via request
        })

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Neuspješna prijava");
          }

        //set userInfo in localStorage (to be the newly received data)
        localStorage.setItem("userInfo", JSON.stringify(data));

        //update AuthContext
        setAuthUser(data);
        
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
  }

  return { loading, login };

}

export default useLogin


//using react-toastify give user feedback of what is wrong
function handleInputErrors({email, password}) {

    if (!email || !password) { 
        toast.error('Sva polja moraju biti popunjena.')
        return false;
    }

    return true;
}