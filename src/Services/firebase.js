// src/Services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKMDL9a-pw01Y2GBPgjmeaxqZ5HGwvRao",
  authDomain: "zentra-b8661.firebaseapp.com",
  projectId: "zentra-b8661",
  storageBucket: "zentra-b8661.appspot.com", // fixed typo: it was 'firebasestorage.app'
  messagingSenderId: "852754915029",
  appId: "1:852754915029:web:efe23cb27ce5b5c5334c5c",
  measurementId: "G-HTHMZ3NHBT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
