import React, {useEffect, useRef} from "react";
import Message from "./Message";
import MessageSkeleton from "../skeletons/messageSkeleton";

import useGetMessages from "../../../hooks/useGetMessages";

const Messages = () => {
  const { loading, messages } = useGetMessages();

  	//so that the most recent message is always visible (auto scroll to last msg when chat is opened)
	const lastMessageRef = useRef();
	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth"});
		}, 100)
	}, [messages])

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(6)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center p-6 text-gray-300">
          Pošaljite poruku kako biste započeli razgovor.
        </p>
      )}
    </div>
  );
};
export default Messages;
