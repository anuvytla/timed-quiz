var startBtn = document.querySelector("#start-btn");
var startPageEl = document.querySelector("#start-page");
var quizPageEl = document.querySelector("#quiz-page");
var resultPageEl = document.querySelector("#result-page");
var timeEl = document.querySelector("#timer");
var retakeEl = document.querySelector("#retake");
var questionEL = document.querySelector('#question');
var optionListEl = document.querySelector('#option-list');
var questionCounterEl =document.querySelector('#question-counter');
var nextEl = document.querySelector('#next');
var previousEl = document.querySelector('#previous');
var scoreEl = document.querySelector('#score');
var scoreFormEl = document.querySelector('#score-form');
var intialInputEl = document.querySelector('#intial');
var currentQuestionIndex = 0;
var intervalTimer;
var results;
var score;

retakeEl.addEventListener("click", retakeQuiz);

// Bind Start quiz to start button click event.
startBtn.addEventListener("click", startQuiz);

// Starts the quiz.
function startQuiz(){
    // Initialize results array with size of questions array. and fill with -1. -1 = unanswered.
    results = Array(questions.length).fill(-1);
    
    // hide start section and show quiz section.
    startPageEl.style.display = "none";
    quizPageEl.style.display = "flex";
    // Initialize question index to the first one (index 0).
    currentQuestionIndex = 0;
    // Display the current question.
    displayQuestion(currentQuestionIndex);
    // Start the quiz timer.
    startTimer();
}

// removes all children (i.e., list of options) of option list container.
function clearOptions() {
    while (optionListEl.firstChild) {
        optionListEl.removeChild(optionListEl.firstChild);
    }
}

function displayQuestion(questionIndex) {
 // Update question counter title.
    questionCounterEl.textContent = `Question ${questionIndex+1} of ${questions.length}`;

 // Update html to render question at questionIndex.
    var currentQuestion = questions[questionIndex];
    var questionText = currentQuestion['question'];
    var options = currentQuestion['options'];

    questionEL.textContent = questionText;
    // clear any existing options
    clearOptions();
    for (var i=0; i<options.length; i++) {
        // Create an li for each option.
        var optionEl = document.createElement("li");
        // store the index of the option as an attribute.
        optionEl.setAttribute('option-index', i);
        optionEl.textContent = options[i];
        // Add option to the ordered list (ol).
        optionListEl.appendChild(optionEl);
    }

    highlightCurrentOptions();
    // if index > 0 enable previous btn
    previousEl.disabled = !(questionIndex > 0);
}

function exitQuiz() {
    // re-direct to start page.
    retakeQuiz();

    // Stop the timer.
    clearInterval(intervalTimer);
}

function displayResults() {
    // Stop the timer.
    clearInterval(intervalTimer);

    // calculate score
    score = 0;
    for (var i=0; i<results.length; i++) {
        // check if recored answer matches with actual answer. if yes increment the score.
        if (results[i] === questions[i]['answer']) {
            score++
        }
    }
    // display score
    scoreEl.textContent = score;

    //  Navigate to result page 
    quizPageEl.style.display = "none";
    resultPageEl.style.display = "flex";
}

function startTimer() {
   // initialize timer 
   var secondsLeft = 10 * 60;
   // Initialize the timer to fire every 1 second.
   intervalTimer = setInterval(function(){
       secondsLeft--;

       // Calculate minutes and seconds remaining.
       var mins = Math.floor(secondsLeft/60);
       var secs = secondsLeft % 60;
       // Update timer display
       timeEl.textContent = `Time Remaining  ${mins}:${secs}`;

       // Stop the quiz and go to results page if we are out of time.
       if (secondsLeft === 0) {
           displayResults();
       }
   }, 1000);
}

nextEl.addEventListener('click' , onNext);

function onNext() {

    // increment index to next question.
    currentQuestionIndex++;
    // check if index withinrange, if yes display next question else display results.
    if (currentQuestionIndex >= questions.length) {
        displayResults();
    } else {
        displayQuestion(currentQuestionIndex);    
    }
}

previousEl.addEventListener('click', onPrevious);

function onPrevious() {
    if(currentQuestionIndex > 0) {
        // decrement index.
        currentQuestionIndex--;
        // Display question.
        displayQuestion(currentQuestionIndex);
    }
}

function retakeQuiz() {
    // Navigate to start page
    resultPageEl.style.display = "none";
    startPageEl.style.display = "flex";
}

optionListEl.addEventListener('click', onOptionSelection);

// Event handler for selecting an option.
function onOptionSelection(event) {
    // If the question is already answered. Don't take second attempt.
    if(results[currentQuestionIndex] !== -1) {
        return;
    }
    // Check if the clicked element is li.
    if(event.target.nodeName === 'LI') {
        // Record the selected option in results array.
        results[currentQuestionIndex] = parseInt(event.target.getAttribute("option-index"));
        highlightCurrentOptions();
    }
}

function highlightCurrentOptions() {
    // Question is not answered. Do not highlight anything.
    if(results[currentQuestionIndex] === -1) {
        return;
    }
    
    // iterate over all child nodes.
    optionListEl.childNodes.forEach(li => {
        // Clear background color first.
        li.style.backgroundColor = '';
        // If this is selected, set background color to red.
        if(parseInt(li.getAttribute('option-index')) === results[currentQuestionIndex]) {
            li.style.backgroundColor = '#c7474ddd';
        }
        // If this is selected and mathces the correct answered, set background color to green.
        if(parseInt(li.getAttribute('option-index')) === parseInt(questions[currentQuestionIndex]['answer'])) {
            li.style.backgroundColor = '#45b84ddd';
        }
    });
}

scoreFormEl.addEventListener('submit', saveScore);

function saveScore(event) {
    // Prevent page refresh on form submission.
    event.preventDefault();
    // Get the initials.
    var initials = intialInputEl.value.trim();
    // Initialize a JSON object to save.
    var score_card = {
        initial: initials,
        score: score
    }

    // Get saved scores from local storage.
    var leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
    // If no scores are saved yet, create an empty empty of scores.
    if(leaderboard === null) {
        leaderboard = Array();
    }
    // Add current score card to the leaderboard.
    leaderboard.push(score_card);
    // Write updated leaderboard to the local storage.
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}
