import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0AvYvTifIm6wAMxzfK8gbSwfHfSpLyAk",
  authDomain: "chat-app-867dc.firebaseapp.com",
  projectId: "chat-app-867dc",
  storageBucket: "chat-app-867dc.appspot.com",
  messagingSenderId: "376459927076",
  appId: "1:376459927076:web:1842e03c1f94f1f1c382b1",
  measurementId: "G-8XTY371TEM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()