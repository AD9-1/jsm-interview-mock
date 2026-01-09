// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh7Z549BuLwy8MR68b4SJxhdwVpe_7kvg",
  authDomain: "mockwise-bc3a7.firebaseapp.com",
  projectId: "mockwise-bc3a7",
  storageBucket: "mockwise-bc3a7.firebasestorage.app",
  messagingSenderId: "656753770304",
  appId: "1:656753770304:web:1411cfc43212361fedc4a5",
  measurementId: "G-4SHSMJ6WXM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);