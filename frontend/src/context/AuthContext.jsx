import { createContext, useContext } from "react";
import React, { useState } from "react";

//creating the context
export const AuthContext = createContext();

//custom hooks that allows components to access the context
export const useAuthContext = () => {
    return useContext(AuthContext);
}

//provider wraps around parts of the app that need access to the context
export const AuthContextProvider = ({ children }) => {
    //state variable - holds the authenticated user's info
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("userInfo")) || null)

    return (
    //assing authUser and setAuthUser as the context value => available to any child components wrapped by this provider
    <AuthContext.Provider value={{authUser, setAuthUser}}>
        { children }
    </AuthContext.Provider> 
    )
}