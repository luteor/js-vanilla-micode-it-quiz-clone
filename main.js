import "./reset.css";
import "./style.css";

import { quizQuestions } from "./questions.js";

const remainingQuizQuestions = [...quizQuestions];

startQuiz();

function startQuiz() {
  const startButtonElement = document.querySelector("#start-button");

  startButtonElement.addEventListener("click", function () {
    startButtonElement.remove();
    displayQuiz();
  });
}

function displayQuiz(lastQuestion) {
  if (remainingQuizQuestions.length !== quizQuestions.length) {
    document.querySelector("h2").remove();
    document.querySelector(".answers").remove();
  }

  const lastQuestionIndex = remainingQuizQuestions.findIndex(
    (question) => question === lastQuestion
  );
  remainingQuizQuestions.splice(lastQuestionIndex, 1);

  const randomQuestion = getOneRandomQuestion(remainingQuizQuestions);
  displayOneQuestionWithAnswerOptions(randomQuestion);
}

function displayOneQuestionWithAnswerOptions(randomQuestion) {
  const appDivElement = document.querySelector("#app");

  const questionElement = document.createElement("h2");
  questionElement.innerText = randomQuestion.question;

  appDivElement.appendChild(questionElement);

  const AnswersElement = document.createElement("div");
  AnswersElement.setAttribute("class", "answers");

  appDivElement.appendChild(AnswersElement);

  const answerOptions = randomQuestion.options;

  answerOptions.forEach((option) => {
    const answerDiv = document.querySelector(".answers");

    const answerOptionId =
      1 + answerOptions.findIndex((findOption) => findOption === option);
    const answerOptionElement = document.createElement("button");
    answerOptionElement.innerText = option;
    answerOptionElement.classList.add("answer-button");
    answerOptionElement.setAttribute("id", `option-${answerOptionId}`);
    answerOptionElement.addEventListener("click", () =>
      checkSubmittedAnswer(randomQuestion, option)
    );

    answerDiv.appendChild(answerOptionElement);
  });
}

function checkSubmittedAnswer(question, answerOptionSubmitted) {
  const answerOptionsElement = document.querySelectorAll(".answer-button");
  answerOptionsElement.forEach((answerOption) => {
    answerOption.disabled = true;
  });

  const answerOptions = question.options;

  const answerOptionIndex =
    1 +
    answerOptions.findIndex(
      (findOption) => findOption === answerOptionSubmitted
    );

  const goodAnswerOption = question.answer;
  const correctAnswerOptionIndex =
    1 +
    answerOptions.findIndex((findOption) => findOption === goodAnswerOption);

  if (question.answer !== answerOptionSubmitted) {
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
