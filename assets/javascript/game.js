var letters = ["a", "b", "c", "d", "e", "f", "g",
 "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", 
 "s", "t", "u", "v", "w", "x", "y", "z"];

var puzzles = ["Backstreet Boys", "NSync", "Hanson", "LFO", "New Kids on the Block", "O Town"];
var puzzleImages = ["bsb.jpg", "nsync.jpg", "hanson.jpg", "lfo.jpg", "nkotb.jpg", "otown.jpg"];
var songs = ["assets/music/bsb.mp3", "assets/music/nsync.mp3", "assets/music/hanson.mp3", "assets/music/lfo.mp3", "assets/music/nkotb.mp3", "assets/music/otown.mp3"];

var winningImage = "";
var winningSong = "";
var wins = 0;
var guessNumber = 10;
var lettersGuessed = [];
var solution = "";
var game = "";
var gameAlert = "";
var gameOver = false;

 newPuzzle();
 updateGameState();

 document.addEventListener("keydown", function(event) {
    if (gameOver == true) {
        return;
    }

    keyPressed = event.key;
    if (letters.indexOf(keyPressed) === -1) {
        return;
    }

    if (lettersGuessed.indexOf(keyPressed) !== -1) {
        gameAlert = "your letter has already been guessed!";
        updateGameState();
        return;
    }

    if (solution.indexOf(keyPressed) !== -1) {
        lettersGuessed.push(keyPressed);

        for (var i = 0; i < solution.length; i++) {
            if (solution[i] === keyPressed) {
                game = setCharAt(game, i, keyPressed);
            }
        }

        gameAlert = keyPressed + " is in the puzzle!";

        if (game.indexOf("_") === -1) {
            gameAlert = "CONGRATUATIONS YOU WIN!!! ";
            document.getElementById("winning-image").src = "assets/images/" + winningImage;

            $.playSound(winningSong);

            wins++;
            gameOver = true;
        }

        updateGameState();
        return;

    } else {
        lettersGuessed.push(keyPressed);
        guessNumber--;

        if (guessNumber === 0) {
            gameAlert = "Sorry! You lose, the puzzle was: " + solution;
            document.getElementById("winning-image").src = "assets/images/" + winningImage;
            gameOver = true;
        } else {
            gameAlert = keyPressed + " is NOT the puzzle!";
        }

        updateGameState();
    }
 });

 function updateGameState() {
    document.getElementById("game-alert").innerHTML = gameAlert;

    document.getElementById("wins").innerHTML = wins;

    document.getElementById("guess-number").innerHTML = guessNumber;
   
    document.getElementById("game").innerHTML = game;
   
    var lettersGuessedDisplay = "";
    for (var i = 0; i < lettersGuessed.length; i++) {
        lettersGuessedDisplay = lettersGuessedDisplay + lettersGuessed[i] + ", ";
    }
    document.getElementById("letters-guessed").innerHTML = lettersGuessedDisplay;
 }

 function setCharAt(str, index, chr) {
    if (index > str.length-1) {
        return str;
    }

    return str.substr(0, index) + chr + str.substr(index + 1);
}

function newPuzzle() {
    guessNumber = 10;
    lettersGuessed = [];
    gameAlert = "";
    gameOver = false;
    game = "";

    $.stopSound();

    document.getElementById("winning-image").src = "";

    var puzzleNumber = Math.floor(Math.random() * ((puzzles.length - 1) - 0));
    solution = puzzles[puzzleNumber].toLowerCase();

    winningImage = puzzleImages[puzzleNumber];
    winningSong = songs[puzzleNumber];

    for (var i = 0; i < solution.length; i++) {
        if (letters.indexOf(solution[i]) !== -1) {
            game = game + "_";
        }

        if (solution[i] === " ") {
            game = game + " ";
        }
    }
}

document.getElementById("new-puzzle").onclick = function() {
    newPuzzle();
    updateGameState();
}