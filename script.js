//declare Variables with values being pulled from HTML classes
let startbtn = document.querySelector(".startbtn");
let questionContainer = document.querySelector(".question-container");
let nextbtn = document.querySelector(".nextButton");
let scoreText = document.querySelector(".score");
let resetButton = document.querySelector(".resetbtn");
let answerButtons = document.querySelectorAll(".answerbtn");
let resetHighscoresBtn = document.querySelector(".reset-highscores-btn");
//Retrieve the answers buttons from the HTML document
let choiceOne = document.querySelector(".answerbtn-A");
let choiceTwo = document.querySelector(".answerbtn-B");
let choiceThree = document.querySelector(".answerbtn-C");
let choiceFour = document.querySelector(".answerbtn-D");
//Variables for Sounds
let correctSound = new Audio('correct.mp3');
let incorrectSound = new Audio('incorrect.mp3');
//Declare Variables that I will need to use later
let index = 0;
let score = 0;
let quizData = [];
let playerName;




//importing Question data from JSON :: remember to add type="module" to script tag
import data from './data.json' assert{type: "json"};

//Added event listeners to Start, Next, Reset, and ResetHighScores buttons
window.onload = function () {
  startbtn.addEventListener("click", startQuiz);
  nextbtn.addEventListener("click", () => nextQuestion());
  resetButton.addEventListener("click", resetGame);
  resetHighscoresBtn.addEventListener("click", resetHighscores);
}
//Shuffle function to randomize the array questions
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

//StartQuiz function, hides Start and unhides Next/Answers/Reset/Question divs
function startQuiz() {

  let numQuestions = document.getElementById('numQuestions').value;  // Get the number of questions from the input

  playerName = document.getElementById('username').value; // Get the player's name from the input

  if (playerName === "") {  // If no input was provided, default to 'Player'
    playerName = "Player";
  }

  if (numQuestions === "") {  // If no input was provided, default to 10 questions
    numQuestions = 10;
  }

  updateScore(); //Call updateScore to set player Name for initial question

  // Hide the number of questions and username inputs
  document.getElementById('numQuestions').classList.add('hidden');
  document.getElementById('username').classList.add('hidden');
  // Validate the number of questions
  if (numQuestions > data.length) {
    alert("The number of questions cannot be more than the total number of questions available.");
    return;
  }

  shuffleArray(data); //Shuffle questions

  quizData = data.slice(0, numQuestions); //truncate data to first length of numQuestions input

  startbtn.classList.add("hidden"); //Hide the Start Button
  nextbtn.classList.remove("hidden"); //Unhide the Next/Skip Button

  answerButtons.forEach((bttn) => {  //Loops through each button to unhide all 4 buttons instead of just 1
    bttn.classList.remove("hidden");
  });
  resetButton.classList.remove("hidden");
  questionContainer.classList.remove("hidden"); //Unhide the container that holds the question

  nextQuestion(); //Call nextQuestion function after removing hidden classes to display first question
}

// Function to check if answer is correct
// Pass clickedAnswer and correctAnswer through the function
function checkAnswer(clickedAnswer, correctAnswer) {

  if (clickedAnswer.innerText === correctAnswer) {   //Check if Clicked = the correct Answer, then change the innerText of answerMessage accordingly
    clickedAnswer.classList.add("correct"); //Adds color
    score += 100; //Adds Score
    correctSound.play(); //Plays affirmative sound for correct

  } else { //Check if clicked is the wrong answer, then change the innerText of answerMessage accordingly
    clickedAnswer.classList.add("incorrect"); //Removes color
    score -= 100 //Reduces Score
    incorrectSound.play(); //Plays buzzer sound for incorrect
  }
  updateScore(); //Updates the value of the score

  setTimeout(() => { //Adds a timed delay of 500ms before moving to next question so server has time to respond
    clickedAnswer.classList.remove("correct"); //Clears color from button
    clickedAnswer.classList.remove("incorrect"); //Clears color from button
    nextQuestion() //Loads next question
  }, 500);
}

