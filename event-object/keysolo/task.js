class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timeElement = container.querySelector('.status__time');

    this.reset();
    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  registerEvents() {
    document.addEventListener('keydown', (event) => {
      const keyPressed = event.key.toLowerCase();
      const currentChar = this.currentSymbol.textContent.toLowerCase();

      if (keyPressed === currentChar) {
        this.success();
      } else {
        this.fail();
      }
    });
  }

  success() {
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol.classList.remove('symbol_current');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
    } else {
      if (++this.winsElement.textContent === 10) {
        alert('Победа!');
        this.reset();
      } else {
        this.setNewWord();
      }
    }
  }

  fail() {
    if (++this.lossElement.textContent === 3) {
      alert('Вы проиграли!');
      this.reset();
    } else {
      this.setNewWord();
    }
  }

  setNewWord() {
    const word = this.getWord();
    this.renderWord(word);
    this.startTimer(word.length);
  }

  getWord() {
    const words = [
      'bob',
      'awesome',
      'netology',
      'hello',
      'kitty',
      'rock',
      'youtube',
      'popcorn',
      'cinema',
      'love',
      'javascript'
    ];
    const index = Math.floor(Math.random() * words.length);
    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current' : ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }

  startTimer(seconds) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timeElement.textContent = seconds;

    const updateTimer = () => {
      if (seconds > 0) {
        this.timeElement.textContent = --seconds;
        this.timer = setTimeout(updateTimer, 1000);
      } else {
        this.fail();
      }
    };

    this.timer = setTimeout(updateTimer, 1000);
  }
}

new Game(document.getElementById('game'));
