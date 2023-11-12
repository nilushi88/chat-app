import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const styles = {
  incomingMessageWrapper: `flex gap-2 pl-4 pr-4 pt-2`,
  outgoingMessageWrapper: `flex gap-2 flex-row-reverse pr-4 pl-4 pt-2`,
  incomingMessage: `bg-white rounded-tr-lg rounded-br-lg rounded-bl-lg p-2`,
  outgoingMessage: `bg-white rounded-tl-lg rounded-bl-lg rounded-br-lg p-2`,
}

const Message =  ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const owner = message.senderId === currentUser.uid;
  return (
    <div className={owner ? styles.outgoingMessageWrapper : styles.incomingMessageWrapper}>
      <div className="flex flex-col">
        <div className="flex max-w-4/5 gap-2">
          <p className={owner ? styles.outgoingMessage : styles.incomingMessage}>{message.text}</p>
        </div>
        <span className="text-slate-400 text-xs">just now</span>
      </div>
    </div>
  )
}

export default Message