//declare Variables with values being pulled from HTML classes
let startbtn = document.querySelector(".startbtn");
let questionContainer = document.querySelector(".question-container");
let nextbtn = document.querySelector(".nextButton");
let scoreText = document.querySelector(".score");
let resetButton = document.querySelector(".resetbtn");
let answerButtons = document.querySelectorAll(".answerbtn");
//Retrieve the answers buttons from the HTML document
let choiceOne = document.querySelector(".answerbtn-A");
let choiceTwo = document.querySelector(".answerbtn-B");
let choiceThree = document.querySelector(".answerbtn-C");
let choiceFour = document.querySelector(".answerbtn-D");
//Set starting index and score to 0
let index = 0;
let score = 0;
let quizData = [];


//importing Question data from JSON :: remember to add type="module" to script tag
import data from './data.json' assert{type:"json"};

//Added event listeners to Start, Next, and Reset Buttons
startbtn.addEventListener("click", startQuiz);
nextbtn.addEventListener("click", () => nextQuestion);
resetButton.addEventListener("click", resetGame);

//Shuffle function to randomize the array questions
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

//StartQuiz function, hides Start and unhides Next/Answers/Reset/Question divs
function startQuiz() {
  //Shuffle questions
  shuffleArray(data);
  //truncate data to first 10 questions
  quizData = data.slice(0,10);
  startbtn.classList.add("hidden");
  nextbtn.classList.remove("hidden");
  //Loops through each button to remove all 4 buttons instead of just 1
  answerButtons.forEach((bttn) => {
    bttn.classList.remove("hidden");
  });
  resetButton.classList.remove("hidden");
  questionContainer.classList.remove("hidden");
  //Call nextQuestion function after removing hidden classes to display first question
  nextQuestion();
}

// Function to check if answer is correct
// Pass clickedAnswer and correctAnswer through the function
function checkAnswer(clickedAnswer, correctAnswer) {

  //Check if Clicked = the correct Answer, then change the innerText of answerMessage accordingly
  if (clickedAnswer.innerText === correctAnswer) {
    // answerMessage.innerText = "Correct!";
    clickedAnswer.classList.add("correct");
    score+=100;
  //Check if clicked is the wrong answer, then change the innerText of answerMessage accordingly
  } else {
    // answerMessage.innerText = "Incorrect!";
    clickedAnswer.classList.add("incorrect");
    score-=100
  }
  //Move on to next Question
  setTimeout(() => {
    clickedAnswer.classList.remove("correct");
    clickedAnswer.classList.remove("incorrect");
    nextQuestion()
  }, 300);
}

  //Lets the program know quiz isn't finished
let quizFinished = false;

//Function is called when user clicks on one of the answer options for the current question
function checkAnswerWrapper(e) {
  //If quiz finished is true, then stop the function
  if (quizFinished) return;
  //Calls check answer function on the text of the answer option and the correct answer for the question
  checkAnswer(e.target, data[index - 1]?.correctAnswer);
}

//Function for displaying next question
function nextQuestion() {
  //Establish that index will only go up to 10 questions
  if (index === 10) {
    // Quiz finished, reset index, and display final score or any other actions you want to perform
    quizFinished = true;
    index = 0;
    // You can also remove the event listeners here, if you want
    answerButtons.forEach((button) => {
      button.removeEventListener("click", checkAnswerWrapper);
      button.classList.remove("hidden");
    });

    //This code will hide everything but your score when the quiz is over
    answerButtons.forEach((button) => {
      button.classList.add("hidden");
    })

    questionContainer.classList.add("hidden");
    nextbtn.classList.add("hidden");
    scoreText.innerText = `Final Score: ${score}`;
    scoreText.classList.remove("hidden");
    
    return;
  }

  //Set text of the question to the current question being displayed from Data array
  questionContainer.innerText = data[index].question;
  //Set text of each answer button to be equal to the corresponding Array answer
  choiceOne.innerText = data[index].answers[0];
  choiceTwo.innerText = data[index].answers[1];
  choiceThree.innerText = data[index].answers[2];
  choiceFour.innerText = data[index].answers[3];
//Loop through answer buttons and remove the event listeners from each button
  answerButtons.forEach((button) => {
    button.removeEventListener("click", checkAnswerWrapper);
    button.addEventListener("click", checkAnswerWrapper);
  });
//Cycle through the index
  index++;
}

//Reset game by reloading the page
function resetGame() {
  location.reload();
}