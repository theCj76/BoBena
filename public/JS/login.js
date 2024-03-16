import { getAuth, signInWithEmailAndPassword } from "/JS/firebase.js";

function loginUser(email, password) {
    signInWithEmailAndPassword(getAuth(), email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User logged in:", user);
            window.location.href = "track.html";
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error("Login Error:", errorMessage);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const emailInput = document.getElementById('emailInput');
        const passwordInput = document.getElementById('passwordInput');

        const email = emailInput.value;
        const password = passwordInput.value;

     
        loginUser(email, password);
    });
});
