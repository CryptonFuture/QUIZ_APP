const questions = [
    {
        question: "What does Html stand for?",
        answers: [
            "Home Tool Markup Language",
            "Hyper Text Markup Language",
            "HyperLinks and Text Markup Language"
        ],
        correct: 1
    },
    {
        question: "Choose the correct HTML element for the largest heading?",
        answers: ["<head>", "<heading>", "<h6>", "<h1>"],
        correct: 3
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        answers: ["<break>", "<br>", "<lb>"],
        correct: 1
    },
    {
        question: "What is the correct HTML for adding a background color?",
        answers: [
            "<body bg='yellow'>",
            "<body style='background-color:yellow;'>",
            "<background>yellow</background>"
        ],
        correct: 1
    },

    {
        question: "Choose the correct HTML element to define important text?",
        answers: [
            "<b>",
            "<i>",
            "<important>",
            "<strong>"
        ],
        correct: 3
    },

    {
        question: "Choose the correct HTML element to define emphasized text?",
        answers: [
            "<em>",
            "<italic>",
            "<i>"
        ],
        correct: 0
    },

    {
        question: "What is the correct HTML for creating a hyperlink?",
        answers: [
            "<a href='http://www.w3schools.com'>W3Schools</a>",
            "<a>http://www.w3schools.com</a>",
            "<a url='http://www.w3schools.com'>W3Schools</a>",
            "<a name='http://www.w3schools.com'>W3Schools</a>"
        ],
        correct: 0
    },

    {
        question: "Which character is used to indicate an end tag?",
        answers: [
            "^",
            "/",
            "<",
            "*"
        ],
        correct: 1
    },

    {
        question: "How can you open a link in a new tab / browser window?",
        answers: [
            "<a href='url' target='_blank'>",
            "<a href='url' target='new'>",
            "<a href='url' new>"
        ],
        correct: 0
    },

    {
        question: "Which of these elements are all <table> elements?",
        answers: [
            "<thead><body><tr>",
            "<table><head><tfoot>",
            "<table><tr><td>",
            "<table><tr><tt>",
        ],
        correct: 2
    },

];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 3600; 
let timer;
let selectedAnswerIndex = null;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const timerEl = document.getElementById("time");

function startQuiz() {
    nextBtn.style.display = "none";
    showQuestion();
    timer = setInterval(updateTimer, 1000);
}


function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerEl.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    } else {
        endQuiz();
    }
}


function showQuestion() {
    let q = questions[currentQuestionIndex];
    questionEl.textContent = q.question;
    answersEl.innerHTML = "";

    selectedAnswerIndex = null;

    q.answers.forEach((answer, index) => {
        let div = document.createElement("div");
        div.classList.add("option");
        div.textContent = answer;
        div.dataset.index = index;
        div.addEventListener("click", () => selectAnswer(div, index));
        answersEl.appendChild(div);
    });
}


function selectAnswer(element, index) {
    let options = document.querySelectorAll(".option");
    options.forEach(option => option.classList.remove("selected"));

    element.classList.add("selected");
    selectedAnswerIndex = index;
    nextBtn.style.display = "block";
}


nextBtn.addEventListener("click", () => {
    if (selectedAnswerIndex === null) {
        alert("Please select an answer before proceeding.");
        return;
    }

    if (selectedAnswerIndex === questions[currentQuestionIndex].correct) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        nextBtn.style.display = "none";
    } else {
        endQuiz();
    }
});


function endQuiz() {
    clearInterval(timer);
    questionEl.textContent = "Quiz Over!";
    answersEl.innerHTML = "";

    
    let percentage = (score / questions.length) * 100;

    resultEl.innerHTML = `
        <p>Your score: ${score}/${questions.length}</p>
        <p>Percentage: ${percentage.toFixed(2)}%</p>
    `;
    nextBtn.style.display = "none";
}

startQuiz();
