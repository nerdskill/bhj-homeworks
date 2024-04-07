const holes = document.querySelectorAll('.hole');
const deadCounterElement = document.getElementById('dead');
const lostCounterElement = document.getElementById('lost');
let deadCount = 0;
let lostCount = 0;

function showMole() {
  const holeIndex = Math.floor(Math.random() * holes.length);
  const hole = getHole(holeIndex);

  holes.forEach((hole) => {
    hole.classList.remove('hole_has-mole');
  });

  hole.classList.add('hole_has-mole');
}

function checkClick(hole) {
  if (hole.classList.contains('hole_has-mole')) {
    deadCount++;
    deadCounterElement.textContent = deadCount;
    showMole();
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
  showMole();
}

holes.forEach((hole) => {
  hole.addEventListener('click', () => checkClick(hole));
});

showMole();
