function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';').map(c => c.trim());
    const cookie = cookies.find(c => c.startsWith(nameEQ));
    return cookie ? cookie.substring(nameEQ.length) : null;
}

const modal = document.getElementById('subscribe-modal');
const modalClose = document.querySelector('.modal__close');

if (!getCookie('modalClosed')) {
    modal.classList.add('modal_active');
}

modalClose.addEventListener('click', function() {
    modal.classList.remove('modal_active');
    setCookie('modalClosed', true, 30); 
});
