import "./reset.css";
import "./style.css";

import { allQuizQuestions } from "./questions.js";

const quizQuestions = [...allQuizQuestions];

startQuiz();

function startQuiz() {
  const buttonElement = document.querySelector("#start-button");

  buttonElement.addEventListener("click", function () {
    buttonElement.remove();
    displayQuiz();
  });
}

function displayQuiz(lastQuestion) {
  if (quizQuestions.length !== allQuizQuestions.length) {
    document.querySelector("h2").remove();
    document.querySelector(".answers").remove();
  }
  console.log(quizQuestions);

  const index = quizQuestions.findIndex(
    (questionDisplay) => questionDisplay === lastQuestion
  );
  quizQuestions.splice(index, 1);
  const question = getOneRandomQuestion(quizQuestions);
  displayOneQuestionWithAnswerOptions(question);
}

function displayOneQuestionWithAnswerOptions(oneQuestion) {
  const appDiv = document.querySelector("#app");

  const questionElement = document.createElement("h2");
  questionElement.innerText = oneQuestion.question;

  appDiv.appendChild(questionElement);

  const AnswersElement = document.createElement("div");
  AnswersElement.setAttribute("class", "answers");

  appDiv.appendChild(AnswersElement);

  const answerOptions = oneQuestion.options;

  answerOptions.forEach((option) => {
    const answerDiv = document.querySelector(".answers");
    const answerOptionId =
      1 + answerOptions.findIndex((findOption) => findOption === option);
    const answerOptionElement = document.createElement("button");
    answerOptionElement.innerText = option;
    answerOptionElement.classList.add("answer-button");
    answerOptionElement.setAttribute("id", `option-${answerOptionId}`);

    answerOptionElement.addEventListener("click", () =>
      checkSubmitAnswer(oneQuestion, option)
    );

    answerDiv.appendChild(answerOptionElement);
  });
}

function checkSubmitAnswer(question, answerOption) {
  const answerButtons = document.querySelectorAll(".answer-button");
  answerButtons.forEach((button) => {
    button.disabled = true;
  });

  const answerOptions = question.options;

  const answerOptionIndex =
    1 + answerOptions.findIndex((findOption) => findOption === answerOption);

  const correctAnswer = question.answer;
  const correctAnswerOptionIndex =
    1 + answerOptions.findIndex((findOption) => findOption === correctAnswer);
  console.log(correctAnswerOptionIndex);

  if (question.answer !== answerOption) {
    const wrongAnswerOptionElement = document.querySelector(
      `#option-${answerOptionIndex}`
    );
    wrongAnswerOptionElement.classList.remove("answer-button");
    wrongAnswerOptionElement.classList.add("wrong-answer");
  }

  const goodAnswerOptionElement = document.querySelector(
    `#option-${correctAnswerOptionIndex}`
  );
  goodAnswerOptionElement.classList.remove("answer-button");
  goodAnswerOptionElement.classList.add("correct-answer");

  setTimeout(() => {
    displayQuiz(question);
  }, 1000);
}

function getOneRandomQuestion(questions) {
  const randomIndex = Math.floor(Math.random() * questions.length);

  const question = questions[randomIndex];

  return question;
}

function UpdateQuizQuestions(lastQuestion) {}
