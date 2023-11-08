const questionElement = document.getElementById("qa-question");
const options = document.getElementsByClassName("qa-option");
const nextButton = document.getElementById("nextButton");
const correctAnswerIndex = Math.floor(Math.random() * 4); // Randomly select the correct answer index (0-3)

// Update the question and answer options
function updateQuestion(question, answers) {
  questionElement.textContent = question;

  for (let i = 0; i < options.length; i++) {
    options[i].textContent = answers[i];
    options[i].classList.remove("qa-correct", "qa-incorrect");
  }
}

// Check the selected answer
function checkAnswer(selectedOption) {
  const selectedOptionIndex = Array.from(options).indexOf(selectedOption);

  if (selectedOptionIndex === correctAnswerIndex) {
    selectedOption.classList.add("qa-correct");
    showNextButton();
  } else {
    selectedOption.classList.add("qa-incorrect");
    flashRed(selectedOption);
  }
}

// Flash the incorrect answer red
function flashRed(option) {
  option.style.backgroundColor = "#ffcccc";
  setTimeout(() => {
    option.style.backgroundColor = "#e9e9e9";
  }, 500);
}

// Show the next button
function showNextButton() {
  nextButton.classList.remove("hidden");
}

// Proceed to the next question
function nextQuestion() {
  nextButton.classList.add("hidden");
  // Replace the following code with your logic to load the next question
  // Example:
  updateQuestion("Next question goes here", ["Option 1", "Option 2", "Option 3", "Option 4"]);
}

// Initial question and answers
updateQuestion("Question goes here", ["Option 1", "Option 2", "Option 3", "Option 4"]);