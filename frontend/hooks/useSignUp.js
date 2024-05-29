import {React, useState} from 'react'
import { toast } from 'react-toastify'
import { useAuthContext } from '../src/context/AuthContext';

const useSignUp = () => {
  const [loading, setLoading] = useState(false);

  const {setAuthUser }= useAuthContext();

  const signUp = async(name, email, password, confirmPassword) => {

    //first check if every input is valid
    const success = handleInputErrors(name, email, password, confirmPassword);
    if (!success) return;
 
    setLoading(true);

    try {   //sending a POST request to server route in charge of sign up functionality
        const res = await fetch("http://localhost:5000/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({name, email, password, confirmPassword}) //what is being set
        })

        const data = await res.json();  //data = response from server

        if (data.error) {   //in case of problems with response, throw an error which will be catched
            throw new Error(data.error);
        }

        //set the user in localStorage so its data stays saved even when page is refreshed:
        localStorage.setItem("userInfo", JSON.stringify(data));

        //update the context - redirects the signed up user to HomePage:
        setAuthUser(data);
        
    } catch (error) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
  };

  return { loading, signUp }
}

export default useSignUp




//using react-hot-toast give user feedback of what is wrong
function handleInputErrors(name, email, password, confirmPassword) {

    if (!email || !name || !password || !confirmPassword) { 
        toast.error('Sva polja moraju biti ispunjena.')
        return false;
    }

    if (password !== confirmPassword) { 
        toast.error('Lozinke se ne podudaraju')
        return false;
    }

    return true;
}