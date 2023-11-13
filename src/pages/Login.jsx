import React, { useState, useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
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

const Login = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const res = await signInWithEmailAndPassword(auth, emailInputRef.current.value, passwordInputRef.current.value);
            navigate("/");
        } catch (err) {
            console.log(err);
            setErr(true);
        }
    }

    return (

        <div className={styles.formContainer}>
            <div className={styles.formWrapper}>
                <form className={styles.form} onSubmit={loginUser}>
                    <div className={styles.heading}>Login</div>
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
                            Login
                        </button>
                        {err && <span>Invalid Username or Password</span>}
                    </div>
                </form>
                <p>You don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Login