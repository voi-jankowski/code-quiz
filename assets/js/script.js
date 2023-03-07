//  Questions
var question;
var choices;
var answer;
var questions = [
    {
      question: 'Commonly used data types DO NOT include:',
      choices: ['strings', 'booleans', 'alerts', 'numbers'],
      answer: 'alerts',
    },
    {
      question: 'The condition in an if / else statement is enclosed within ____.',
      choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
      answer: 'parentheses',
    },
    {
      question: 'Arrays in JavaScript can be used to store ____.',
      choices: [
        'numbers and strings',
        'other arrays',
        'booleans',
        'all of the above',
      ],
      answer: 'all of the above',
    },
    {
      question:
        'String values must be enclosed within ____ when being assigned to variables.',
      choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
      answer: 'quotes',
    },
    {
      question:
        'A very useful tool used during development and debugging for printing content to the debugger is:',
      choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
      answer: 'console.log',
    },
  ];


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
var hightScoreList = document.getElementById("highScores")



// sound effects

var soundCorrect = new Audio("./assets/sfx/correct3-95630.mp3");
var soundWrong = new Audio("./assets/sfx/wrong-answer-126515.mp3");

// Other variables

var questionsLeft = questions.length;
var nextQ = questions[questionsLeft - 1];
console.log(questionsLeft);
console.log(nextQ);

// TIMER - is set to allow 15 sec for each question.
var timer;
var timerCount = questions.length *15;
console.log(timerCount);

var numberOfScores;
var highScores = [];

scoresButton.disabled = false;




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
// Display Game Over message 

function gameOver() {
    starterInfo.setAttribute("style", "display: none");
    quizQuestions.setAttribute("style", "display: none");
    endInfo.setAttribute("style", "display: block");

    // and info about the scorewith text-box to record player's name
    finalScore.textContent = timerCount;

    
}

// The elements of solution for recording high scores sourced from https://michael-karen.medium.com/how-to-save-high-scores-in-local-storage-7860baca9d68

function saveScore(event) {
    
    // Fill the array highScores with the previous scores

    var previousScores = JSON.parse(localStorage.getItem("highScores"));
    if (previousScores !== null) {
        highScores.push(previousScores)
    };
   
    // Set high scores and save them in the local storage with the player's name
    var personalScore = {
        initials: initials.value.trim(),
        score: finalScore,
    };

     // Add to list
    highScores.push(personalScore);

    // Save to local storage

    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Enable High Scores Button
    scoresButton.disabled = false;

    // Reset the quiz-box to starter-info.
    // location.reload();
}
     



// When user presses start button:
startButton.addEventListener("click", init);

// When user presses one of the answer buttons:
possibleAnswers.addEventListener("click",selectAnswer);

// When the player presses submit button:
submitButton.addEventListener("click", saveScore);


// When the player presses High Scores button - the high scores are displayed underneath.
scoresButton.addEventListener("click", function(){
    highScores = JSON.parse(localStorage.getItem("highScores")) ?? [];

    highScores.sort((a, b) => b.score - a.score);
    
    for(var i =0; i < highScores.length; i++) {
        var tag = document.createElement("li");
        hightScoreList.appendChild(tag);
        tag.textContent = "Player: " + highScores[i].initials + " - " + highScores[i].score;
    }
})


