import React, { createContext, useContext, useState } from 'react';

//creating a context
const ConversationContext = createContext();

//hook that allows components to access this context
export const useConversation = () => {
    return useContext(ConversationContext);
  };

export const ConversationProvider = ({ children }) => {
    //state variables
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  return (
    //passing all values to all components wrapped by this provider
    <ConversationContext.Provider value={{ selectedConversation, setSelectedConversation, messages, setMessages }}>
      {children}
    </ConversationContext.Provider>
  );
};


