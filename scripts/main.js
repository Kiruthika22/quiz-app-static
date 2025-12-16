const quizData = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style System",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "HyperText Markdown Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language",
    ],
    answer: "HyperText Markup Language",
  },
  {
    question: "Which year was JavaScript launched?",
    options: ["1996", "1995", "1994", "None of the above"],
    answer: "1995",
  },
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.innerText = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.classList.add("option");
    btn.addEventListener("click", () => selectAnswer(option));
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(option) {
  const correct = quizData[currentQuestion].answer;
  if (option === correct) {
    score++;
  }
  /* Array.from(optionsEl.children).forEach((btn) => {
          btn.disabled = true;
          if (btn.innerText === correct) {
            btn.style.background = "#4caf50"; // green for correct
          } else if (btn.innerText === option) {
            btn.style.background = "#f44336"; // red for wrong
          }
        }); */
  for (const btn of optionsEl.children) {
    btn.disabled = true;

    if (btn.innerText === correct) {
      btn.style.background = "#4caf50";
    } else if (btn.innerText === option) {
      btn.style.background = "#f44336";
    }
  }
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionEl.style.display = "none";
  optionsEl.style.display = "none";
  nextBtn.style.display = "none";
  const message = `You scored ${score} out of ${quizData.length}!`;
  resultEl.innerText = message;

  /* emailjs
    .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
      result: message,
      to_email: "receiver@example.com",
    })
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch((err) => {
      console.error("Email failed:", err);
    }); */
}

loadQuestion();
