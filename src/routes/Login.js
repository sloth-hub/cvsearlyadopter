import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, firebaseInstance } from "../fbase";

const Login = ({userObj}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    
    const history = useHistory();

    useEffect(()=> {
        if (userObj !== undefined) {
            history.push("/");
        }
    },[history, userObj]);

    const onChange = (evt) => {
        const { target: { name, value } } = evt;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }
    const onSubmit = async (evt) => {
        evt.preventDefault();
        try {
            let data;
            if (newAccount) {
                // create account
                data = await authService.createUserWithEmailAndPassword(
                    email, password
                );
            } else {
                // log in
                data = await authService.signInWithEmailAndPassword(
                    email, password
                );
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    }
    const toggleAccount = () => {
        setNewAccount((prev) => !prev);
    }
    const onSocialClick = async (evt) => {
        const {
            target: { name }
        } = evt;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);
    }

    return (
        <div className="main_container">
            <div className="auth_container">
                <h1>LOGIN</h1>
                <form className="loginform" onSubmit={onSubmit}>
                    <input type="email"
                        name="email"
                        placeholder="Email" required
                        value={email}
                        onChange={onChange}
                        className="authInput" />
                    <input type="password"
                        name="password"
                        placeholder="Password" required
                        value={password}
                        onChange={onChange}
                        className="authInput" />
                    <input type="submit"
                        className="authInput authSubmit"
                        value={newAccount ? "Create Account" : "Sign In"} />
                    {error && <span className="authError">{error}</span>}
                </form>
                <span onClick={toggleAccount} className="authSwitch">{newAccount ? "Sign In" : "Create Account"}</span>
                <div className="authBtns">
                <button name="google" className="authBtn" onClick={onSocialClick}>
                    Continue with Google
                </button>
                <button name="github" className="authBtn" onClick={onSocialClick}>
                    Continue with Github
                </button>
            </div>
            
            </div>
        </div>
    );

}

export default Login;