var Alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var plansToHang = [
    "apple picking", "amusement park", "aquarium", "arson", "baking", "barbeque", "bird watching", "board games", "bookstore", 
    "bon fire", "botanical gardens", "bowling", "brewery", "bungie jumping", "camping", "coffee shop", "cooking",
    "concert", "convention", "cow tipping", "dancing", "day spa", "dodgeball", "dungeons and dragons", "escape the room", 
    "fishing", "golfing", "ice cream parlor", "haunted house", "hibachi", "hiking", "ikea", "lan party", "library", "museum", 
    "music festival", "netflix and chill", "paintball", "petting zoo", "pinball arcade", "pizza parlor", "ren fair", 
    "restaurant", "rock climbing", "tea room", "the bar", "the beach", "the city", "the mall", "the movies", "the park", 
    "the zoo", "scavenger hunt", "scuba diving", "shopping", "skiing", "staples", "sushi bar", "swimming", "ultimate frisbee", 
    "video games", "water park", "whale watching", "wine festival", "yoga class"
];
var previousEngagment = [
    "avoiding humans", "balance checkbook", "book club", "debugging", "dinner at grandma's", "coding class", "cooking class", 
    "clean house", "cook for family", "CRY", "doctor's appointment", "overtime", "court date", "extermintor", "finish FaceBook aRgument", 
    "get car fixed", "get laptop fixed", "give speech", "goldfish funeral", "homework", "hungover", "interview", "jury duty", "knitting", 
    "laundry", "mental health day", "migraine", "pack", "sick day", "sleep forever", "spanish class", "so many errands!", "taekwondo", 
    "taxes", "therapy", "vet appointment", "video games all day", "wallow", "wedding", "work out", "yard work"
];

var busyArrays = [previousEngagment, plansToHang];

function pickPreviousEngagement() {
    whichBusyArray = busyArrays[Math.floor(Math.random() * busyArrays.length)];
    pickPlans = whichBusyArray[Math.floor(Math.random() * whichBusyArray.length)];
    if ((pickPlans != mysteryWord) && (schedule.indexOf(pickPlans) === -1)) {
        return pickPlans;}
    else {
        pickPreviousEngagement();
    }
};


var mysteryWord = undefined;
var userGuess = undefined;
var letterSlots = [];
var userGuessArray = [];

var wins = 0;
var losses = 0;
var remainingGuesses = 7;
var schedule = [];
var gameLost = false;

var errorMessage = " ";
var outcomeMessage = " ";


function startNewGame() {

    var mysteryWord = plansToHang[Math.floor(Math.random() * plansToHang.length)]

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
        errorMessage = " ";

        if ((gameLost === false) && (Alphabet.indexOf(userGuess) != -1)) {
            if ((userGuessArray.indexOf(userGuess) === -1) && (letterSlots.indexOf(userGuess) === -1)) {
                console.log("My letter: " + userGuess);

                if (mysteryWord.indexOf(userGuess) === -1) {
                    remainingGuesses--;
                    userGuessArray.push(userGuess);
                    pickPreviousEngagement();
                    schedule.push(pickPlans);
                }

                else {
                    for (var j = 0; j < mysteryWord.length; j++) {
                        if (mysteryWord[j] === userGuess) {
                            letterSlots[j] = userGuess;
                        }
                    }
                }

                if (remainingGuesses === 0) {
                    for (var k = 0; k < letterSlots.length; k++) {
                        if (letterSlots[k] == "_") {
                            letterSlots[k] = mysteryWord[k].fontcolor("#bbbbbb");
                            if (letterSlots.indexOf("_") === -1) {
                                losses++;
                                outcomeMessage = "Your social life is dead. :( <br/> Press ENTER to play again."
                                gameLost = true;
                            }
                        }
                    }
                }
                if ((letterSlots.indexOf("_") === -1) && (gameLost === false)) {
                    wins++;
                    outcomeMessage = "Success! <br/> Press ENTER to play again."
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
                schedule = [];
                outcomeMessage = " ";
                gameLost = false;
                startNewGame();
            }

            var guesseshtml = "<p> Your Guesses <br/> <span>" + userGuessArray.join(" ") + "</span> </p>";

            var statshtml =
                "<p>Wins: " + wins + "</p>" +
                "<p>Losses: " + losses + "</p>" +
                "<p>Schedule: " + schedule.join(", ") + "</p>";

                console.log(schedule);


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


