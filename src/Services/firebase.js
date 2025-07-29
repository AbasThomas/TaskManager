// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKMDL9a-pw01Y2GBPgjmeaxqZ5HGwvRao",
  authDomain: "zentra-b8661.firebaseapp.com",
  projectId: "zentra-b8661",
  storageBucket: "zentra-b8661.firebasestorage.app",
  messagingSenderId: "852754915029",
  appId: "1:852754915029:web:efe23cb27ce5b5c5334c5c",
  measurementId: "G-HTHMZ3NHBT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);