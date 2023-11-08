const words = ["Ffion", "cat", "mouse", "owl", "rabbit"];
const images = [{
    name: "Ffion",
    src: "../images/Ffion.jpeg"
  },
  {
    name: "cat",
    src: "cat.jpg"
  },
  {
    name: "mouse",
    src: "mouse.jpg"
  },
  {
    name: "owl",
    src: "owl.jpg"
  },
  {
    name: "rabbit",
    src: "rabbit.jpg"
  },
];

const wordContainer = document.getElementById("word-container");
const imageContainer = document.getElementById("image-container");
let selectedWord = null;

function initializeGame() {
  shuffleArray(words);
  shuffleArray(images);

  words.forEach((word, index) => {
    const wordBox = createWordBox(word);
    wordContainer.appendChild(wordBox);
    wordBox.addEventListener("click", () => {
      selectWord(wordBox);
    });
  });

  images.forEach((image, index) => {
    const imageBox = createImageBox(image);
    imageContainer.appendChild(imageBox);
    imageBox.addEventListener("click", () => {
      selectImage(imageBox);
    });
  });
}

function createWordBox(word) {
  const wordBox = document.createElement("div");
  wordBox.classList.add("box", "word");
  wordBox.textContent = word;
  return wordBox;
}

function createImageBox(image) {
  const imageBox = document.createElement("div");
  imageBox.classList.add("box", "image");
  imageBox.style.backgroundImage = `url('${image.src}')`;
  imageBox.dataset.name = image.name;
  return imageBox;
}

function selectWord(wordBox) {
  if (selectedWord) {
    selectedWord.classList.remove("selected");
  }

  selectedWord = wordBox;
  selectedWord.classList.add("selected");
}

function selectImage(imageBox) {
  if (selectedWord) {
    const selectedWordText = selectedWord.textContent;
    const selectedImageName = imageBox.dataset.name;

    if (selectedWordText === selectedImageName) {
      selectedWord.classList.add("hide");
      imageBox.classList.add("hide");
      selectedWord.classList.remove("selected");
      selectedWord = null;
      checkGameCompletion();
    } else {
      flashBoxesRed(selectedWord, imageBox);
      selectedWord.classList.remove("selected");
      selectedWord = null;
    }
  }
}

function flashBoxesRed(wordBox, imageBox) {
  wordBox.classList.add("flash-red");
  imageBox.classList.add("flash-red");

  setTimeout(() => {
    wordBox.classList.remove("flash-red");
    imageBox.classList.remove("flash-red");
  }, 500);
}

function checkGameCompletion() {
  const remainingWordBoxes = Array.from(document.getElementsByClassName("box word"));
  const remainingImageBoxes = Array.from(document.getElementsByClassName("box image"));

  if (remainingWordBoxes.length === 0 && remainingImageBoxes.length === 0) {
    showCongratulations();
  }
}

function showCongratulations() {
  const congratulations = document.createElement("div");
  congratulations.textContent = "Congratulations! You have completed the game.";
  congratulations.classList.add("hidden");
  document.body.appendChild(congratulations);

  setTimeout(() => {
    congratulations.classList.remove("hidden");
  }, 500);
}

// Randomize array element order using Durstenfeld shuffle algorithm.
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

initializeGame();