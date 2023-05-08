//Define my variables
let startButton = document.querySelector(".startbtn");
let questionContainer = document.querySelector(".question-container");
let nextButton = document.querySelector(".nextbtn");
let gameQuestionText = document.getElementById(".question-container");
let answerButton = document.querySelectorAll("s.ubmitbtn");
let answerMessage = document.querySelector(".answer");
let scoreText = document.querySelector(".score");
let finalScore = document.querySelector(".final-score");
let title = document.querySelector(".title");
let newGame = document.querySelector(".new-game");
let resetButton = document.querySelector(".resetbtn")
let score = 0;
let currentQuestionIndex = 0;

//Sample Question Arrays
const quizQuestions = [
    {
      question: "What was the largest empire in history?",
      answers: [
        "Roman Empire",
        "British Empire",
        "Mongol Empire",
        "Ottoman Empire"
      ],
      correctAnswer: "Mongol Empire"
    },
    {
      question: "Who was the first President of the United States?",
      answers: [
        "Thomas Jefferson",
        "George Washington",
        "John Adams",
        "Abraham Lincoln"
      ],
      correctAnswer: "George Washington"
    },
    {
      question: "What was the main cause of World War I?",
      answers: [
        "Nationalism",
        "Imperialism",
        "Militarism",
        "All of the above"
      ],
      correctAnswer: "All of the above"
    },
    {
      question: "Who invented the telephone?",
      answers: [
        "Alexander Graham Bell",
        "Thomas Edison",
        "Nikola Tesla",
        "Guglielmo Marconi"
      ],
      correctAnswer: "Alexander Graham Bell"
    },
    {
      question: "What was the Renaissance?",
      answers: [
        "A period of artistic and intellectual revival",
        "A political movement",
        "A religious revolution",
        "A social movement"
      ],
      correctAnswer: "A period of artistic and intellectual revival"
    }
  ];

//Function to run when Quiz Begins
  function startQuiz()[
        currentQuestionIndex = 0,
        score = 0,
        nextButton.innerHTML = "Next",
        showQuestion(),
  ]

//Function to display Question on page