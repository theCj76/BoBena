import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getFirestore, addDoc } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-firestore.js";
import { collection } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-firestore.js";
import { Config } from "/JS/config.js";

const app = initializeApp(Config);

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





