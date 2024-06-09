document.addEventListener("DOMContentLoaded", () => {
    const book = document.getElementById("book");
    const fontSizeControls = document.querySelectorAll(".book__control_font-size .font-size");
    const colorControls = document.querySelectorAll(".book__control_color .color");
    const backgroundControls = document.querySelectorAll(".book__control_background .color");
  
    function setActiveClass(controls, activeControl) {
      controls.forEach(control => {
        control.classList.remove("font-size_active", "color_active");
      });
      activeControl.classList.add(activeControl.classList.contains("font-size") ? "font-size_active" : "color_active");
    }
  
    function setBookClass(className) {
      book.classList.remove("book_fs-small", "book_fs-big", "book_color-gray", "book_color-whitesmoke", "book_color-black", "book_bg-gray", "book_bg-black", "book_bg-white");
      if (className) {
        book.classList.add(className);
      }
    }
  
    fontSizeControls.forEach(control => {
      control.addEventListener("click", (event) => {
        event.preventDefault();
        setActiveClass(fontSizeControls, control);
        const size = control.dataset.size;
        if (size === "small") {
          setBookClass("book_fs-small");
        } else if (size === "big") {
          setBookClass("book_fs-big");
        } else {
          setBookClass(null);
        }
      });
    });
  
    colorControls.forEach(control => {
      control.addEventListener("click", (event) => {
        event.preventDefault();
        setActiveClass(colorControls, control);
        const color = control.dataset.textColor;
        setBookClass(`book_color-${color}`);
      });
    });
  
    backgroundControls.forEach(control => {
      control.addEventListener("click", (event) => {
        event.preventDefault();
        setActiveClass(backgroundControls, control);
        const bgColor = control.dataset.bgColor;
        setBookClass(`book_bg-${bgColor}`);
      });
    });
  });
  