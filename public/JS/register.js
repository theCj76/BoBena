
import { auth, createUserWithEmailAndPassword } from "/JS/firebase.js";


document.getElementById('register').addEventListener('click', function(event){
    event.preventDefault()

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log('User Signed up', user);

       window.location.href = "dashboard.html";
    })
    .catch ((err) => {
        console.log(err.code);
        console.log(err.message);

    });
})

