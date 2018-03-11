"use strict";

var pickWord = wordSelector();

// this hides the word bank from global scope
function wordSelector(){
	var wordBank = ["wormwood", "lady macbeth", "dunkirk", "marjorie prime", "columbus", "okja", "phantom thread", "good time"];

	return function(){
		var wordSelected = wordBank[Math.floor(Math.random() * wordBank.length)];
		 return wordSelected;
	}
}

document.getElementById("start").onclick = function() {
	var gameEnded = false;
	//user starts with 6 lives
	var lives = 6;

	var word = pickWord();

	// array of letters that make the selected movie title
	var wordLetters = [];

	// this is what the player will see
	var letterBlanks = [];

	// letters that have been used
	var usedLetters = [];

	// fills the values of the wordLetters and letterBlanks
	for (var i = 0; i < word.length; i++){
		wordLetters.push(word[i]);
		letterBlanks.push('_');
	}

	//remove after testing
	console.log(wordLetters);
	console.log(letterBlanks);

	//checks for space value in the wordLetters array
	if (wordLetters.indexOf(" ") !== -1) {
		//looking for the index of the letter in the word
		for (var k = 0; k < wordLetters.length; k++){
			//removes the blank space for the "spaces"
			if (" " === wordLetters[k]){
				letterBlanks[k] = " ";
				console.log(letterBlanks);
			}
		}
	}

	//user can now start guessing
	document.onkeyup = function(event){
		
		if (gameEnded === false){
			//user guess is now lower case
			var userGuess = event.key.toLowerCase();

			var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k,", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

			// user guess needs to be a letter and not already used
			if (letters.indexOf(userGuess) !== -1 && usedLetters.indexOf(userGuess) === -1) {
				console.log("This is a letter")
				usedLetters.push(userGuess);

				// checking user input against letters in word
				if (wordLetters.indexOf(userGuess) !== -1) {
					console.log("This letter is in the word");

					//looking for the index of the letter in the word
					for (var j = 0; j < wordLetters.length; j++){
						if (userGuess === wordLetters[j]){
							letterBlanks[j] = userGuess;
							console.log(letterBlanks);

							//if letterBlanks does have any _ then user wins
							if (letterBlanks.indexOf("_") === -1) {
								console.log("Congrats! You won!");
								gameEnded = true;
							}
						}
					}

				} else {
					console.log("That letter is not in the word");
					lives--;

					//if lives = 0 then game over
					if (lives === 0){
						console.log("You lost. Better Luck next time!");
						gameEnded = true;
					}
					
				}

			// user pressed a non-letter character	
			} else {
				console.log("This is not a letter or you have already used it this game!");
			}			
		}
	}
}




