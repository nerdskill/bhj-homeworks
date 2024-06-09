document.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.reveal');
  
    reveals.forEach(reveal => {
      const revealTop = reveal.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
  
      if (revealTop < windowHeight) {
        reveal.classList.add('reveal_active');
      } else {
        reveal.classList.remove('reveal_active');
      }
    });
  });
  