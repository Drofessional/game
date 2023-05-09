// Define my variables
let startbtn = document.querySelector(".startbtn");
let questionContainer = document.querySelector(".question-container");
let nextbtn = document.querySelector(".nextButton");
let answerMessage = document.querySelector(".answer");
let scoreText = document.querySelector(".score");
let newGame = document.querySelector(".new-game");
let resetButton = document.querySelector(".resetbtn")
let score = 0;
let currentQuestionIndex = 0;
let answerButtons = document.querySelectorAll(".answerbtn")

import data from './data.json' assert{type:"json"}
let index = 0
// console.log(data)
console.log(data[index])

startbtn.addEventListener("click", startQuiz);
// nextbtn.addEventListener("click", nextQuestion);

console.log(answerButtons)

function startQuiz() {
      startbtn.classList.add("hidden");
      nextbtn.classList.remove("hidden");
      answerButtons.forEach((bttn) => {
        bttn.classList.remove("hidden");
      })
      resetButton.classList.remove("hidden")
      questionContainer.classList.remove("hidden")
      nextQuestion()
  }    

// Function to show the next Question
function nextQuestion(){
  questionContainer.innerText = data[index].question;
  let choiceOne = document.querySelector(".op1");
  let choiceTwo = document.querySelector(".op2");
  let choiceThree = document.querySelector(".op3");
  let choiceFour = document.querySelector(".op4");

  choiceOne.innerText = data[index].answers[0]
  choiceTwo.innerText = data[index].answers[1]
  choiceThree.innerText = data[index].answers[2]
  choiceFour.innerText = data[index].answers[3]
}


// //Function to display Question on page
// startQuiz();

// //Show results upon submitting

// submitButton