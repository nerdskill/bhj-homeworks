const editor = document.getElementById('editor');

const savedText = localStorage.getItem('textEditorContent');
if (savedText) {
    editor.value = savedText; 
}

editor.addEventListener('input', function() {
    const content = editor.value;
    localStorage.setItem('textEditorContent', content);
});
