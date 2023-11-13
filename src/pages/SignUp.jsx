import React, { useState, useRef } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase"
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const styles = {
    formContainer: `bg-blue-300 h-screen p-4 flex justify-center items-center w-full`,
    formWrapper: `w-full max-w-sm`,
    form: `bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4`,
    heading: `font-bold text-xl  text-slate-500 text-center m-4`,
    label: `block text-sm font-semibold  text-slate-500 mb-2`,
    input: `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
    focus:outline-none focus:shadow-outline`,
    button: `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`
}

const SignUp = () => {
    const [err, setErr] = useState(false);
    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const navigate = useNavigate();

    const signUpUser = async (e) => {
        e.preventDefault();

        const name = nameInputRef.current.value;
        const email = emailInputRef.current.value;

        try {
            const res = await createUserWithEmailAndPassword(auth, email, passwordInputRef.current.value);

            await updateProfile(res.user, {
                displayName: name
            });

            await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName: name,
                email: email
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});

            navigate("/");

        } catch (err) {
            console.log(err);
            setErr(true);
        }
    }
    return (
        <div className={styles.formContainer}>
            <div className={styles.formWrapper}>
                <form className={styles.form} onSubmit={signUpUser}>
                    <div className={styles.heading}>Sign Up</div>
                    <div className="mb-6">
                        <label className={styles.label} htmlFor="name"> Name </label>
                        <input className={styles.input} type="text" id="name" ref={nameInputRef} required />
                    </div>
                    <div className="mb-6">
                        <label className={styles.label} htmlFor="email">Email Address</label>
                        <input className={styles.input} type="email" id="email" ref={emailInputRef} required />
                    </div>
                    <div className="mb-6">
                        <label className={styles.label} htmlFor="password"> Password </label>
                        <input className={styles.input} type="password" id="password" ref={passwordInputRef} required />
                    </div>
                    <div className="flex items-center">
                        <button className={styles.button} type="submit">
                            Sign Up
                        </button>
                        {err && <span>Something went wrong</span>}
                    </div>
                </form>
                <p> You do have an account? <Link to="/login">Login</Link> </p>
            </div>
        </div>
    );
}
export default SignUp;