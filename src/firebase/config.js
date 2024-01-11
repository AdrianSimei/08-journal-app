// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'; 

import {getFirestore} from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFuGBgtFrL7FOT5_x8G8oG3h1A1VNvVDw",
    authDomain: "react-curso-bb1d8.firebaseapp.com",
    projectId: "react-curso-bb1d8",
    storageBucket: "react-curso-bb1d8.appspot.com",
    messagingSenderId: "905422903938",
    appId: "1:905422903938:web:2e901def4e4c4b3bbbf29b"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseaAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
