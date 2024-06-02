import React, {useEffect, useRef} from "react";
import Message from "./Message";
import MessageSkeleton from "../skeletons/messageSkeleton";
import useGetMessagesWithAdmin from "../../../hooks/useGetMessagesWithAdmin"


const UserMessages = () => {
    const { loading, messages } = useGetMessagesWithAdmin();

    // Ref to scroll to the last message
    const lastMessageRef = useRef();
  
    // Scroll to the last message when messages change
    useEffect(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])


  return (
    <div className="px-4 flex-1 overflow-auto">
      {/* Render messages */}
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            {/* Check if message contains image */}
            {message.image && (
              <img src={message.image} alt="Message Image" className="w-full" />
            )}
            {/* Render message content */}
            <Message message={message} />
          </div>
        ))}

      {/* Skeleton loader */}
      {loading &&
        [...Array(6)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {/* No messages placeholder */}
      {!loading && messages.length === 0 && (
        <p className="text-center p-6 text-gray-300">
          Pošaljite poruku kako biste započeli razgovor.
        </p>
      )}
    </div>
  );
};
export default UserMessages;
