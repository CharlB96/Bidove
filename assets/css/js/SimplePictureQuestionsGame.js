    // Define the questions, answers, and images
    const questions = [
        {
          question: "What is this the circuit symbol for?",
          answers: ["LED", "Bulb", "Ammeter", "Diode"],
          correctAnswer: "LED",
          image: "/Users/lukefullelove/Desktop/bidove/HTMLStuff/Github Repository/teachm8-django/HTMLStuff/Images/LED.jpeg"
        },
        {
          question: "Who is this sexy bitch?",
          answers: ["Luc", "Luke", "Ffion", "Ffion's Mum"],
          correctAnswer: "Ffion",
          image: "/Users/lukefullelove/Desktop/bidove/HTMLStuff/Github Repository/teachm8-django/HTMLStuff/Images/Ffion.jpeg"
        },
        // Add more questions here...
      ];
  
      let currentQuestionIndex = 0;
      let answeredCorrectly = [];
      let answeredIncorrectly = [];
  
      const questionElement = document.getElementById("sq-question");
      const imageElement = document.getElementById("sq-image");
      const answerContainer = document.querySelector(".sq-answer-container");
  
      function displayQuestion() {
        const question = questions[currentQuestionIndex];
        questionElement.textContent = question.question;
        imageElement.innerHTML = `<img src="${question.image}" alt="Question Image" width="200" height="150">`;
        answerContainer.innerHTML = "";
  
        for (let i = 0; i < question.answers.length; i++) {
          const answerButton = document.createElement("button");
          answerButton.textContent = question.answers[i];
          answerButton.classList.add("sq-answer");
          answerButton.addEventListener("click", checkAnswer);
          answerContainer.appendChild(answerButton);
        }
      }
  
      function checkAnswer(event) {
        const selectedAnswer = event.target.textContent;
        const question = questions[currentQuestionIndex];
  
        if (selectedAnswer === question.correctAnswer) {
          event.target.classList.add("correct");
          answeredCorrectly.push(currentQuestionIndex);
          setTimeout(moveToNextQuestion, 1000);
        } else {
          event.target.classList.add("incorrect");
          setTimeout(() => {
            event.target.classList.remove("incorrect");
          }, 1000);
          answeredIncorrectly.push(currentQuestionIndex);
        }
      }
  
      function moveToNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length) {
          // Quiz completed, show results or redirect to a new page
          alert("Quiz completed!");
        } else {
          displayQuestion();
        }
      }
  
      function getRandomQuestion() {
        const remainingQuestions = questions.filter(
          (question, index) =>
            !answeredCorrectly.includes(index) &&
            !answeredIncorrectly.includes(index)
        );
        const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
        return remainingQuestions[randomIndex];
      }
  
      function startQuiz() {
        currentQuestionIndex = 0;
        answeredCorrectly = [];
        answeredIncorrectly = [];
        displayQuestion();
      }
  
      startQuiz();