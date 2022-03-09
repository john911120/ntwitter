<<<<<<< HEAD
import { authService, firebaseInstance } from "fbase";
=======
import { authService } from "fbase";
>>>>>>> 07b37fd179ed6999515344e572911efbd8d70226
import { useState } from "react";

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {
            target : {name, value},
        } = event;
        if(name === "email"){
            setEmail(value)
        } else if (name === "password"){
            setPassword(value);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            let data;
        if(newAccount){
            // create newAccount
            data = await authService.createUserWithEmailAndPassword(email, password);
        } else{
            // login logic
            data = await authService.signInWithEmailAndPassword(email, password);
        }
        console.log(data);
        } catch (error){
        setError(error.message);
        }
    }

    const toggleAccount = () => setNewAccount((prev) => !prev)

<<<<<<< HEAD
    const onSocialClick = async (event) => {
        const {
            target : {name},
        } = event;
        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }

=======
>>>>>>> 07b37fd179ed6999515344e572911efbd8d70226
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                name="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={onChange}
                />
                <input 
                name="password"
                type="password"
                placeholder="UserPassword"
                required
                value={password}
                onChange={onChange}
                />
                <input type="submit" value={newAccount ? "Create Account" : "Login"}/>
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
        <div>
<<<<<<< HEAD
            <button onClick={onSocialClick} name="google">Continue with Google</button>
            <button onClick={onSocialClick} name="github">Continue with Github</button>
=======
            <button>Continue with Google</button>
            <button>Continue with Github</button>
>>>>>>> 07b37fd179ed6999515344e572911efbd8d70226
        </div>
        </div>
    )
}

export default Auth;