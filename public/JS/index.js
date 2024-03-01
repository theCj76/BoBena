import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getFirestore, addDoc } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-firestore.js";
import { collection } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-firestore.js";

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

document.getElementById("waitlistForm").addEventListener("submit", async function(event) {
  event.preventDefault();
  
  const emailInput = document.getElementById("email");
  const email = emailInput.value.trim(); // remove whitespace

  if(email === "") {
    alert("Please enter your email.");
    return;
  }
  
  try {
    await addEmailAddress(email); 
    console.log("Email address added successfully!");
    emailInput.value = ""; 

    //displays overlay only when form successful
    displayOverlayAndPopup();
  } catch (error) {
    console.error("Error adding email address:", error);
  }
});

//  add email address to Firestore
async function addEmailAddress(email) {
  try {
    const docRef = await addDoc(collection(db, "email_addresses"), {
      email: email,
    });
  } catch (e) {
    throw e;
  }
}

function displayOverlayAndPopup() {
  var overlay = document.getElementById("overlay");
  var popup = document.getElementById("popup");
  overlay.style.display = "block";
  overlay.style.opacity = "0.7"; 
  popup.style.display = "block"; 
};

function closeOverlayAndPopup() {
  var overlay = document.getElementById("overlay");
  var popup = document.getElementById("popup");
  overlay.style.display = "none";
  overlay.style.opacity = "0";
  popup.style.display = "none";
}

document.getElementById("close").addEventListener("click", function() {
  closeOverlayAndPopup(); // Call the function to close overlay and popup
});



