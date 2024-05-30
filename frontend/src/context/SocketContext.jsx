import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client'

//creating a context
const SocketContext = createContext();

//hook which allows components to access the SocketContext
export const useSocketContext = () => {
    return useContext(SocketContext);
}

//provider wraps around parts of app that need access to this context
export const SocketContextProvider = ({ children }) => {
    //state variables = socket, list of online users
    const [ socket, setSocket] = useState(null);
    const [ onlineUsers, setOnlineUsers ] = useState([]);

    //using the custom hook to obtain authenticated user information
    const { authUser } = useAuthContext();

        //hook that runs when authUser changes:
        useEffect(() => {
            if (authUser) {
                const socket = io("http://localhost:5000", {
                    query: {                                 //if user is authenticated, create new connection + pass his ID as query param
                        userId: authUser._id
                    }
                });

                setSocket(socket);                          //storing the created socket in state

                //event listener for "getOnlineUsers" event - updates onlineUsers when the server sends the list of online users
                socket.on("getOnlineUsers", (users) => {
                    setOnlineUsers(users);
                })

                //cleanup function that will close the WebSocket connection when the component unmounts or when authUser changes
                return () => socket.close();         
            } else {
                //close the existing connection if user disconnects:
                if (socket) {
                socket.close();
                setSocket(null);
            }
        }
        }, [authUser]);

    return (
        //passing socket and onlineUsers as the context value = available to any child components wrapped by this provider.
        <SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider>
    )
}