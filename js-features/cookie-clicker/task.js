document.addEventListener('DOMContentLoaded', function () {
    const cookieImg = document.getElementById('cookie');
    const clickCounter = document.getElementById('clicker__counter');
    let clickCount = 0;
    let cookieSize = 200; // начальный размер печеньки
    let isIncreased = true; // флаг для определения увеличения/уменьшения размера печеньки

    let lastClickTime = Date.now();
    let clickSpeed = 0;

    function updateCookieSize() {
        if (isIncreased) {
            cookieSize += 20;
        } else {
            cookieSize -= 20;
        }
        cookieImg.style.width = `${cookieSize}px`;
        cookieImg.style.height = `${cookieSize}px`;
        isIncreased = !isIncreased; // переключаем флаг
    }

    function updateClickSpeed() {
        const now = Date.now();
        const timeDiff = now - lastClickTime;
        if (timeDiff > 0) {
            clickSpeed = 1000 / timeDiff; // расчёт скорости кликов в кликах в секунду
        }
        lastClickTime = now;
    }

    cookieImg.addEventListener('click', function () {
        clickCount++;
        clickCounter.textContent = clickCount;
        updateClickSpeed();
        document.getElementById('clicker__speed').textContent = clickSpeed.toFixed(2); // обновляем скорость кликов
        updateCookieSize();
    });
});
