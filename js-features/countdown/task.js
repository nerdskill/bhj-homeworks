// Получаем элемент таймера
const timerElement = document.getElementById('timer');

// Стартовое значение таймера (в секундах)
let timeLeft = 59;

// Функция обновления таймера
function updateTimer() {
  // Уменьшаем значение таймера на 1
  timeLeft--;

  // Преобразуем оставшееся время в формат hh:mm:ss
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  // Форматируем время
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Отображаем оставшееся время
  timerElement.textContent = formattedTime;

  // Проверка на окончание времени
  if (timeLeft <= 0) {
    // Останавливаем таймер
    clearInterval(intervalId);

    // Выводим сообщение о победе
    alert('Вы победили в конкурсе!');
  }
}

// Запускаем обновление таймера каждую секунду
const intervalId = setInterval(updateTimer, 1000);
