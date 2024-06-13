document.addEventListener('DOMContentLoaded', () => {
    const progress = document.getElementById('progress');
    const form = document.getElementById('form');
    const fileInput = document.getElementById('file');
    const sendButton = document.getElementById('send');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');

        xhr.upload.onprogress = function(event) {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                progress.value = percentComplete;
            }
        };

        xhr.onload = function() {
            if (xhr.status === 200) {
                alert('Файл успешно загружен!');
            } else {
                alert('Произошла ошибка при загрузке файла.');
            }
        };

        xhr.onerror = function() {
            alert('Произошла ошибка сети при загрузке файла.');
        };

        xhr.send(formData);
    });
});
