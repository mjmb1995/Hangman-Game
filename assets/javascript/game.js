(function() {
    "use strict";

    // this hides the word bank from global scope
    function wordSelector() {
        var wordBank = ["wormwood", "lady macbeth", "dunkirk", "marjorie prime", "columbus", "okja", "phantom thread", "good time"];

        return function() {
            var wordSelected = wordBank[Math.floor(Math.random() * wordBank.length)];
            return wordSelected;
        };
    }

    function updateWin() {
  		var wins = 0;

  		return function () {
    	wins++;
    	document.getElementById("playWin").innerHTML = "Congratulations";
        document.getElementById("scores").innerHTML = "You have won: " + wins + " times";
  		}
	}
	var playerWon = updateWin();

    document.getElementById("start").onclick = function() {
        var gameEnded = false;
        //user starts with 6 lives
        var lives = 6;

        var pickWord = wordSelector();
        var word = pickWord();

        // array of letters that make the selected movie title
        var wordLetters = [];

        // this is what the player will see
        var letterBlanks = [];
        var letterBlanksUI = "";

        // letters that have been used
        var usedLetters = [];
        var usedLettersUI = "";

        // warnings for invalid user input
        var warning = "";

        // fills the values of the wordLetters and letterBlanks
        for (var i = 0; i < word.length; i++) {
            wordLetters.push(word[i]);
            letterBlanks.push("_");
        }

        //checks for space value in the wordLetters array
        if (wordLetters.indexOf(" ") !== -1) {
            //looking for the index of the letter in the word
            for (var k = 0; k < wordLetters.length; k++) {
                //removes the blank space for the "spaces"
                if (" " === wordLetters[k]) {
                    letterBlanks[k] = " ";
                }
            }
        }

        // creates initial blanks for user to solve
        for (var i = 0; i < letterBlanks.length; i++) {
            letterBlanksUI += " " + letterBlanks[i];
        }
        document.getElementById("mysteryWord").innerHTML = letterBlanksUI;
        document.getElementById("used").innerHTML = usedLettersUI;
        document.getElementById("warn").innerHTML = warning;
        document.getElementById("live").innerHTML = lives;


        //user can now start guessing
        document.onkeyup = function(event) {
            if (gameEnded === false) {
            	document.getElementById("warn").innerHTML = " ";
                //user guess is now lower case
                var userGuess = event.key.toLowerCase();

                var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

                // user guess needs to be a letter and not already used
                if (letters.indexOf(userGuess) !== -1 && usedLetters.indexOf(userGuess) === -1) {
                    usedLetters.push(userGuess);

                    //updating the used letters section on web page for user
                    usedLettersUI += " " + userGuess;
                    document.getElementById("used").innerHTML = usedLettersUI;


                    // checking user input against letters in word
                    if (wordLetters.indexOf(userGuess) !== -1) {

                        //looking for the index of the letter in the word
                        for (var j = 0; j < wordLetters.length; j++) {

                            if (userGuess === wordLetters[j]) {
                                letterBlanks[j] = userGuess;

                                //if letterBlanks does have any _ then user wins
                                if (letterBlanks.indexOf("_") === -1) {
                                    gameEnded = true;
                                    playerWon();                          
                                }
                            }
                        }

                        //updates the web page with correct letters of the word
                        letterBlanksUI = "";
                        for (var i = 0; i < letterBlanks.length; i++) {
                            letterBlanksUI += " " + letterBlanks[i];
                        }
                        document.getElementById("mysteryWord").innerHTML = letterBlanksUI;

                    } else {
                        lives--;
                        document.getElementById("live").innerHTML = lives;
                        document.getElementById("warn").innerHTML = "Letter is not in the movie title. Minus 1 life..";

                        //if lives = 0 then game over
                        if (lives === 0) {
                            gameEnded = true;
                            document.getElementById("warn").innerHTML = "You lost.. The movie title was: " + word;
                        }
                    }

                    // user pressed a non-letter character
                } else {
                    document.getElementById("warn").innerHTML = "This is not a letter or you have already used it this game";
                }
            }
        }
    }
}());