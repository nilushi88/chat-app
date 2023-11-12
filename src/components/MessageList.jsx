import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import Input from './Input';
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log("messages")
  console.log(messages)

  return (
    <div className="w-full h-full overflow-hidden">
      <div className='w-full h-14 bg-sky-800'>
        <div className='text-white text-lg px-4 py-2'>{data.user?.displayName}</div>
      </div>
      <div className="bg-sky-100 h-[79%] overflow-y-scroll">
        {messages.map((m) => (
          <Message message={m}  key={m.id} />
        ))}
      </div>
      <Input />
    </div>

  )
}

export default MessageList