// Variables related to elements in DOM
var scoresButton = document.querySelector("#scores-button");
var startButton = document.querySelector("#start-button");
var submitButton = document.querySelector("#submit-button");
var button1 = document.querySelector("#button-1");
var button2 = document.querySelector("#button-2");
var button3 = document.querySelector("#button-3");
var button4 = document.querySelector("#button-4");

var starterInfo = document.querySelector("#starter-info");
var quizQuestions = document.querySelector("#quiz-questions");
var endInfo = document.querySelector("#end-info");

var questionText = document.querySelector("#question-text");
var choice1 = document.querySelector("#choice-1");
var choice2 = document.querySelector("#choice-2");
var choice3 = document.querySelector("#choice-3");
var choice4 = document.querySelector("#choice-4");

var finalScore = document.querySelector("#final-score");
var initials = document.querySelector("#initials");
var timeLeft = document.querySelector("#time-left");



// sound effects

var soundCorrect = new Audio("./assets/sfx/correct3-95630.mp3");
var soundWrong = new Audio("./assets/sfx/wrong-answer-126515.mp3");



// When the player presses High Scores button - the high scores are displayed underneath.

var questionsLeft = 5;


// When the player presses start button the quiz starts 
function init() {
    // the question is displayed
    nextQuestion();
    // and the timer starts running
    startTimer();
    // disable high scores button
    scoresButton.disabled = true;
}



function nextQuestion() {
    // and the starter-info is hidden from view
    starterInfo.setAttribute("style", "display: none");
    quizQuestions.setAttribute("style", "display: block");
    endInfo.setAttribute("style", "display: none");

    // and the first question is displayed 
    var nextQ = questions[questionsLeft - 1];
    questionText.textContent = nextQ.question;
    choice1.textContent = nextQ.choices[0];
    choice2.textContent = nextQ.choices[1];
    choice3.textContent = nextQ.choices[2];
    choice4.textContent = nextQ.choices[3];

}




// When the player presses one of the choices button: event key and compares with the answer.
// if the choice is correct - next question

// if the choice is incorrect - next question and timer -15sec

// TIMER - is set to run for 75sec
var timerCount = 75;

// The time remaining in the timer becomes a high score
function startTimer() {
    var timer = setInterval(function() {
        timerCount--;
        timeLeft.textContent = timerCount;

        // When the questions are answered the timer stops and Game Over
        if(timerCount > 0 && questionsLeft > 0) {
            nextQuestion();
        } else {
            gameOver();
        }
        // When the timer finishes - Game Over
        if(timerCount <= 0) {
            gameOver();
            timerCount = 0;
        }
       
    }, 1000);

}

// GAME OVER:
// Display Game Over message 
// and info about the scorewith text-box to record player's name
function gameOver() {

}

// When the player presses submit button:
// Set high scores and save them in the local storage with the player's name
// Enable High Scores Button
// Reset the quiz-box to starter-info.


startButton.addEventListener("click", )