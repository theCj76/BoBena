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


