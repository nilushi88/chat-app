import React, { useContext, useState } from "react";
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

function Search() {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    const handleSearch = async () => {
        const q = query(
            collection(db, "users"),
            where("displayName", "==", username)
        );

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (err) {
            setErr(true);
        }
    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {
        const combinedId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId));
            console.log(res)
            if (!res.exists()) {

                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
            }
        } catch (err) { }

        dispatch({ type: "CHANGE_USER", payload: user });
        
        setUser(null);
        setUsername("")
    };


    return (
        <div className="mb-6">
            <input className="shadow border-none w-full py-4 px-4 text-gray-500 outline-none" placeholder="Find a user"
                type="text" onKeyDown={handleKey}
                onChange={(e) => setUsername(e.target.value)}
                value={username} />
            {/* </div> */}
            {err && <span>User not found!</span>}
            {user && (
                //   <div className="userChat" onClick={handleSelect}>

                <div className="divide-y dark:divide-slate-200/5">
                    <div className="flex items-center gap-4 p-4" onClick={handleSelect}>
                        <div className="w-12 h-12 rounded-full bg-sky-800 flex justify-center items-center text-white"><p>{user.displayName.charAt(0)}</p></div>
                        <strong className="text-slate-900 text-sm font-medium dark:text-slate-200">{user.displayName}</strong>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Search