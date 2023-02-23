// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";

// import { GoogleAuthProvider } from "firebase/auth";


// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7eT6O1wcS4Pv677ddK-qixtyhU_H83Yc",
  authDomain: "inspirational-page.firebaseapp.com",
  projectId: "inspirational-page",
  storageBucket: "inspirational-page.appspot.com",
  messagingSenderId: "359563668539",
  appId: "1:359563668539:web:dcbc73fa0b1f68d724801e",
  measurementId: "G-L8CK52D8FD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
