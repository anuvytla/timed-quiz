var startBtn = document.querySelector("#start-btn");
var startPageEl = document.querySelector("#start-page");
var quizPageEl = document.querySelector("#quiz-page");
var resultPageEl = document.querySelector("#result-page");
var timeEl = document.querySelector(".timer");



// Bind Start quiz to start button click event.
startBtn.addEventListener("click", startQuiz);

// Starts the quiz.
function startQuiz(){
    startPageEl.style.display = "none";
    quizPageEl.style.display = "block";
}

function displayquestion(questionIndex) {
 // TODO: Update question counter title.
 
 // TODO: Update html to render question at questionIndex.
}

function exitQuiz() {
    // TODO: re-direct to start page.

    // TODO: clear cache

    // TODO: clearInterval

}

function displayResults() {
    // TODO: calculate results

    // TODO: Navigate to result page 

}

function starttimer() {
   // TODO: initialize timer 

   // TODO: update the time text

   // TODO: clearInterval when time runs out

   // TODO: displayResults
}

function onNext() {
    // TODO: record current question answer.

    // TODO: increment index and dispalay  next question

    // TODO: if index > 0 enable previous btn

    // TODO: check if index withinrange, if yes display next question else display results


}

function onPrevious() {
    // TODO: display previous question

    // TODO: Update cache

    // TODO: if index === 0 disable previous btn else show previous question.
}

function retakequiz() {
    // TODO: clear cache

    // TODO: navigate to start page

}
