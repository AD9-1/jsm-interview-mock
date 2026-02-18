// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
const app = !getApps.length?initializeApp(firebaseConfig):getApp();
export const auth = getAuth(app);
export const db=getFirestore(app);