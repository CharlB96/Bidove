
const missingElements = document.querySelectorAll(".missing");
const options = document.getElementsByClassName("option");
const nextButton = document.getElementById("nextButton");

const equations = [{
    equation: "Change in Thermal Energy = m<span class='missing'></span>c<span class='missing'></span>ΔT",
    missing: ["s", "h", "v", "ΔT"],
    answerIndex: 1
  },
  {
    equation: "Pressure of Gas = <span class='missing'></span>V",
    missing: ["k", "m", "r", "P"],
    answerIndex: 3
  },
  {
    equation: "Pressure due to a Column of Liquid = <span class='missing'></span>gh",
    missing: ["ρ", "d", "A", "P"],
    answerIndex: 0
  },
  {
    equation: "<span class='missing'></span>s = ut + 0.5at<sup>2</sup>",
    missing: ["v", "s", "a", "t"],
    answerIndex: 2
  },
  {
    equation: "Force = <span class='missing'></span>t",
    missing: ["Δp", "m", "a", "F"],
    answerIndex: 0
  },
  {
    equation: "Frequency = <span class='missing'></span>T",
    missing: ["λ", "f", "v", "T"],
    answerIndex: 1
  },
  {
    equation: "Magnification = <span class='missing'></span>h",
    missing: ["f", "M", "d", "h"],
    answerIndex: 1
  },
  {
    equation: "Force on Current Carrying Conductor = B<span class='missing'></span>Il",
    missing: ["r", "F", "B", "I"],
    answerIndex: 0
  },
  {
    equation: "Potential Difference = <span class='missing'></span>N<sub>p</sub> / <span class='missing'></span>N<sub>s</sub>",
    missing: ["V", "I", "N<sub>p</sub>", "N<sub>s</sub>"],
    answerIndex: 2
  }
];

let currentEquation = 0;

// Update the current equation and answer options
function updateEquation() {
  const equation = equations[currentEquation];
  const missingIndexes = equation.missing;
  missingElements.forEach((element, index) => {
    element.innerHTML = equation.missing[index];
  });
  document.querySelector(".equation").innerHTML = equation.equation;

  for (let i = 0; i < options.length; i++) {
    options[i].innerHTML = equation.missing[i];
    options[i].classList.remove("eq-correct", "eq-incorrect");
  }
}

// Check the selected answer
function checkAnswer(selectedOption) {
  const equation = equations[currentEquation];
  const selectedOptionIndex = Array.from(options).indexOf(selectedOption);

  if (selectedOptionIndex === equation.answerIndex) {
    selectedOption.classList.add("eq-correct");
    showNextButton();
    updateEquationWithAnswer(selectedOptionIndex);
  } else {
    selectedOption.classList.add("eq-incorrect");
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

// Proceed to the next equation
function nextQuestion() {
  nextButton.classList.add("hidden");
  currentEquation++;
  if (currentEquation < equations.length) {
    updateEquation();
  } else {
    // All equations completed
    document.querySelector(".container").innerHTML = "<h1>Congratulations! You completed the quiz.</h1>";
  }
}

// Update the equation with the correct answer
function updateEquationWithAnswer(answerIndex) {
  const equation = equations[currentEquation];
  missingElements[answerIndex].innerHTML = equation.missing[answerIndex];
}

// Initial equation and answers
updateEquation();