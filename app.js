"use strict";

const generateAnswers = () => {
  for (let i = 0; i < answers.length; i++) {
    answers[i].textContent = `${questions[whichQuestion].get(i + 1)}`;
  }
};

const checkAnswer = () => {
  const correct = questions[whichQuestion].get("correct");
  console.log(correct);
  if (whichAnswerRunning + 1 === correct) {
    points++;
    correctAnswer[whichAnswerRunning].classList.add("correct");
  } else {
    correctAnswer[whichAnswerRunning]?.classList.add("incorrect") ??
      correctAnswer[correct - 1].classList.add("correct");
  }
  whichAnswerRunning = undefined;
};
const init = () => {
  quizRunning = true;
  whichQuestion = 0;
  generateAnswers();
  question.textContent = `${questions[whichQuestion].get("question")}`;
  nextBtn.classList.remove("hidden");
  resetBtn.classList.add("hidden");
  answersContainer.classList.remove("hidden");
  document.getElementById("which-question").classList.remove("winner");
  questionNumber.textContent = `${whichQuestion + 1}/${questions.length}`;
  points = 0;
};
const uncheckedAnswers = () => {
  for (const item of usersAnswer) {
    item.checked = false;
  }
};
const confetti = (time) => {
  startConfetti();
  setTimeout(() => {
    stopConfetti();
  }, time);
};
const questions = [
  new Map([
    ["question", "What's the best programming language?"],
    [1, "Java"],
    [2, "Javascript"],
    [3, "Python"],
    ["correct", 2],
    [true, "You are correct!"],
    [false, "Incorrect!"],
  ]),
  new Map([
    ["question", "What's the best fruit?"],
    [1, "Apple"],
    [2, "Pineapple"],
    [3, "Watermelon"],
    ["correct", 3],
    [true, "You are correct!"],
    [false, "Incorrect!"],
  ]),
  new Map([
    ["question", "What's the best music artist?"],
    [1, "Oki"],
    [2, "White"],
    [3, "Sanah"],
    ["correct", 3],
    [true, "You are correct!"],
    [false, "Incorrect!"],
  ]),
  new Map([
    ["question", "What's the capital city of Poland?"],
    [1, "Warsaw"],
    [2, "Krakow"],
    [3, "Gdynia"],
    ["correct", 1],
    [true, "You are correct!"],
    [false, "Incorrect!"],
  ]),
];
const question = document.querySelector(".question");
const answers = document.querySelectorAll(".answer");
const usersAnswer = document.querySelectorAll(".user-answer");
const nextBtn = document.querySelector(".next-btn");
const questionNumber = document.getElementById("question-number");
const correctAnswer = document.querySelectorAll(".answer-input");
const answersContainer = document.querySelector(".answers-container");
const resetBtn = document.getElementById("reset-btn");

// select right answer
for (let i = 0; i < usersAnswer.length; i++) {
  usersAnswer[i].addEventListener("click", () => {
    if (quizRunning) {
      uncheckedAnswers();
      usersAnswer[i].checked = true;
      whichAnswerRunning = i;
    }
  });
}

// next question
nextBtn.addEventListener("click", () => {
  if (quizRunning) {
    checkAnswer();
    quizRunning = false;
    answersContainer.classList.add("answer-check");
    question.classList.add("answer-check");
    setTimeout(() => {
      if (whichQuestion < questions.length - 1) {
        whichQuestion++;
        questionNumber.textContent = `${whichQuestion + 1}/${questions.length}`;
        question.textContent = `${questions[whichQuestion].get("question")}`;
        generateAnswers();
      } else {
        console.log("You won!");
        question.textContent = `Scored: ${points}/${questions.length}`;
        document.getElementById("which-question").classList.add("winner");
        answersContainer.classList.add("hidden");
        nextBtn.classList.add("hidden");
        resetBtn.classList.remove("hidden");
        quizRunning = false;
        points >= questions.length / 2 && confetti(1000);
      }
      for (const item of correctAnswer) {
        item.classList.remove("correct");
        item.classList.remove("incorrect");
      }
      uncheckedAnswers();
      answersContainer.classList.remove("answer-check");
      question.classList.remove("answer-check");
      quizRunning = true;
    }, 1000);
  }
});
// reset quiz
resetBtn.addEventListener("click", init);
// initialization
let quizRunning = true;
let whichAnswerRunning;
let points = 0;
let whichQuestion;
init();
