// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFyKvbysjndQ0CZ3dcv-A6JSLAtJwzNik",
  authDomain: "login-auth-29bcd.firebaseapp.com",
  projectId: "login-auth-29bcd",
  storageBucket: "login-auth-29bcd.appspot.com",
  messagingSenderId: "28495698095",
  appId: "1:28495698095:web:64785b0cee9b1c8abb5c5a",
  measurementId: "G-S4CG9JFLNC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };