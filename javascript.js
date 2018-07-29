// Array of chromatic keys, black keys are always sharps, C4 to C6
var toneNamesArray = ["C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5", "C6"];

// Draw the keyboard
var keyboard = document.getElementById("keyboard");
for (var i = 0; i < toneNamesArray.length; i++) {
    var newKey = document.createElement("div");
    newKey.classList.add("key");
    newKey.setAttribute("id", toneNamesArray[i]);

    // Black keys are contained inside white divs
    if (toneNamesArray[i].indexOf("#") != -1) {
        newKey.classList.add("key-black");

        // Set as child of the white key, not keyboard
        keyboard.lastChild.appendChild(newKey);
    } else {
        newKey.classList.add("key-white");
        keyboard.appendChild(newKey);
    }
}

// Elements for keys and buttons, also message div
var keys = document.querySelectorAll(".key");
var whiteKeys = document.querySelectorAll(".key-white");
var blackKeys = document.querySelectorAll(".key-black");

var newGameButton = document.getElementById("newGame");
var playToneButton = document.getElementById("playTone");
var messageDiv = document.getElementById("messageDiv");
var tooSmallMessageDiv = document.getElementById("tooSmallMessageDiv");

// Pick a random tone to begin the game
// This line might get removed, if "Start Game" button is added
var toneName = toneNamesArray[Math.floor(Math.random() * toneNamesArray.length) + 1];

// Loop adds functions to play the keys
for (var i = 0; i < keys.length; i++) {
    keys[i].addEventListener("mousedown", function (e) {

        // Add depression effect
        e.target.classList.add("key-depressed");

        // Generate tone with the array
        playTone(tone[e.target.getAttribute("id")]);

        // Set message 
        if (toneName === e.target.getAttribute("id")) {
            messageDiv.textContent = "Correct!";
        } else {
            messageDiv.textContent = "Wrong key...";

            // If wrong key is selected, add a clue
            if (toneNamesArray.indexOf(toneName) < toneNamesArray.indexOf(e.target.getAttribute("id"))) {
                messageDiv.textContent += "try a lower key.";
            } else {
                messageDiv.textContent += "try a higher key.";
            }
        }

        // Stop white keys from playing a note when black keys are pressed
        e.stopPropagation();
    });

    // Remove depression effect after key release
    keys[i].addEventListener("mouseup", function (e) {
        e.target.classList.remove("key-depressed")
    })
}


// Following 20 lines paint keys gray when mouseover
for (var i = 0; i < whiteKeys.length; i++) {
    whiteKeys[i].addEventListener("mouseover", function (e) {
        e.target.classList.add("key-white-mouseover");
        e.stopPropagation();
    });
    whiteKeys[i].addEventListener("mouseout", function (e) {
        e.target.classList.remove("key-white-mouseover");

        // When a key is clicked and dragged away, key was stuck depressed 
        e.target.classList.remove("key-depressed");
        e.stopPropagation();
    });
}

for (var i = 0; i < blackKeys.length; i++) {
    blackKeys[i].addEventListener("mouseover", function (e) {
        e.target.classList.add("key-black-mouseover");
        e.stopPropagation();
    });
    blackKeys[i].addEventListener("mouseout", function (e) {
        e.target.classList.remove("key-black-mouseover");
        e.target.classList.remove("key-depressed");
        e.stopPropagation();
    });
}

// Check size
checkIfSmall();

newGameButton.addEventListener("click", function () {
    newGameButton.textContent = "New Game";
    messageDiv.textContent = "";
    var newToneNumber = Math.floor(Math.random() * 24) + 1;
    toneName = toneNamesArray[newToneNumber];

});

playToneButton.addEventListener("click", function () {
    // Play the target tone
    playTone(toneName);
});


//Check if keyboard is in display, alert if window is too small
function checkIfSmall() {
    if (innerWidth < 730) {
        tooSmallMessageDiv.textContent = "Window is too small, please resize";
    } else {
        tooSmallMessageDiv.textContent = "";
    }
}

window.addEventListener("resize", checkIfSmall);