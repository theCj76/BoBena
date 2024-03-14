import { auth, db, addDoc, collection } from "/JS/firebase.js";

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
//photo input goes here 
    const notes = document.getElementById("notes").value;

    if (petName === "") {
        alert("Please enter your pet's name.");
        return;
    }

    try {
        await submitPetReport(userID, petName, time, food, meds, bathroom, activity, mood, notes);
    } catch (error) {
        console.error("Error submitting pet report:", error);
    }
});

async function submitPetReport(userID, petName, time, food, meds, bathroom, activity, mood, notes) {
    try {
       const docRef = await addDoc(collection(db, "user", userID, "pet_reports"), {
            userId: userID,
            pet_name: petName,
            time: time,
            food: food,
            meds : meds,
            bathroom : bathroom,
            activity : activity,
            mood : mood,
            notes : notes,
            
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document:", error);
        throw error; 
    }
}

// Questions

function handleNextButtonClick() {
    nextPrev(1);
}

document.getElementById("nextBtn").addEventListener("click", handleNextButtonClick);

function handleBackButtonClick() {
    nextPrev(-1);
}

document.getElementById("prevBtn").addEventListener("click", handleBackButtonClick);

function showTab(n) {
    var x = document.getElementsByClassName("tab");

    for (var i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    x[n].style.display = "block";

    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }

    if (n == (x.length - 1)) {
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
    y = x[currentTab].getElementsByTagName("input");
    for (i = 0; i < y.length; i++) {
        if (y[i].value == "" && y[i].hasAttribute("required")) {
            y[i].className += " invalid";
            valid = false;
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
        document.getElementById("regForm").submit();
        return false;
    }
    showTab(currentTab);
}

var inputFields = document.querySelectorAll('.tab input[required]');
inputFields.forEach(function(input) {
    input.addEventListener('input', function() {
        removeInvalidClass(input);
    });
});

var currentTab = 0;
showTab(currentTab);
