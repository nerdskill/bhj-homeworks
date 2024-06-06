const holes = document.querySelectorAll('.hole');
const deadCounterElement = document.getElementById('dead');
const lostCounterElement = document.getElementById('lost');
let deadCount = 0;
let lostCount = 0;

function getHole(index) {
  return document.getElementById(`hole${index + 1}`);
}

function checkClick(event) {
  const hole = event.currentTarget;

  if (hole.classList.contains('hole_has-mole')) {
    deadCount++;
    deadCounterElement.textContent = deadCount;
  } else {
    lostCount++;
    lostCounterElement.textContent = lostCount;
  }

  if (deadCount === 10) {
    alert('Вы победили!');
    resetGame();
  } else if (lostCount === 5) {
    alert('Вы проиграли!');
    resetGame();
  }
}

function resetGame() {
  deadCount = 0;
  lostCount = 0;
  deadCounterElement.textContent = deadCount;
  lostCounterElement.textContent = lostCount;
}

holes.forEach(hole => {
  hole.addEventListener('click', checkClick);
});