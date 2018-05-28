
var letters = ["a", "b", "c", "d", "e", "f", "g",
 "h", "i", "j", "k", "l", "m", "o", "p", "q", "r", 
 "s", "t", "u", "v", "w", "x", "y", "z"];

 var wins = 0;

 var guessNumber = 12;

 var lettersGuessed = ["a", "b"];

 var game = "backstreet boys";

 document.getElementById("wins").innerHTML = wins;

 document.getElementById("guess-number").innerHTML = guessNumber;

 var lettersGuessedDisplay = "";
 for (var i = 0; i < lettersGuessed.length; i++) {
     lettersGuessedDisplay = lettersGuessedDisplay + lettersGuessed[i] + ", ";
 }
 document.getElementById("letters-guessed").innerHTML = lettersGuessedDisplay;

 document.addEventListener("keydown", function(event) {
    keyPressed = event.key;
    if (game.indexOf(keyPressed) !== -1) {
        alert("its in the puzzle");
    } else {
        alert("not there");
    }
 })
