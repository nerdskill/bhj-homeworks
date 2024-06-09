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
  
    function setBookClass(newClass, classPrefix) {
      const currentClasses = book.className.split(" ").filter(cls => !cls.startsWith(classPrefix));
      currentClasses.push(newClass);
      book.className = currentClasses.join(" ");
    }
 
    fontSizeControls.forEach(control => {
      control.addEventListener("click", (event) => {
        event.preventDefault();
        setActiveClass(fontSizeControls, control);
        const size = control.dataset.size;
        if (size === "small") {
          setBookClass("book_fs-small", "book_fs-");
        } else if (size === "big") {
          setBookClass("book_fs-big", "book_fs-");
        } else {
          setBookClass("", "book_fs-");
        }
      });
    });
 
    colorControls.forEach(control => {
      control.addEventListener("click", (event) => {
        event.preventDefault();
        setActiveClass(colorControls, control);
        const color = control.dataset.textColor;
        setBookClass(`book_color-${color}`, "book_color-");
      });
    });
  
    backgroundControls.forEach(control => {
      control.addEventListener("click", (event) => {
        event.preventDefault();
        setActiveClass(backgroundControls, control);
        const bgColor = control.dataset.bgColor;
        setBookClass(`book_bg-${bgColor}`, "book_bg-");
      });
    });
  });
  