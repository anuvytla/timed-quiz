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
    quizPageEl.style.display = "block";
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
    resultPageEl.style.display = "block";
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
    startPageEl.style.display = "block";

}

optionListEl.addEventListener('click', onOptionSelection);

// Event handler for selecting an option.
function onOptionSelection(event) {
    // Check if the clicked element is li.
    if(event.target.nodeName === 'LI') {
        // Record the selected option in results array.
        results[currentQuestionIndex] = parseInt(event.target.getAttribute("option-index"));
    }
}