//update the ScoreText during the game
function updateScore() {
  scoreText.innerText = `${playerName}'s Score: ${score}`;
  scoreText.classList.remove("hidden");
}

let quizFinished = false; //Lets the program know quiz isn't finished

//This function makes sure that the Check Answer function is not called if Player reaches the end of the questions
function checkAnswerWrapper(e) { //Function is called when user clicks on one of the answer options for the current question
  if (quizFinished) return; //If quiz finished is true, then stop the function
  checkAnswer(e.target, quizData[index - 1]?.correctAnswer); //Calls check answer function on the text of the answer option and the correct answer for the question
}


//Function for displaying next question
function nextQuestion() {

  if (index === quizData.length) { //Establish that index will only go up to 10 questions

    scoreText.innerText = `${playerName}'s Final Score: ${score}`;    // Display the player's name next to their score
    // Quiz is finished, set index back to 0, hide the buttons, show the high scores
    quizFinished = true;
    index = 0;
    answerButtons.forEach((button) => {
      button.removeEventListener("click", checkAnswerWrapper);
      button.classList.remove("hidden");
      displayHighscores();
      return;
    });

    //This code will hide everything but score when the quiz is over
    answerButtons.forEach((button) => {
      button.classList.add("hidden");
    })
    questionContainer.classList.add("hidden");
    nextbtn.classList.add("hidden");
    scoreText.classList.remove("hidden");

    return;
  }


  questionContainer.innerText = data[index].question; //Set text of the question to the current question being displayed from Data array
  //Set text of each answer button to be equal to the corresponding Array answer
  choiceOne.innerText = data[index].answers[0];
  choiceTwo.innerText = data[index].answers[1];
  choiceThree.innerText = data[index].answers[2];
  choiceFour.innerText = data[index].answers[3];

  answerButtons.forEach((button) => { //Loop through answer buttons and remove the event listeners from each button
    button.removeEventListener("click", checkAnswerWrapper);
    button.addEventListener("click", checkAnswerWrapper);
  });
  index++; //Cycle through the index
}

//Function to display High Scores
function displayHighscores() {
  let highscores = JSON.parse(localStorage.getItem('highscores')) || []; //retrieve high scores from localStorage and parse to convert from string to array
  let highscoreList = document.getElementById('highscores'); //Assigns value of highscores div to highscoreList variable
  highscoreList.innerHTML = '';  // Clear the list
  for (let highscore of highscores) { //iterate through all the highscore in highscores array
    let li = document.createElement('li'); //create new list item element 'li'
    li.textContent = `${highscore.player}: ${highscore.score}`; //sets text of li so it shows the player's name and score on the list
    highscoreList.appendChild(li); //appends the 'li' element to the highscorelist
  }
  if (highscores.length > 0) { //Check to make sure there is high score on the list, if none then hide the list.
    resetHighscoresBtn.classList.remove("hidden");
  } else {
    resetHighscoresBtn.classList.add("hidden");
  }
  document.getElementById('highscore-list').classList.remove('hidden'); //Unhide the highscore list if there is high scores available
}

function resetHighscores() { //Reset the high score list using resetHighScores function called when Reset High Scores button is clicked
  localStorage.removeItem("highscores"); //removes items with key 'highscores" from local storage
  location.reload(); //Reloads the page
}

function resetGame() { //function for resetting the game
  let highscores = JSON.parse(localStorage.getItem('highscores')) || []; //retrieve high scores and convert it to an array then assign to highscores variable
  highscores.push({ player: playerName, score: score }); //add new high score entry to the highscores array
  highscores.sort((a, b) => b.score - a.score); //Sort the scores in order of highest to lowest
  highscores = highscores.slice(0, 10);  // Keep only top 10 scores 
  localStorage.setItem('highscores', JSON.stringify(highscores)); //feed updated highscores array into the local storage
  location.reload(); //reload the page
}