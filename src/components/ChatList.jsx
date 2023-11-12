import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

function ChatList() {
    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
    };

    console.log("chats")
    console.log(chats)
    return (
        <div className="chats h-[68%] ">
            {/* <div className="divide-y dark:divide-slate-200/5">
                <div className="flex items-center gap-4 p-4">
                    <div className="w-12 h-12 rounded-full bg-sky-800 flex justify-center items-center text-white"><p>CA</p></div>
                    <div className="text-slate-900 text-sm font-medium dark:text-slate-200">
                        <span className="text-base font-semibold">Jane Ayer</span>
                        <p className="text-xs text-slate-400">Hello</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4">
                    <div className="w-12 h-12 rounded-full bg-sky-800 flex justify-center items-center text-white"><p>CA</p></div>
                    <div className="text-slate-900 text-sm font-medium dark:text-slate-200">
                        <span className="text-base font-semibold">Jane Ayer</span>
                        <p className="text-xs text-slate-400">Hello</p>
                    </div>
                </div>
            </div> */}
            <div className="divide-y dark:divide-slate-200/5">
                {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                    <div className="flex items-center gap-4 p-4" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                        <div className="w-12 h-12 rounded-full bg-sky-800 flex justify-center items-center text-white"><p>{chat[1].userInfo.displayName.charAt(0)}</p></div>
                        <div className="text-slate-900 text-sm font-medium dark:text-slate-200"  >
                            <span className="text-base font-semibold">{chat[1].userInfo.displayName}</span>
                            <p className="text-xs text-slate-400">{chat[1].lastMessage?.text.substring(0,20)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChatList