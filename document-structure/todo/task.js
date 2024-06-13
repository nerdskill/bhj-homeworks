document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task__input');
    const taskList = document.getElementById('tasks__list');

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };

    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('.task__title').forEach(taskTitle => {
            tasks.push(taskTitle.textContent.trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTaskToDOM = (taskText) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.innerHTML = `
            <div class="task__title">
                ${taskText}
            </div>
            <a href="#" class="task__remove">&times;</a>
        `;

        taskDiv.querySelector('.task__remove').addEventListener('click', (event) => {
            event.preventDefault();
            taskDiv.remove();
            saveTasks();
        });

        taskList.appendChild(taskDiv);
    };

    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && taskInput.value.trim() !== '') {
            addTaskToDOM(taskInput.value.trim());
            taskInput.value = '';
            saveTasks();
        }
    });

    loadTasks();
});
