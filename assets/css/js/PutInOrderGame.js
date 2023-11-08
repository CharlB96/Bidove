const boxContainer = document.getElementById("pio-box-container");
const boxes = Array.from(boxContainer.getElementsByClassName("pio-box"));
const originalOrder = ['spider', 'rat', 'dog', 'wolf', 'elephant'];
let isDragging = false;

initializeGame();

function initializeGame() {
  boxes.forEach(box => {
    box.addEventListener("dragstart", dragStart);
    box.addEventListener("dragover", dragOver);
    box.addEventListener("dragenter", dragEnter);
    box.addEventListener("dragleave", dragLeave);
    box.addEventListener("drop", drop);
    box.addEventListener("dragend", dragEnd);
  });

  shuffleBoxes();
}

function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.textContent);
  isDragging = true;
  setTimeout(() => {
    event.target.classList.add("hidden");
  }, 0);
}

function dragOver(event) {
  event.preventDefault();
}

function dragEnter(event) {
  event.target.classList.add("highlight");
}

function dragLeave(event) {
  event.target.classList.remove("highlight");
}

function drop(event) {
  event.preventDefault();
  event.target.classList.remove("highlight");

  const draggedBoxValue = event.dataTransfer.getData("text/plain");
  const targetBoxValue = event.target.textContent;

  swapBoxes(draggedBoxValue, targetBoxValue);
}

function dragEnd(event) {
  event.target.classList.remove("hidden");
  isDragging = false;
}

function swapBoxes(box1Value, box2Value) {
  const box1Index = boxes.findIndex(box => box.textContent === box1Value);
  const box2Index = boxes.findIndex(box => box.textContent === box2Value);

  [boxes[box1Index].textContent, boxes[box2Index].textContent] = [box2Value, box1Value];
}

function shuffleBoxes() {
  for (let i = boxes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [boxes[i].textContent, boxes[j].textContent] = [boxes[j].textContent, boxes[i].textContent];
  }
}

function submitOrder() {
  const currentOrder = boxes.map(box => box.textContent);

  if (arraysAreEqual(currentOrder, originalOrder)) {
    showCongratulations();
  } else {
    flashBoxesRed();
    setTimeout(() => {
      shuffleBoxes();
      resetBoxes();
    }, 500);
  }
}

function arraysAreEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

function flashBoxesRed() {
  boxes.forEach(box => {
    box.classList.add("flash-red");
    setTimeout(() => {
      box.classList.remove("flash-red");
    }, 500);
  });
}

function resetBoxes() {
  if (isDragging) {
    return;
  }

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].textContent = originalOrder[i];
  }
}

function showCongratulations() {
  const congratulations = document.createElement("div");
  congratulations.textContent = "Congratulations! You have placed the boxes in the correct order.";
  congratulations.classList.add("hidden");
  boxContainer.appendChild(congratulations);

  setTimeout(() => {
    congratulations.classList.remove("hidden");
  }, 500);
}