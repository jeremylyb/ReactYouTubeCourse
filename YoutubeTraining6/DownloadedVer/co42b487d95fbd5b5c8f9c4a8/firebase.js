// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBX5EwLVCIZNRwEN4xi81oSjqU2UrPbOIY",
  authDomain: "react-notes-d8e4d.firebaseapp.com",
  projectId: "react-notes-d8e4d",
  storageBucket: "react-notes-d8e4d.appspot.com",
  messagingSenderId: "871379304222",
  appId: "1:871379304222:web:3336702fd72831d4b2d30f",
  measurementId: "G-E27PNB5M52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);