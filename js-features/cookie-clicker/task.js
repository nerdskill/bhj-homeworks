const cookie = document.getElementById('cookie');
let clickCounter = 0;

cookie.addEventListener('click', () => {
  clickCounter++;
  updateClickCounter();
  animateCookie();
  calculateClicksPerSecond(); 
});

function updateClickCounter() {
    const counterElement = document.getElementById('clicker__counter');
    counterElement.textContent = clickCounter;
  }

  function animateCookie() {
    const originalWidth = 200;
    const originalHeight = 200;
    const maxWidth = 250;
    const maxHeight = 250;
  
    const cookie = document.getElementById('cookie');
  

    cookie.style.width = `${maxWidth}px`;
    cookie.style.height = `${maxHeight}px`;
  
    setTimeout(() => {
      cookie.style.width = `${originalWidth}px`;
      cookie.style.height = `${originalHeight}px`;
    }, 100);
  }

  let startTime;
  let endTime;
  let clicks = 0;
  
  function calculateClicksPerSecond() {
    clicks++;
    endTime = new Date();
  
    if (startTime) {
      const timeDifference = (endTime - startTime) / 1000;
      const clicksPerSecond = clicks / timeDifference;
      document.getElementById('cps').textContent = clicksPerSecond.toFixed(2);
  
      startTime = null;
      clicks = 0;
    } else {
      startTime = new Date();
    }
  }
