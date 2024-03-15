import { auth, db, addDoc, collection, setDoc, doc } from "/JS/firebase.js";

// Define a global variable to store the pet report ID
let petReportId = null;

document.getElementById("nextBtn").addEventListener("click", async function(event) {
    event.preventDefault();

    const userID = auth.currentUser.uid;

    const petName = document.getElementById("pet").value;
    const time = document.getElementById("time").value;

    const selectedFeedingOption = document.querySelector('input[name="feed"]:checked')
    const food = selectedFeedingOption ? selectedFeedingOption.value : null;
    const meds = document.getElementById("meds").value;

    const selectedBathroomOption = document.querySelector('input[name="bathroom"]:checked')
    const bathroom = selectedBathroomOption ? selectedBathroomOption.value : null;
    const selectedActivityOption = document.querySelector('input[name="activity"]:checked')
    const activity = selectedActivityOption ? selectedActivityOption.value : null;

    const selectedMoodOption = document.querySelector('input[name="mood"]:checked')
    const mood = selectedMoodOption ? selectedMoodOption.value : null;

    const notes = document.getElementById("notes").value;

    if (petName === "") {
        alert("Please enter your pet's name.");
        return;
    }

    try {
        // If petReportId is not set yet, generate a new ID and save it
        if (!petReportId) {
            petReportId = generatePetReportId();
            await savePetReportId(userID, petReportId);
        }
        
        // Save the form data under the existing pet report ID
        await saveFormData(userID, petReportId, petName, time, food, meds, bathroom, activity, mood, notes);
    } catch (error) {
        console.error("Error submitting pet report:", error);
    }
});

// Function to generate a unique ID for the pet report
function generatePetReportId() {
    return Date.now().toString(); // Using timestamp as a simple way to generate a unique ID
}

// Function to save the pet report ID
async function savePetReportId(userID, petReportId) {
    try {
        // Save the pet report ID in Firestore under the user's document
        const userRef = doc(db, "user", userID);
        await setDoc(userRef, { petReportId }, { merge: true });
        console.log("Pet report ID saved:", petReportId);
    } catch (error) {
        console.error("Error saving pet report ID:", error);
        throw error;
    }
}

// Function to save the form data under the pet report ID
async function saveFormData(userID, petReportId, petName, time, food, meds, bathroom, activity, mood, notes) {
    try {
        // Save the form data under the pet report ID in Firestore
        const petReportRef = doc(db, "user", userID, "pet_reports", petReportId);
        await setDoc(petReportRef, {
            userId: userID,
            pet_name: petName,
            time: time,
            food: food,
            meds: meds,
            bathroom: bathroom,
            activity: activity,
            mood: mood,
            notes: notes,
        }, { merge: true }); // Use merge option to update existing data
        console.log("Form data saved under pet report ID:", petReportId);
    } catch (error) {
        console.error("Error saving form data:", error);
        throw error;
    }
}



// Questions
var currentTab = 0; 

function handleNextButtonClick() {
    nextPrev(1);
}

document.getElementById("nextBtn").addEventListener("click", handleNextButtonClick);

function handleBackButtonClick() {
    nextPrev(-1);
}

document.getElementById("prevBtn").addEventListener("click", handleBackButtonClick);
document.addEventListener("DOMContentLoaded", function() {
    showTab(currentTab);
});

function showTab(n) {
    var x = document.getElementsByClassName("tab");

    for (var i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    x[n].style.display = "block";

    if (n === 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }

    if (n === (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
}

function removeInvalidClass(input) {
    if (input.value.trim() !== "" && input.classList.contains("invalid")) {
        input.classList.remove("invalid");
    }
}

function validateForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    if (x[currentTab]) { // Check if x[currentTab] is defined
        y = x[currentTab].getElementsByTagName("input");
        for (i = 0; i < y.length; i++) {
            if (y[i].value == "" && y[i].hasAttribute("required")) {
                y[i].className += " invalid";
                valid = false;
            }
        }
    }
    return valid;
}


function nextPrev(n) {
    var x = document.getElementsByClassName("tab");
    if (n > 0 && !validateForm()) {
        return false;
    }
    currentTab = currentTab + n;

    if (currentTab >= x.length) {
        // Check if it's the last tab before submitting
        if (currentTab === x.length) {
            // Check if it's the last tab
            if (!validateForm()) {
                return false;
            }
            if (document.getElementById("nextBtn").innerHTML === "Submit") {
                document.getElementById("nextBtn").style.display = "none";
                document.getElementById("prevBtn").style.display = "none";
                document.getElementById("regForm").submit();
            }
        }
        return false; // Exit function to prevent further execution
    }
    showTab(currentTab);
}

