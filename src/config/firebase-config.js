// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyB6Wq4Z6p5saUhIrdMxDRLmT-SVOPxfCnU",
    authDomain: "fir-first-1905f.firebaseapp.com",
    projectId: "fir-first-1905f",
    storageBucket: "fir-first-1905f.appspot.com",
    messagingSenderId: "862923342529",
    appId: "1:862923342529:web:68b3ab941d9d2f28014a40",
    measurementId: "G-S85QQYRJFL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
