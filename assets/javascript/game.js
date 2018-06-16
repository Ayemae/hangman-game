var Alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var plansToHang = [
    "apple picking", "amusement park", "aquarium", "arson", "baking", "barbeque", "bird watching", "board games", "biking", "bookstore",
    "bon fire", "botanical gardens", "bowling", "brewery", "bungie jumping", "camping", "coffee shop", "cooking",
    "concert", "convention", "cow tipping", "dancing", "day spa", "dodgeball", "dungeons and dragons", "escape the room",
    "fishing", "golfing", "ice cream parlor", "haunted house", "hibachi", "hiking", "ikea", "lan party", "library", "museum",
    "music festival", "netflix and chill", "paintball", "petting zoo", "pinball arcade", "pizza parlor", "poker", "ren fair",
    "restaurant", "rock climbing", "roller blading", "tea room", "the bar", "the beach", "the city", "the mall", "the movies", "the park",
    "the zoo", "scavenger hunt", "scuba diving", "shopping", "skiing", "staples", "sushi bar", "swimming", "ultimate frisbee",
    "video games", "water park", "whale watching", "wine festival",
];
var previousEngagment = [
    "all work and no play makes Jack a very dull boy.", "at home with books",
     "avoiding humans", "baby shower", "babysitting",
     "bachelor party", "bachelorette party", 
    "balance checkbook",
    "bail Armand out", "binge watching on Netflix", "bingo", "birthday party", "bloodwork", "book club",
     "bar mitzvah", "buy supplies", "buy more post-it notes",
     "call credit card company", 
    "communion party", "crossword puzzles", "debugging", "DMV", "drive Armand home (again)",
    "clean house", "community service", "commission work", "coding class",
     "cooking class", "clean house", "cook for family",
     "CRY", "doctor's appointment", 
    "dog-sitting", "overtime", "court date",
    "existential crsis", "extermintor", "family party", "finiSh FaceBook aRguMent",
     "food poinsoning", "freelance work",
     "fundraiser", "funeral", "get car fixed", 
    "get laptop fixed", "lost track of time", "give speech",
    "go over finances", "goldfish funeral", "graduation party", "help Armand get over break-up (again)",
     "help Armand pack (again)",
     "help dad", "help mom", "homework", 
    "house-sitting", "hungover", "interview",
    "jury duty", "knitting", "laundry", "mental health day", "migraine", "on hold with insurance company",
     "pack", "plan perfect heist", "plumbing disaster", "public speaking class",
     "quinceanera", "research", 
    "resolve identity theft", "seminar", "sick day",
    "sleep forever", "solitaire", "spanish class", "so many errands!", "taxes",
     "therapy", "vet appointment",
     "video games all day", "visit grandparents", 
    "volunteer work", "wallow", "wedding", "what did I even do today???",
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
        if (gameOver === false) {
            message = " ";

            if (Alphabet.indexOf(userGuess) != -1) {
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






addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
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

            var guesseshtml = "<h2>List of No-Gos</h2> <br/> <span>" + userGuessArray.join(" ") + "</span>";

            var winshtml = "<h2>Wins:</h2> " + wins;
            var losseshtml = "<h2>Losses:</h2> " + losses;

            console.log(schedule);


            var messagehtml = message;

            var letterSlotshtml = letterSlots.join(" ");
            document.querySelector("#game-space").innerHTML = letterSlotshtml;


            document.querySelector("#message").innerHTML = messagehtml;
            document.querySelector("#guesses").innerHTML = guesseshtml;
            document.querySelector("#wins").innerHTML = winshtml;
            document.querySelector("#losses").innerHTML = losseshtml;


            for (var p = 0; p < schedule.length; p++) {
                var calCell = document.getElementById(daysOfWeek[p]);
                if (daysOfWeek[p] === daysOfWeek[p]) {
                    calCell.innerHTML = "<p>" + schedule[p] + "</p>";
                }
            }

            function clearCal() {
                for (var p = 0; p < remainingGuesses; p++) {
                    var calCell = document.getElementById(daysOfWeek[p]);
                        calCell.innerHTML = "";
                }
            }

        });
    }
});


