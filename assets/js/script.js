var startBtn = document.querySelector("#start-btn");
var startPageEl = document.querySelector("#start-page");
var quizPageEl = document.querySelector("#quiz-page");
var resultPageEl = document.querySelector("#result-page");
var timeEl = document.querySelector(".timer");
var retakeEl = document.querySelector("#retake");
var questionEL = document.querySelector('#question');
var optionListEl = document.querySelector('#option-list');
var questionCounterEl =document.querySelector('#question-counter');
var nextEl = document.querySelector('#next');
var previousEl = document.querySelector('#previous')
var currentQuestionIndex = 0;

retakeEl.addEventListener("click", retakeQuiz);

// Bind Start quiz to start button click event.
startBtn.addEventListener("click", startQuiz);

// Starts the quiz.
function startQuiz(){
    startPageEl.style.display = "none";
    quizPageEl.style.display = "block";
    startTimer();
    displayQuestion(currentQuestionIndex);
}

function updateCache() {
    
}
// removes all children (i.e., list of options) of option list container.
function clearOptions() {
    while (optionListEl.firstChild) {
        optionListEl.removeChild(optionListEl.firstChild);
    }
}

function displayQuestion(questionIndex) {
 // Update question counter title.
    questionCounterEl.textContent = `Question ${questionIndex+1} of 14`;

 // TODO: Update html to render question at questionIndex.
    var currentQuestion = questions[questionIndex];
    var questionText = currentQuestion['question'];
    var options = currentQuestion['options'];

    questionEL.textContent = questionText;
    // clear any existing options
    clearOptions();
    for (var i=0; i<options.length; i++) {
        var optionEl = document.createElement("li");
        optionEl.textContent = options[i];
        optionListEl.appendChild(optionEl);
    }

    // if index > 0 enable previous btn
    previousEl.disabled = !(questionIndex > 0);
}

function exitQuiz() {
    // TODO: re-direct to start page.
    retakeQuiz();

    // TODO: clear cache

    // TODO: clearInterval

}

function displayResults() {
    // TODO: calculate results

    // TODO: Navigate to result page 
    quizPageEl.style.display = "none";
    resultPageEl.style.display = "block";

}

function startTimer() {
   // TODO: initialize timer 
    var secondsLeft = 10 * 60;
   // TODO: update the time text

   var timeInterval = setInterval(function(){
       secondsLeft--;
       timeEl.textContent = secondsLeft;

       if (secondsLeft === 0) {
           clearInterval(timeInterval);
           displayResults();
       }
   }, 1000);

   // TODO: clearInterval when time runs out

   // TODO: displayResults
}

nextEl.addEventListener('click' , onNext);

function onNext() {
    // TODO: record current question answer.

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
    
    // TODO: Update cache
}

function retakeQuiz() {

    // TODO: navigate to start page
    resultPageEl.style.display = "none";
    startPageEl.style.display = "block";

}
