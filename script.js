var startQuizBtn = document.querySelector(".startBtn");
var startSection = document.querySelector("#startPage");
var quizSection = document.querySelector("#quizPage");
var endSection = document.querySelector("#endGame");
var currentQuestionIndex = 0;
var questionTitle = document.querySelector("#questionTitle");
var answerOptions = document.querySelector("#answerOptions");
var correctCount = 0;
var yourScore = document.querySelector("#score");
var submitScoreBtn = document.querySelector("#enter");
var highScoreSection = document.querySelector("#highScorePage");
var tryAgainBtn = document.querySelector("#tryAgain");
var clearScoreBtn = document.querySelector("#clearScore");


var timeEl = document.querySelector(".time");
var mainEl= document.getElementById("questions");
var secondsLeft = 300;


function sendMessage(){
    alert("Time\'s up!");
}


function setTime(){
    secondsLeft = 50;
    var timerInterval = setInterval(function(){
        secondsLeft--;
        timeEl.textContent = secondsLeft + "seconds left"

        if(secondsLeft < 0){
            clearInterval(timerInterval);
            sendMessage();
        }

    }, 1000);
}



var quizQuestions =[
    {
      question: "What do shell window show in python?",
      answerOptions: [
         "IDLE","Print command", "program output",  "Code", 
      ],
      correct:"program output"},

      {question: "What symbols are used to make up the python language?",
      answerOptions: [
       "Runes", "Words",  "Hieroglyphics",  "Sprites",
      ],
      correct:"Runes"},

      {question: "What is computer coding?",
      answerOptions: [
       "A radio show", "A TV show",  " A list of functions",  "Telling a comuter what to do",
      ],
      correct:"Telling a comuter what to do"},

      {question: "Which of these is a programming language?",
      answerOptions: [
       "Bite", "Gnaw",  "Itch",  "Scratch",
      ],
      correct:"Scratch"},
    ]



function startQuiz(){
    startSection.setAttribute("class","hide");
    quizSection.removeAttribute("class");
    setTime();
    nextOne();
}


function nextOne(){
    var currentQuestionObject = quizQuestions[currentQuestionIndex];
    console.log(currentQuestionObject.question)
    questionTitle.innerHTML = currentQuestionObject.question;
    for (let index = 0; index < currentQuestionObject.answerOptions.length; index++) {
        // you may want to make sure that answerOptions html element has no buttons inside if you reuse this function
        var button = document.createElement("button")
        button.innerHTML = currentQuestionObject.answerOptions[index]
        answerOptions.append(button);
        button.addEventListener("click",function(event){
            console.log(quizQuestions.correct)
            if (event.target.innerHTML == quizQuestions[currentQuestionIndex].correct) {
                alert("Correct!");
                currentQuestionIndex+=1;
                if(currentQuestionIndex == quizQuestions.length){
                    showScore();
                }else{
                    score++;
                    answerOptions.innerHTML = "";
                    nextOne();
                    correctCount++;
                }
                
            } else {
                alert("Incorrect!");
                answerOptions.innerHTML = "";
                nextOne();
                secondsLeft -= 15;               
            }
        }
        );
        }
    }


function showScore(){
    quizSection.setAttribute("class","hide");
    endSection.removeAttribute("class","hide");
    yourScore.innerHTML += correctCount;

}

submitScoreBtn.addEventListener("click", function showHighscore(){
    if(document.querySelector("#initial").value == "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        if(!localStorage.getItem("savedHighScores")){
            scores = []
            localStorage.setItem("savedHighScores",JSON.stringify(scores));
        }
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores"));
        if(!savedHighscores){
            savedHighscores = []
        }
        console.log(savedHighscores)
        var currentUser = document.querySelector("#initial").value.trim();
        var currentHighscore = {
            name : currentUser,
            score : correctCount
        };
    
      
        endGame.setAttribute("class","hide");
        highScoreSection.removeAttribute("class","hide");

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
   
});

function generateHighscores(){
    var boardList = document.querySelector("#boardList")
    boardList.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    console.log(highscores);
    for (i=0; i<highscores.length; i++){
        var newScoreSpan = document.createElement("li");;
        newScoreSpan.textContent = highscores[i].name +" "+highscores[i].score;
        boardList.appendChild(newScoreSpan);
    }
}


function tryAgain(){
    answerOptions.innerHTML = "";
    highScoreSection.setAttribute("class","hide");
    startSection.removeAttribute("class","hide");
    correctCount = 0;
    currentQuestionIndex = 0;
}

function clearScore(){
    window.localStorage.clear();
    generateHighscores();
}

function viewHighScores(){
    startSection.setAttribute("class","hide");
    quizSection.setAttribute("class","hide");
    endSection.setAttribute("class","hide");
    highScoreSection.removeAttribute("class","hide")
    generateHighscores();
}

startQuizBtn.addEventListener('click', startQuiz);
tryAgainBtn.addEventListener('click',tryAgain);
clearScoreBtn.addEventListener('click',clearScore);
document.getElementById("view").addEventListener('click',viewHighScores)

