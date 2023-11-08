
const questions = [{
        question: "I ____ playing soccer.",
        answers: ["enjoy", "love", "like"]
    },
    {
        question: "She ____ to the party last night.",
        answers: ["came", "arrived", "joined"]
    },
    {
        question: "We went for a ____ in the park.",
        answers: ["walk", "stroll", "hike"]
    }
    // Add more questions here
];

let currentQuestionIndex = 0;
let currentQuestion;

function initializeGame() {
    currentQuestionIndex = 0;
    showQuestion();
}

function showQuestion() {
    currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;
    document.getElementById("userInput").value = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("userInput").style.backgroundColor = "white";
}

function checkAnswer() {
    const userInput = document.getElementById("userInput").value.trim().toLowerCase();
    const correctAnswers = currentQuestion.answers.map(answer => answer.toLowerCase());

    if (correctAnswers.includes(userInput)) {
        document.getElementById("userInput").style.backgroundColor = "green";
        document.getElementById("feedback").textContent = "Correct!";
        setTimeout(nextQuestion, 1000);
    } else {
        document.getElementById("userInput").style.backgroundColor = "red";
        document.getElementById("feedback").textContent = "Incorrect!";
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        document.getElementById("question").textContent = "Game Over";
        document.getElementById("userInput").style.display = "none";
        document.getElementById("feedback").textContent = "";
    }
}

initializeGame();