
// Firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js"; // Import from auth module
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-firestore.js";

const Config = {
    apiKey: "AIzaSyCzvDXN4inmWYvH2yAk5QrnOj2lhdcbOUQ",
    authDomain: "bobena-81edb.firebaseapp.com",
    projectId: "bobena-81edb",
    storageBucket: "bobena-81edb.appspot.com",
    messagingSenderId: "411925308524",
    appId: "1:411925308524:web:59db78d765a9febc536449",
    measurementId: "G-X35WNJ5JGK"
  };

const app = initializeApp(Config);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, createUserWithEmailAndPassword, collection, addDoc };
