import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js"
import { Config } from "/JS/config.js";

const app = initializeApp(Config);

const auth = getAuth (app);

document.getElementById('register').addEventListener('click', function(event){
    event.preventDefault()

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log('User Signed up', user);

       // window.location.href = "track.html";
    })
    .catch ((err) => {
        console.log(err.code);
        console.log(err.message);

    });
})
