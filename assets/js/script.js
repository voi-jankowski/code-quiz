// Variables related to elements in DOM
var scoresButton = document.querySelector("#scores-button");
var startButton = document.querySelector("#start-button");
var submitButton = document.querySelector("#submit-button");


var starterInfo = document.querySelector("#starter-info");
var quizQuestions = document.querySelector("#quiz-questions");
var endInfo = document.querySelector("#end-info");

var questionText = document.querySelector("#question-text");
var possibleAnswers = document.querySelector("#choices");
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


// The solution for recording high scores sourced from https://michael-karen.medium.com/how-to-save-high-scores-in-local-storage-7860baca9d68
// When the player presses High Scores button - the high scores are displayed underneath.
var numberOfScores = 10;
var highScores;
var lowestScore = highScores[numberOfScores - 1]?.score ?? 0;
scoresButton.disabled = false;

scoresButton.addEventListener("click", function(){
    var highScores = JSON.parse(localStorage.getItem("highScores")) ?? [];


    for ()
})


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
    
    questionText.textContent = nextQ.question;
    choice1.textContent = nextQ.choices[0];
    choice2.textContent = nextQ.choices[1];
    choice3.textContent = nextQ.choices[2];
    choice4.textContent = nextQ.choices[3];

    possibleAnswers.addEventListener("click", selectAnswer);

}


var questionsLeft = 5;
var nextQ = questions[questionsLeft - 1];

// When the player presses one of the choices button: event key and compares with the answer.
function selectAnswer(event) {
    var chosenButton = event.target;
    var chosenAnswer = document.querySelector(chosenButton).children[0];
    console.log(chosenAnswer);
        // if the choice is correct - next question
    if (chosenAnswer === nextQ.answer) {
        soundCorrect.play();
        questionsLeft--;
        nextQuestion();
        // if the choice is incorrect - next question and timer -15sec
    } else {
        soundWrong.play();
        questionsLeft--;
        timerCount -= 15;
        nextQuestion();

    }
}





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

function gameOver() {
    starterInfo.setAttribute("style", "display: none");
    quizQuestions.setAttribute("style", "display: none");
    endInfo.setAttribute("style", "display: block");

    // and info about the scorewith text-box to record player's name
    finalScore.textContent = timerCount;
}

// When the player presses submit button:
submitButton.addEventListener("click", saveScore());

function saveScore(event) {
    event.preventDefault();
    // Set high scores and save them in the local storage with the player's name
    var personalScore = {
        initials: initials.value.trim(),
        score: finalScore
    }
     // 1. Add to list
    highScores.push(personalScore);

  // 2. Sort the list
    highScores.sort((a, b) => b.score - a.score);
  
  // 3. Select new list
   highScores.splice(NO_OF_HIGH_SCORES);
  
  // 4. Save to local storage
   localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
};

    localStorage.setItem("highScores", JSON.stringify(personalScore));

    // Enable High Scores Button
    scoresButton.disabled = false;

    // Reset the quiz-box to starter-info.
    location.reload();
}
     




startButton.addEventListener("click", init);



