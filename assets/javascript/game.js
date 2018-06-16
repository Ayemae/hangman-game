var Alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var plansToHang = [
    "apple picking", "amusement park", "aquarium", "arson", "baking", "barbeque", "bird watching", "board games", "bookstore",
    "bon fire", "botanical gardens", "bowling", "brewery", "bungie jumping", "camping", "coffee shop", "cooking",
    "concert", "convention", "cow tipping", "dancing", "day spa", "dodgeball", "dungeons and dragons", "escape the room",
    "fishing", "golfing", "ice cream parlor", "haunted house", "hibachi", "hiking", "ikea", "lan party", "library", "museum",
    "music festival", "netflix and chill", "paintball", "petting zoo", "pinball arcade", "pizza parlor", "ren fair",
    "restaurant", "rock climbing", "tea room", "the bar", "the beach", "the city", "the mall", "the movies", "the park",
    "the zoo", "scavenger hunt", "scuba diving", "shopping", "skiing", "staples", "sushi bar", "swimming", "ultimate frisbee",
    "video games", "water park", "whale watching", "wine festival",
];
var previousEngagment = [
    "all work and no play makes Jack a very dull boy.", "at home with books", "avoiding humans", "baby shower", "babysitting", "bachelor party", "bachelorette party", "balance checkbook",
    "bail Armando out", "bingo", "birthday party", "bloodwork", "book club", "bar mitzvah", "buy supplies", "call credit card company", "communion party", "debugging", "drive Armando home (again)",
    "clean house", "community service", "commission work", "coding class", "cooking class", "clean house", "cook for family", "CRY", "doctor's appointment", "dog-sitting", "overtime", "court date",
    "existential crsis", "extermintor", "finiSh FaceBook aRguMent", "food poinsoning", "freelance work", "fundraiser", "funeral", "get car fixed", "get laptop fixed", "lost track of time", "give speech",
    "go over finances", "goldfish funeral", "graduation party", "help Armando get over break-up (again)", "help Armando pack (again)", "help dad", "help mom", "homework", "house-sitting", "hungover", "interview",
    "jury duty", "knitting", "laundry", "mental health day", "migraine", "on hold with insurance company", "pack", "plan perfect heist", "quinceanera", "research", "resolve identity theft", "sick day",
    "sleep forever", "spanish class", "so many errands!", "taekwondo", "taxes", "therapy", "vet appointment", "video games all day", "visit grandparents", "volunteer work", "wallow",
    "wedding",
    "work", "work", "work", "work", "work", "work", "work", "work", "work",
    "work out", "work on novel", "yard work", "yoga class"
];

function pickPreviousEngagement() {
    pickPlans = previousEngagment[Math.floor(Math.random() * previousEngagment.length)];
    if ((pickPlans != mysteryWord) && (schedule.indexOf(pickPlans) === -1)) {
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
var gameLost = false;

var message = " ";


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
        if (gameLost === false) {
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
                                    message = "<p>Your social life is dead. :( <br/> Press ENTER to play again.</p>"
                                    gameLost = true;
                                }
                            }
                        }
                    }
                    if ((letterSlots.indexOf("_") === -1) && (gameLost === false)) {
                        wins++;
                        message = "<p>Success! <br/> Press ENTER to play again.</p>"
                    }
                } else {
                    message = "<p> ! You already guessed that letter. </p>";
                }
            }
            else {
                message = "<p> ! Use a letter key. </p>";
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
                gameLost = false;
                startNewGame();
            }

            var guesseshtml = "<h2>Your Guesses</h2> <br/> <span>" + userGuessArray.join(" ") + "</span>";

            var statshtml =
                //"<h2>Schedule:</h2> " + schedule.join(", ") +
                "<h2>Wins:</h2> " + wins + " " +
                "<h2>Losses:</h2> " + losses + "</p>";

            console.log(schedule);


            var messagehtml = message;


            var letterSlotshtml = letterSlots.join(" ");
            document.querySelector("#game-space").innerHTML = letterSlotshtml;

            document.querySelector("#mon").innerHTML = "<p>" + schedule[0] + "</p>";
            document.querySelector("#tues").innerHTML = "<p>" + schedule[1] + "</p>";
            document.querySelector("#wed").innerHTML = "<p>" + schedule[2] + "</p>";
            document.querySelector("#thurs").innerHTML = "<p>" + schedule[3] + "</p>";
            document.querySelector("#fri").innerHTML = "<p>" + schedule[4] + "</p>";
            document.querySelector("#sat").innerHTML = "<p>" + schedule[5] + "</p>";
            document.querySelector("#sun").innerHTML = "<p>" + schedule[6] + "</p>";

            document.querySelector("#message").innerHTML = messagehtml;
            document.querySelector("#guesses").innerHTML = guesseshtml;
            document.querySelector("#stats").innerHTML = statshtml;

        });
    }
});


