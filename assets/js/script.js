//  QUESTIONS
var question;
var choices;
var answer;
var questions = [
    {
      question: "What's the most outer element in CSS Box Model?",
      choices: ["content", "margin", "border", "padding"],
      answer: "margin",
    },
    {
      question: "In JAvaScript OBJECTS store collections of:",
      choices: ["events", "alerts", "comments", "properties"],
      answer: "properties",
    },
    {
      question: "Which part of HTML is METADATA stored in?",
      choices: [
        "<head> element",
        "<body> element",
        "<footer> element",
        "<div> element",
      ],
      answer: "<head> element",
    },
    {
      question:
        "Which statement about JavaScript is correct?",
      choices: [
        "Operators are mathematical symbols.", 
        "JavaScript is case sensitive.", 
        "Functions can be reused.", 
        "All of the above."],
      answer: "All of the above.",
    },
    {
      question:
        "Period symbol '.' preceding a CSS selector means that the selector is:",
      choices: ["a class", "a global selector", "an id", "not valid"],
      answer: "a class",
    },
  ];

// VARIABLES

// Variables related to elements in DOM
var scoresButton = document.querySelector("#scores-button");
var startButton = document.querySelector("#start-button");
var submitButton = document.querySelector("#submit-button");
var clearButton = document.querySelector("#clear-scores");

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
var highScoresList = document.getElementById("high-scores")

// sound effects

var soundCorrect = new Audio("./assets/sfx/correct3-95630.mp3");
var soundWrong = new Audio("./assets/sfx/wrong-answer-126515.mp3");

// Other variables

var questionsLeft = questions.length;
var nextQ = questions[questionsLeft - 1];
var numberOfScores;
var highScores = [];

// timer related - is set to allow 15 sec for each question.
var timer;
var timerCount = questions.length *15;

// Enable High Scores Button
scoresButton.disabled = false;

// INITIAL FUNCTIONS

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
    questionsLeft--;
    nextQ = questions[questionsLeft];
    // and the first question is displayed 
    console.log(nextQ.answer);
    questionText.textContent = nextQ.question;
    choice1.textContent = nextQ.choices[0];
    choice2.textContent = nextQ.choices[1];
    choice3.textContent = nextQ.choices[2];
    choice4.textContent = nextQ.choices[3];
    

}

// QUIZ LOGIC FUNTIONS

// When the player presses one of the choices button: event key and compares with the answer.
function selectAnswer(event) {
    var chosenButton = event.target;
    console.log(chosenButton);

    var chosenAnswer = chosenButton.textContent;
    console.log(chosenAnswer);

    // if the choice is correct - next question
    if (chosenAnswer === nextQ.answer) {
        soundCorrect.play();
    } 
    // if the choice is incorrect - next question and timer -15sec
    if (chosenAnswer != nextQ.answer){
        soundWrong.play();
        timerCount -= 15;
        if (timerCount < 0){
          timerCount = 0;
        }
        timeLeft.textContent = timerCount;
    }
  
    // When the questions are answered the timer stops and Game Over
    if(questionsLeft == 0) {
        clearInterval(timer);
        gameOver();
    }  
    if(questionsLeft != 0){
       
        nextQuestion();
    }
}


// The time remaining in the timer becomes a high score
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timeLeft.textContent = timerCount;

         
        // When the timer finishes - Game Over
        if(timerCount <= 0) {
            
            clearInterval(timer);
            timerCount = 0;
            timeLeft.textContent = timerCount;
            gameOver();
        }
       
    }, 1000);

}

// GAME OVER:

function gameOver() {
    // Display Game Over message
    starterInfo.setAttribute("style", "display: none");
    quizQuestions.setAttribute("style", "display: none");
    endInfo.setAttribute("style", "display: block");

    // and info about the scorewith text-box to record player's name
    finalScore.textContent = timerCount;
    
    // Enabling the Submit button to record the score.
    submitButton.disabled = false;

}

// HIGH SCORES RELATED FUNTIONS
// Some elements of solution for recording high scores sourced from https://michael-karen.medium.com/how-to-save-high-scores-in-local-storage-7860baca9d68

function saveScore(event) {
    
    // Filling the array highScores with the previous scores or setting it as an empty array if there was no previous scores saved.
    var highScores = JSON.parse(window.localStorage.getItem("highScores")) ?? [];
    
    if (initials === "") {
      alert("You have to enter at least one letter for your initial!"); 
      return
    }
   
    // Seting high scores and players initials in an object;
    var personalScore = {
        score: timerCount,
        initials: initials.value.trim(),
    };

     // Adding the object to the scores list
    highScores.push(personalScore);

    // Saving to the local storage
    window.localStorage.setItem("highScores", JSON.stringify(highScores));

    // Enabling High Scores Button
    scoresButton.disabled = false;

    // Once the score is submitted the button gets disabled to prevent saving the score twice
    submitButton.disabled = true;

}

function getHighScores () {
    // The scores are retrieved from the local storage setting it as an empty array if there was no previous scores saved.
    highScores = JSON.parse(localStorage.getItem("highScores")) ?? [];
    
    // Terminate the function of the array is empty.
    if (highScores.length === 0){
      return
    }
    
    //  the high scores are displayed underneath is a form of an unordered list.
    for(var i =0; i < highScores.length; i++) {
      
      var tag = document.createElement("li");
      highScoresList.appendChild(tag);
      tag.textContent = "Player: " + highScores[i].initials + " - " + highScores[i].score;

    }
}

function clearScores() {
    // Removing saved scores from the local storage
    window.localStorage.removeItem("highScores");
    // And reloading the page;
    window.location.reload();
}


// When user presses start button:
startButton.addEventListener("click", init);

// When user presses one of the answer buttons:
possibleAnswers.addEventListener("click",selectAnswer);

// When the player presses submit button:
submitButton.addEventListener("click", saveScore);


// When the player presses High Scores button:
scoresButton.addEventListener("click", getHighScores);

// When the player presses Clear Scores button:
clearButton.addEventListener("click", clearScores);