import { auth, addDoc, collection } from "/JS/firebase.js";

// Function to submit pet report
async function submitPetReport(reportData) {
    // Get current user's UID
    const userId = auth.currentUser.uid;

    try {
        // Access Firestore and add the pet report document
        const docRef = await addDoc(collection(firestore, "petReports"), {
            ...reportData,
            userId: userId  // Associate report with user
        });

        console.log("Pet report added with ID: ", docRef.id);
        return docRef.id; // Return the ID of the newly added document
    } catch (error) {
        console.error("Error adding pet report: ", error);
        throw error; // Rethrow the error to handle it in the calling code
    }
}

// Get the form element
const petReportForm = document.getElementById("regForm");

petReportForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Gather data from form
    const petName = document.getElementById("pet").value;
    const time = document.getElementById("time").value;
    
    // Gather selected radio button value for feeding
    let feed;
    const feedOptions = document.getElementsByName("feed");
    for (const option of feedOptions) {
        if (option.checked) {
            feed = option.value;
            break;
        }
    }

    // Construct the report data object
    const reportData = {
        petName: petName,
        time: time,
        feed: feed
    };

    try {
        // Submit pet report
        await submitPetReport(reportData);
        alert("Pet report submitted successfully!");
        petReportForm.reset();
    } catch (error) {
        console.error("Error submitting pet report:", error);
    }
});


// Questions
var currentTab = 0;
showTab(currentTab);

function showTab(n) {
    var x = document.getElementsByClassName("tab");

    // Hide all tabs
    for (var i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    // Show the current tab
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

// Removes invalid class field 
function removeInvalidClass(input) {
    if (input.value.trim() !== "" && input.classList.contains("invalid")) {
        input.classList.remove("invalid");
    }
}


//Checks input to validate
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

var inputFields = document.querySelectorAll('.tab input[required]');
inputFields.forEach(function(input) {
    input.addEventListener('input', function() {
        removeInvalidClass(input);
    });
});

