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
let studName = "";

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const form = document.getElementById("form-container");
const quiz = document.getElementById("quiz");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target[0].value);
  studName = e.target[0].value;

  form.style.display = "none";
  quiz.style.display = "block";
});

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
  const message = `${studName} scored ${score} out of ${quizData.length}!`;
  resultEl.innerText = message;

  // Send email with results
  emailjs
    .send("service_gcs3n5c", "template_6my8cbs", {
      message: message,
      to_email: "kiruthika22061998@gmail.com",
    })
    .then(() => {
      console.log("Email sent successfully");
      resultEl.innerText += "\nEmail sent with your results!";
    })
    .catch((err) => {
      console.error("Email failed:", err);
      resultEl.innerText += "\nFailed to send email.";
    });
}

loadQuestion();
