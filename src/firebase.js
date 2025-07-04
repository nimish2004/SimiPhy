//// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAM7TyuBkGOFe3XZsdJLCvwd8PFP8J5Fw",
  authDomain: "simiphy-ead8b.firebaseapp.com",
  projectId: "simiphy-ead8b",
  storageBucket: "simiphy-ead8b.firebasestorage.app",
  messagingSenderId: "83847761863",
  appId: "1:83847761863:web:8ded4f1bf3e064b20793e2",
  measurementId: "G-JLKBFX4GPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, RecaptchaVerifier };
export const db = getFirestore(app);
