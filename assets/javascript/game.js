var Alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var placesToHang = [
    "a back alley", "amusement park", "aquarium", "barbeque", "bird watching", "bookstore", "bon fire", "brewery", "camping",
    "coffee shop", "convention", "cow tipping", "fishing", "ice cream parlor", "hibachi", "hiking", "ikea",
    "lan party", "museum", "music festival", "my place", "petting zoo", "pinball arcade", "pizza parlor",
    "ren fair", "restaurant", "tea room", "the beach", "the city", "the local bar", "the mall",
    "the movies", "the park", "the zoo", "scavenger hunt", "shopping", "staples", "sushi bar", "water park",
    "whale watching", "your place"
];
var mysteryWord = undefined;
var userGuess = undefined;
var letterSlots = [];

var wins = 0;
var losses = 0;
var remainingGuesses = 7;
var userGuessArray = [];

var errorMessage = " ";
var outcomeMessage = " ";

function gameClear() {
    remainingGuesses = 7;
    userGuessArray = [];
    letterSlots = [];
    startNewGame();
};


function startNewGame() {

    var mysteryWord = placesToHang[Math.floor(Math.random() * placesToHang.length)]

    for (var i = 0; i < mysteryWord.length; i++) {
        if (Alphabet.indexOf(mysteryWord[i]) > -1) {
            letterSlots[i] = "_";
        }
        else {
            letterSlots[i] = "&nbsp;";
        }
    }


    console.log("Computer's word: " + mysteryWord);
    console.log(letterSlots);



    document.onkeyup = function (event) {
        var userGuess = event.key.toLowerCase();

        if (Alphabet.indexOf(userGuess) != -1) {
            if (userGuessArray.indexOf(userGuess) === -1) {
                console.log("My letter: " + userGuess);

                if (mysteryWord.indexOf(userGuess) === -1) {
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
                    wins++;
                    outcomeMessage = "Success! <br/> Press ENTER to play again."
                }

                if (remainingGuesses === 0) {
                    losses++;
                    for (var k = 0; k < letterSlots.length; k++) {
                        if (letterSlots[k] == "_") {
                            letterSlots[k] = mysteryWord[k].fontcolor("#aaaaaa");
                        }
                        outcomeMessage = "Your social life is dead. :( <br/> Press ENTER to play again."
                    }
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
                remainingGuesses = 7;
                userGuessArray = [];
                letterSlots = [];
                outcomeMessage = " ";
                startNewGame();
            }

            var guesseshtml = "<p> Your Guesses <br/> <span>" + userGuessArray.join(" ") + "</span> </p>";

            var statshtml =
                "<p>Wins: " + wins + "</p>" +
                "<p>Losses: " + losses + "</p>" +
                "<p>Remaining Guesses: " + remainingGuesses + "</p>";


            var outcomehtml = outcomeMessage;

            var errorhtml = errorMessage;

            var letterSlotshtml = letterSlots.join(" ");
            document.querySelector("#game-space").innerHTML = letterSlotshtml;

            document.querySelector("#outcome").innerHTML = outcomehtml;
            document.querySelector("#guesses").innerHTML = guesseshtml;
            document.querySelector("#game").innerHTML = statshtml;
            document.querySelector("#error").innerHTML = errorhtml;

        });
    }
});


