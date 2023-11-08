const trueBox = document.querySelector(".true-box");
const falseBox = document.querySelector(".false-box");
const message = document.getElementById("message");

trueBox.addEventListener("click", handleAnswerSelection);
falseBox.addEventListener("click", handleAnswerSelection);

function handleAnswerSelection(event) {
  const selectedBox = event.target;
  const isCorrect = checkAnswer(selectedBox);

  if (isCorrect) {
    message.classList.remove("hidden");
  } else {
    selectedBox.classList.add("flash-red");
    setTimeout(() => {
      selectedBox.classList.remove("flash-red");
    }, 500);
  }
}

function checkAnswer(selectedBox) {
  const question = document.getElementById("tf-question").textContent;
  // Update the condition to check the correct answer based on the statement
  if (question === "This is a sample statement. Is it true or false?") {
    return selectedBox.classList.contains("true-box");
  } else {
    // Add more conditions to check for other statements and their correct answers
    return false;
  }
}