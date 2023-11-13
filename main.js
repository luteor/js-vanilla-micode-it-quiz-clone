import "./reset.css";
import "./style.css";

import { quizQuestions } from "./questions.js";

const remainingQuizQuestions = [...quizQuestions];
let score = 0;

startQuiz();

function startQuiz() {
  const startButtonElement = document.querySelector("#start-button");

  startButtonElement.addEventListener("click", () => {
    startButtonElement.remove();
    displayQuiz();
  });
}

function displayQuiz() {
  const questionElement = document.querySelector("h2");
  if (questionElement) {
    questionElement.remove();
  }

  const answerOptionsElement = document.querySelector(".answers");
  if (answerOptionsElement) {
    answerOptionsElement.remove();
  }

  if (remainingQuizQuestions.length > 0) {
    const randomQuestion = getOneRandomQuestion(remainingQuizQuestions);
    displayQuestionWithAnswerOptions(randomQuestion);
  }

  if (remainingQuizQuestions.length === 0) {
    displayFinalScore(score);
  }
}

function displayQuestionWithAnswerOptions(randomQuestion) {
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

    const answerOptionId = answerOptions.findIndex(
      (findOption) => findOption === option
    );
    const answerOptionElement = document.createElement("button");
    answerOptionElement.innerText = option;
    answerOptionElement.classList.add("answer-button");
    answerOptionElement.setAttribute("id", `option-${answerOptionId + 1}`);
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

  const answerOptionIndex = answerOptions.findIndex(
    (findOption) => findOption === answerOptionSubmitted
  );

  const goodAnswerOption = question.answer;
  const correctAnswerOptionIndex = answerOptions.findIndex(
    (findOption) => findOption === goodAnswerOption
  );

  if (question.answer !== answerOptionSubmitted) {
    const wrongAnswerOptionElement = document.querySelector(
      `#option-${answerOptionIndex + 1}`
    );
    wrongAnswerOptionElement.classList.remove("answer-button");
    wrongAnswerOptionElement.classList.add("wrong-answer");
  }

  const goodAnswerOptionElement = document.querySelector(
    `#option-${correctAnswerOptionIndex + 1}`
  );
  goodAnswerOptionElement.classList.remove("answer-button");
  goodAnswerOptionElement.classList.add("correct-answer");

  if (question.answer === answerOptionSubmitted) {
    score++;
  }

  setTimeout(() => {
    deleteQuestionFromRemainingQuestions(question);
    displayQuiz();
  }, 1000);
}

function getOneRandomQuestion(questions) {
  const randomIndex = Math.floor(Math.random() * questions.length);

  const question = questions[randomIndex];

  return question;
}

function displayFinalScore(score) {
  const appDivElement = document.querySelector("#app");

  const scoreElement = document.createElement("h2");
  scoreElement.innerText = `Score final : ${score}/${quizQuestions.length}`;

  appDivElement.appendChild(scoreElement);

  const scoreConclusionElement = document.createElement("div");
  scoreConclusionElement.setAttribute("class", "score-conclusion");

  appDivElement.appendChild(scoreConclusionElement);

  if (score > 15) {
    const scoreConclusionDiv = document.querySelector(".score-conclusion");

    const conclusionSentence = document.createElement("p");
    conclusionSentence.innerText =
      "🎉 Congratulations! You're a computer expert!";

    scoreConclusionDiv.appendChild(conclusionSentence);
  }

  if (score < 15 && score > 10) {
    const scoreConclusionDiv = document.querySelector(".score-conclusion");

    const conclusionSentence = document.createElement("p");
    conclusionSentence.innerText =
      "😀 Bravo! Good score! You're on the right track.";

    scoreConclusionDiv.appendChild(conclusionSentence);
  }

  if (score < 10) {
    const scoreConclusionDiv = document.querySelector(".score-conclusion");

    const conclusionSentence = document.createElement("p");
    conclusionSentence.innerText =
      "🙂 Not bad, but there are still things to learn. Keep studying study!";

    scoreConclusionDiv.appendChild(conclusionSentence);
  }
}

function deleteQuestionFromRemainingQuestions(deleteQuestion) {
  const deleteQuestionIndex = remainingQuizQuestions.findIndex(
    (question) => question === deleteQuestion
  );
  remainingQuizQuestions.splice(deleteQuestionIndex, 1);
}
