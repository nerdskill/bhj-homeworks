document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signin__form');
    const signinBlock = document.getElementById('signin');
    const welcomeBlock = document.getElementById('welcome');
    const userIdSpan = document.getElementById('user_id');

    const userId = localStorage.getItem('userId');
    if (userId) {
        userIdSpan.textContent = userId;
        welcomeBlock.classList.add('welcome_active');
        signinBlock.classList.remove('signin_active');
    }

    signinForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const login = signinForm.elements.login.value;
        const password = signinForm.elements.password.value;

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';

        xhr.onload = function() {
            const response = xhr.response;
            if (response.success) {
                const userId = response.user_id;
                localStorage.setItem('userId', userId);

                userIdSpan.textContent = userId;
                welcomeBlock.classList.add('welcome_active');
                signinForm.reset();
                signinBlock.classList.remove('signin_active');
            } else {
                alert('Неверный логин или пароль');
            }
        };

        xhr.onerror = function() {
            alert('Произошла сетевая ошибка');
        };

        const formData = `login=${encodeURIComponent(login)}&password=${encodeURIComponent(password)}`;
        xhr.send(formData);
    });
});
