import { db, addDoc, collection} from "/JS/firebase.js";


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
  closeOverlayAndPopup(); 
});





