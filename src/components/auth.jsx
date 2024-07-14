import { auth, googleProvider } from "../config/firebase-config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    console.log(auth?.currentUser?.photoURL);
    const handleSignIn = async () => {
        try {
            const userlogin = await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
        }
    };
    const handleLogIn = async () => {
        try {
            const userlogin = await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
        }
    };
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("Sign Out");
        } catch (error) {
            console.log(error);
        }
    };
    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(auth?.currentUser?.email);
    return (
        <div className=" text-black gap-y-8 mx-auto flex flex-col w-1/5 *:border-black">
            Firebase
            <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder=" email"
                className="bg-gray-100  focus:border-black"
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name=""
                id=""
                className="bg-gray-100 "
            />
            <button onClick={handleSignIn}>Create Account</button>
            <button onClick={handleLogIn}>Sign In</button>
            <button onClick={handleSignOut}>Sign Out</button>
            <button onClick={handleGoogleSignIn}>Sign In with Google</button>
        </div>
    );
};

export default Auth;
