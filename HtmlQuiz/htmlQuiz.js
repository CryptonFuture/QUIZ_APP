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

    {
        question: "Inline elements are normally displayed without starting a new line.",
        answers: [
            "True",
            "False"
        ],
        correct: 2
    },

    {
        question: "How can you make a numbered list?",
        answers: [
            "<ul>",
            "<list>",
            "<ol>",
            "<dl>"
        ],
        correct: 2
    },

    {
        question: "How can you make a bulleted list?",
        answers: [
            "<ul>",
            "<list>",
            "<ol>",
            "<dl>"
        ],
        correct: 0
    },

    {
        question: "What is the correct HTML for making a checkbox?",
        answers: [
            "<input type='check'>",
            "<input type='checkbox'>",
            "<checkbox>",
            "<check>"
        ],
        correct: 1
    },

    {
        question: "What is the correct HTML for making a text input field?",
        answers: [
            "<input type='textfield'>",
            "<input type='text'>",
            "<textfield type='text'>",
            "<textfield>"
        ],
        correct: 1
    }, 

    {
        question: "What is the correct HTML for making a drop-down list?",
        answers: [
            "<input type='list'>",
            "<input type='dropdown'>",
            "<list>",
            "<select>"
        ],
        correct: 3
    },

    {
        question: "What is the correct HTML for making a text area?",
        answers: [
            "<textarea>",
            "<input type='textarea'>",
            "<input type='textbox'>"
        ],
        correct: 0
    },

    {
        question: "What is the correct HTML for inserting an image?",
        answers: [
            "<img alt='MyImage'>image.gif</img>",
            "<img src='image.gif' alt='MyImage' />",
            "<image src='image.gif' alt='MyImage'>",
            "<img href='image.gif' alt='MyImage'>",
        ],
        correct: 1
    },

    {
        question: "What is the correct HTML for inserting a background image?",
        answers: [
            "<body bg='background.gif'>",
            "<background img='background.gif'>",
            "<body style='background-image:url(background.gif)'>",
        ],
        correct: 2
    },

    {
        question: "An <iframe> is used to display a web page within a web page.",
        answers: [
            "There is no such thing as an <iframe>",
            "False",
            "True",
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
    let status = percentage >= 50 ? "Pass 🎉" : "Fail ❌";

    resultEl.innerHTML = `
        <p>Your score: ${score}/${questions.length}</p>
        <p>Percentage: ${percentage.toFixed(2)}%</p>
        <p>Status: <strong>${status}</strong></p>
    `;
    nextBtn.style.display = "none";
}


startQuiz();
