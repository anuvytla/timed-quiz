var startBtn = document.querySelector("#start-btn");
var startPageEl = document.querySelector("#start-page");
var quizPageEl = document.querySelector("#quiz-page");
var resultPageEl = document.querySelector("#result-page");

startBtn.addEventListener("click", startQuiz);

function startQuiz(){
    startPageEl.style.display = "none";
    quizPageEl.style.display = "block";
}