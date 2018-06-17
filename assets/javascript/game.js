var Alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var plansToHang = [
    "apple picking", "amusement park", "aquarium", "arson", "baking", "barbeque", "baseball", "basketball", "bird watching", "board games",
    "biking", "bookstore", "bon fire", "botanical gardens", "bowling", "brewery", "bungie jumping", "card games", "camping", "coffee shop",
    "cooking", "concert", "convention", "cow tipping", "dancing", "day spa", "dodgeball", "drinking", "dungeons and dragons", "escape the room",
    "fishing", "football", "golfing", "ice cream parlor", "haunted house", "hibachi", "hiking", "ice skating", "ikea", "lan party",
    "library", "mountain climbing", "movies", "museum", "music festival", "netflix and chill", "paintball", "painting", "petting zoo",
    "pinball arcade", "pizza parlor", "poker", "ren fair", "restaurant", "rock climbing", "rodeo show", "roller blading", "tea room", "the bar",
    "the beach", "the big game", "the city", "the mall", "the park", "the theater", "the zoo", "scavenger hunt", "scuba diving", "shopping",
    "skiing", "sky diving", "soccer", "softball", "stadium",
    //"staples", 
    "stargazing", "sushi bar", "swimming", "ultimate frisbee", "video games", "vineyard", "volleyball", "water park", "whale watching",
    "wine festival"
];
var previousEngagment = [
    "all work and no play makes Jack a very dull boy.", "at home with books",
    "avoiding humans", "baby shower", "babysitting",
    "bachelor party", "bachelorette party",
    "balance checkbook",
    "bail Armand out", "binge watching on Netflix", "bingo", "birthday party", "bloodwork", "book club",
    "bar mitzvah", "buy supplies", "buy more post-it notes",
    "call credit card company", "browsing click bait",
    "communion party", "conference", "crossword puzzles", "debugging", "DMV", "drive Armand home (again)",
    "clean house", "community service", "commission work", "coding class",
    "cooking class", "clean house", "cloud-watching", "cook for family", "court date",
    "CRY", "doctor's appointment", "daydreaming",
    "dog-sitting",
    "existential crsis", "exterminator", "family party", "finiSh FaceBook aRguMent",
    "fasting", "food poisoning", "freelance work",
    "fundraiser", "funeral", "gardening", "get car fixed",
    "get laptop fixed", "lost keys", "lost track of time", "give speech",
    "go over finances", "goldfish funeral", "got lost in wikipedia", "graduation party",
    "help Armand get over break-up (again)", "help Armand pack (again)",
    "help dad", "help mom", "holiday", "homework",
    "house-sitting", "hungover", "interview",
    "jury duty", "knitting", "laundry", "lounging", "mental health day", "migraine",
    "on hold with insurance company",
    "overtime", "pack", "plan perfect heist", "played hangman all day", "plumbing disaster",
    "public speaking class", "quinceanera", "re-paint the house", "reevaluate priorities",
    "research", "resolve identity theft", "run marathon", "seminar", "sick day",
    "sleep forever", "solitaire", "solve rubix cube", "spanish class", "so many errands!", "taxes",
    "therapy", "vet appointment",
    "video games all day", "visit grandparents",
    "volunteer work", "wallow", "watch paint dry", "wedding", "what did I even do today???",
    "where did the time go?",
    "work", "work, work", "working forever", "workshop", "buried in work",
    "work out", "work on novel", "yard work", "yoga class"
];

function pickPreviousEngagement() {
    pickPlans = previousEngagment[Math.floor(Math.random() * previousEngagment.length)];
    if (schedule.indexOf(pickPlans) === -1) {
        return pickPlans;
    }
    else {
        pickPreviousEngagement();
    }
};


var mysteryWord = undefined;
var prevMysteryWord = [];
var userGuess = undefined;
var letterSlots = [];
var userGuessArray = [];

var wins = 0;
var losses = 0;
var remainingGuesses = 7;
var schedule = [];
var gameOver = false;

var message = " ";
var daysOfWeek = ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"]


function getNewMysteryWord() {
    mysteryWord = plansToHang[Math.floor(Math.random() * plansToHang.length)];
    if (prevMysteryWord.indexOf(mysteryWord) === -1) {
        prevMysteryWord.push(mysteryWord);
        return mysteryWord;
    }
    else {
        getNewMysteryWord();
    }
}





//The Game

function startNewGame() {

    getNewMysteryWord();
    if (prevMysteryWord.length > 20) {
        prevMysteryWord.shift();
    }

    for (var i = 0; i < mysteryWord.length; i++) {
        if (Alphabet.indexOf(mysteryWord[i]) > -1) {
            letterSlots[i] = "_";
        }
        else {
            letterSlots[i] = "&nbsp;";
        }
    }

    document.onkeyup = function (event) {
        var userGuess = event.key.toLowerCase();
        if (gameOver === false) {
            message = " ";

            if (Alphabet.indexOf(userGuess) != -1) {
                if ((userGuessArray.indexOf(userGuess) === -1) && (letterSlots.indexOf(userGuess) === -1)) {
                    //console.log("My letter: " + userGuess);

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
                                    message = "<p>Your social life is dead. :( <br/><br/> Press ENTER to play again.</p>"
                                    gameOver = true;
                                }
                            }
                        }
                    }
                    if ((letterSlots.indexOf("_") === -1) && (gameOver === false)) {
                        wins++;
                        message = "<p>Success! <br/><br/> Press ENTER to play again.</p>"
                        gameOver = true;
                        schedule.push(mysteryWord + "!");
                    }
                } else {
                    message = "<p> ! You already guessed that letter. </p>".fontcolor("#d30000");
                }
            }
            else {
                message = "<p> ! Use a letter key. </p>".fontcolor("#d30000");
            }
        }
    }
}





//begin
addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        remainingGuesses = 7;
        userGuessArray = [];
        letterSlots = [];
        schedule = [];
        message = " ";
        gameOver = false;
        clearCal();
        startNewGame();
    }

    //change html
    var guesseshtml = "<h2>List of No-Gos</h2> <br/> <span>" + userGuessArray.join(" ") + "</span>";
    var winshtml = "<h2>Wins:</h2> " + wins;
    var losseshtml = "<h2>Losses:</h2> " + losses;
    var messagehtml = message;
    var letterSlotshtml = letterSlots.join(" ");

    //what goes where
    document.querySelector("#game-space").innerHTML = letterSlotshtml;
    document.querySelector("#message").innerHTML = messagehtml;
    document.querySelector("#guesses").innerHTML = guesseshtml;
    document.querySelector("#wins").innerHTML = winshtml;
    document.querySelector("#losses").innerHTML = losseshtml;

    // print schedule on calendar
    for (var p = 0; p < schedule.length; p++) {
        var calCell = document.getElementById(daysOfWeek[p]);
        if (daysOfWeek[p] === daysOfWeek[p]) {
            calCell.innerHTML = "<p>" + schedule[p] + "</p>";
        }
    }

    //clear calendar
    function clearCal() {
        for (var p = 0; p < remainingGuesses; p++) {
            var calCell = document.getElementById(daysOfWeek[p]);
            calCell.innerHTML = "";
        }
    }

});


