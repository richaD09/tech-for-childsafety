
/* =====================================
   CHILDSAFE INDIA - INTERACTIVE FEATURES
===================================== */

/* MOBILE NAVIGATION */
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.textContent = isOpen ? "✕" : "☰";
  });

  navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    });
  });
}

/* HOME SAFETY CHECKLIST */
const checklist = document.querySelector("#homeChecklist");

if (checklist) {
  const checkboxes = checklist.querySelectorAll('input[type="checkbox"]');
  const countText = document.querySelector("#checkCount");
  const progressBar = document.querySelector("#checkProgress");
  const message = document.querySelector("#checkMessage");

  function updateChecklist() {
    const total = checkboxes.length;
    const checked = [...checkboxes].filter(box => box.checked).length;

    if (countText) {
      countText.textContent = `${checked} / ${total}`;
    }

    if (progressBar) {
      progressBar.style.width = `${(checked / total) * 100}%`;
    }

    if (message) {
      if (checked === total) {
        message.textContent = "Excellent! You have completed your safety checklist.";
      } else if (checked > 0) {
        message.textContent = "Good start! Keep building safe digital habits.";
      } else {
        message.textContent = "You can complete this checklist at your own pace.";
      }
    }
  }

  checkboxes.forEach(box => box.addEventListener("change", updateChecklist));
  updateChecklist();
}

/* QUIZ */
const questionElement = document.querySelector("#questionText");
const optionsElement = document.querySelector("#options");
const feedbackElement = document.querySelector("#feedback");
const nextButton = document.querySelector("#nextBtn");
const progressElement = document.querySelector("#quizProgress");
const progressText = document.querySelector("#quizProgressText");
const quizContent = document.querySelector("#quizContent");
const quizResult = document.querySelector("#quizResult");
const restartButton = document.querySelector("#restartBtn");

const questions = [
  {
    question: "An unknown person online asks for your home address. What should you do?",
    options: [
      "Share it because they seem friendly",
      "Never share it and tell a trusted adult",
      "Send your school location instead"
    ],
    answer: 1,
    explanation: "Personal information should not be shared with strangers online."
  },
  {
    question: "Someone sends you a threatening message. What is the safest response?",
    options: [
      "Threaten them back",
      "Ignore everything and keep it secret",
      "Save evidence if safe, block/report and tell a trusted adult"
    ],
    answer: 2,
    explanation: "Don't retaliate. Preserve evidence safely and seek support."
  },
  {
    question: "An online friend asks you to meet secretly in person. What should you do?",
    options: [
      "Go alone",
      "Tell a trusted adult and never meet them alone",
      "Give them your phone number"
    ],
    answer: 1,
    explanation: "Never arrange a secret meeting with an online contact. Talk to a trusted adult."
  },
  {
    question: "Which is the safest password habit?",
    options: [
      "Use 123456",
      "Use the same password everywhere",
      "Use a long, unique password and keep it private"
    ],
    answer: 2,
    explanation: "Unique passwords help protect your accounts if one password is exposed."
  },
  {
    question: "A website asks for your OTP to claim a prize. What should you do?",
    options: [
      "Share the OTP immediately",
      "Do not share it and ask a trusted adult for help",
      "Send your password too"
    ],
    answer: 1,
    explanation: "Never share OTPs or account verification codes to claim suspicious prizes."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function showQuestion() {
  if (!questionElement || !optionsElement) return;

  answered = false;

  const question = questions[currentQuestion];

  questionElement.textContent = question.question;
  optionsElement.innerHTML = "";
  feedbackElement.textContent = "";

  nextButton.disabled = true;
  nextButton.textContent =
    currentQuestion === questions.length - 1
      ? "See my result →"
      : "Next question →";

  progressText.textContent =
    `QUESTION ${currentQuestion + 1} OF ${questions.length}`;

  progressElement.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.textContent = option;

    button.addEventListener("click", () => selectAnswer(index));

    optionsElement.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return;

  answered = true;

  const question = questions[currentQuestion];
  const buttons = optionsElement.querySelectorAll(".quiz-option");

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === question.answer) {
      button.classList.add("correct");
    }
  });

  if (selectedIndex === question.answer) {
    score++;
    feedbackElement.textContent = "Correct! " + question.explanation;
  } else {
    buttons[selectedIndex].classList.add("wrong");
    feedbackElement.textContent = "Not quite. " + question.explanation;
  }

  nextButton.disabled = false;
}

function showResult() {
  quizContent.classList.add("hidden");
  quizResult.classList.remove("hidden");

  const percentage = Math.round((score / questions.length) * 100);

  document.querySelector("#resultScore").textContent =
    `${score} / ${questions.length} (${percentage}%)`;

  if (score === questions.length) {
    document.querySelector("#resultTitle").textContent = "Excellent work!";
    document.querySelector("#resultMessage").textContent =
      "You have a strong understanding of online safety. Keep making smart choices.";
  } else if (score >= 3) {
    document.querySelector("#resultTitle").textContent = "Good job!";
    document.querySelector("#resultMessage").textContent =
      "You know some important safety habits. Review the topics you missed and keep learning.";
  } else {
    document.querySelector("#resultTitle").textContent = "Keep learning!";
    document.querySelector("#resultMessage").textContent =
      "Online safety is a skill. Explore our safety guides and try the quiz again.";
  }
}

if (questionElement && nextButton) {
  showQuestion();

  nextButton.addEventListener("click", () => {
    if (!answered) return;

    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      showQuestion();
    } else {
      showResult();
    }
  });
}

if (restartButton) {
  restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    answered = false;

    quizResult.classList.add("hidden");
    quizContent.classList.remove("hidden");

    showQuestion();
  });
}
