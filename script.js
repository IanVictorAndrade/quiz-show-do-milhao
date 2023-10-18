const question = document.querySelector(".question");
const relogio = document.querySelector("#relogio");
const answers = document.querySelector(".answers");
const dicaButton = document.querySelector(".dica");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");
const btnEnviar = document.querySelector(".botao-enviar");

import questions from "./questions.js";

let currentIndex = 0;
let questionsCorrect = 0;
var TempoLimite = new Date().getTime() + (90*1000);
var TempoRestante;

// Instancia a função que atualiza o timer
var contagem = () => {
  const agora = new Date().getTime();
  TempoRestante = TempoLimite - agora;
  var temporizador = Math.floor((TempoRestante % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0') +
  ":" +
  Math.floor((TempoRestante % (1000 * 60)) / 1000).toString().padStart(2, '0');
  if (TempoRestante <= 0) {
    clearInterval(timer); // Pare a contagem regressiva
  } else {
    relogio.innerHTML = temporizador;;
  };
}

// Inicia a contagem com um intervalo de 1000 milisegundos entre
// cada atualização do campo
var timer = setInterval(contagem, 1000);

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  questionsCorrect = 0;
  loadQuestion();
};

function nextQuestion(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    questionsCorrect++;
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}

// dicaButton.addEventListener("click", () => {
//   const answerButtons = document.querySelectorAll(".answer");
//   const wrongAnswers = Array.from(answerButtons).filter(
//       (button) => button.getAttribute("data-correct") !== "true"
//   );
//
//   if (wrongAnswers.length >= 2) {
//     // Remove as duas primeiras alternativas erradas
//     for (let i = 0; i < 2; i++) {
//       wrongAnswers[i].remove();
//     }
//   } else {
//     // Caso haja menos de duas alternativas erradas, você pode mostrar uma mensagem ou tomar outra ação.
//     console.log("Não há duas alternativas erradas para remover.");
//   }
// });

function finish() {
  textFinish.innerHTML = `você acertou ${questionsCorrect} de ${questions.length}`;
  content.style.display = "none";
  contentFinish.style.display = "flex";
}

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  const item = questions[currentIndex];
  answers.innerHTML = "";
  question.innerHTML = item.question;

  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `;

    answers.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

loadQuestion();
