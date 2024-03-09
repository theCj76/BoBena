import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js"


const firebaseConfig = {
  apiKey: "AIzaSyCzvDXN4inmWYvH2yAk5QrnOj2lhdcbOUQ",
  authDomain: "bobena-81edb.firebaseapp.com",
  projectId: "bobena-81edb",
  storageBucket: "bobena-81edb.appspot.com",
  messagingSenderId: "411925308524",
  appId: "1:411925308524:web:59db78d765a9febc536449",
  measurementId: "G-X35WNJ5JGK"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth (app);

document.getElementById('register').addEventListener('click', function(event){
    event.preventDefault()

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log('User Signed up', user);

        window.location.href = "track.html";
    })
    .catch ((err) => {
        console.log(err.code);
        console.log(err.message);

        //if (errorCode === 'auth/email-already-in-use') {
      
       // } else {
            // Any other error
            // Display a generic error message to the user
        //    alert(errorMessage);
      //  }
    });
})
