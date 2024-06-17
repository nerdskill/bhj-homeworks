const editor = document.getElementById('editor');

editor.value = localStorage.getItem('textEditorContent') || '';

editor.addEventListener('input', function() {
    localStorage.setItem('textEditorContent', editor.value);
});
