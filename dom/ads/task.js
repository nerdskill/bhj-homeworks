document.addEventListener("DOMContentLoaded", () => {
    const rotators = document.querySelectorAll('.rotator');
  
    rotators.forEach(rotator => {
      let cases = rotator.querySelectorAll('.rotator__case');
      let currentIndex = 0;
      let speed = cases[currentIndex].dataset.speed || 1000;
  
      const rotateCase = () => {
        cases[currentIndex].classList.remove('rotator__case_active');
        currentIndex = (currentIndex + 1) % cases.length;
        let currentCase = cases[currentIndex];
        currentCase.classList.add('rotator__case_active');
        currentCase.style.color = currentCase.dataset.color || '#000';
        speed = currentCase.dataset.speed || 1000;
        setTimeout(rotateCase, speed);
      };
  
      setTimeout(rotateCase, speed);
    });
  });
  