var Alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var placesToHang = [
    "amusement park", "bird watching", "bookstore", "bon fire", "brewery", "camping",
    "coffee shop", "convention", "fishing", "ice cream parlor", "hiking", "ikea",
    "lan party", "music festival", "my place", "pinball arcade", "pizza parlor",
    "ren fair", "restaurant", "the beach", "the city", "the local bar", "the mall",
    "the movies", "staples", "sushi bar", "your place"
];
var mysteryWord = undefined;
var userGuess = undefined;
var letterSlots = [];

var wins = 0;
var losses = 0;
var remainingGuesses = 7;
var userGuessArray = [];

var errorMessage = " ";


function startNewGame() {
    var mysteryWord = placesToHang[Math.floor(Math.random() * placesToHang.length)]
    
    for (var i = 0; i < mysteryWord.length; i++) {
        letterSlots[i] = "_";
    }
    var letterSlotshtml = letterSlots.join(".");
    document.querySelector("#game-space").innerHTML = letterSlotshtml;

    console.log("Computer's word: " + mysteryWord);
    console.log(letterSlots);



    document.onkeyup = function (event) {
        var userGuess = event.key.toLowerCase();

        if (Alphabet.indexOf(userGuess) != -1) {
            if (userGuessArray.indexOf(userGuess) === -1) {
                console.log("My letter: " + userGuess);

                if (mysteryWord.indexOf(userGuess) == -1) {
                    remainingGuesses--;
                    userGuessArray.push(userGuess);
                }

                else {
                    for (var j = 0; j < mysteryWord.length; j++) {
                        if (mysteryWord[j] === userGuess) {
                            letterSlots[j] = userGuess;
                        }
                    }
                }

                if (letterSlots.indexOf("_") === -1) {
                    //wins++;
                    //remainingGuesses = 7;
                    //userGuessArray = [];
                    //startNewGame();
                }

                if (remainingGuesses === 0) {
                    losses++;
                    remainingGuesses = 7;
                    userGuessArray = [];
                    //startNewGame();
                }
            } else {
                errorMessage = "<p> ! You already guessed that letter. </p>";
            }
        }
        else {
            errorMessage = "<p> ! Use a letter key. </p>";
        }
    }
}







addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                    console.log("lol")
                 startNewGame();
            }

            var guesseshtml = "<p> Your Guesses <br/> <span>" + userGuessArray.join(" ") + "</span> </p>";

            var statshtml =
                "<p>Wins: " + wins + "</p>" +
                "<p>Losses: " + losses + "</p>" +
                "<p>Remaining Guesses: " + remainingGuesses + "</p>";

            var errorhtml = errorMessage;

            document.querySelector("#guesses").innerHTML = guesseshtml;
            document.querySelector("#game").innerHTML = statshtml;
            document.querySelector("#error").innerHTML = errorhtml;

        });
    }
});


