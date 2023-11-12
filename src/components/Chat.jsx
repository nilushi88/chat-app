import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import MessageList from "./MessageList";

// const style = {
//     appContainer: `max-w-[728px] mx-auto text-center`,
//     appSection: `flex flex-col`
//   }

const Chat = () => {


    return (
        <div className="h-full">
            <MessageList></MessageList>
        </div>
    );
}

export default Chat