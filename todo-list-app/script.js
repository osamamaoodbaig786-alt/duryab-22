document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    const clearBtn = document.getElementById('clearBtn');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveAndRender() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';

            li.innerHTML = `
                <span class="task-text">${task}</span>
                <div class="actions">
                    <button class="btn-edit" onclick="editTask(${index})">Edit</button>
                    <button class="btn-delete" onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    addBtn.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push(text);
            taskInput.value = '';
            saveAndRender();
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addBtn.click();
    });

    window.editTask = (index) => {
        const updatedTask = prompt('Edit your task:', tasks[index]);
        if (updatedTask !== null && updatedTask.trim() !== '') {
            tasks[index] = updatedTask.trim();
            saveAndRender();
        }
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveAndRender();
    };

    clearBtn.addEventListener('click', () => {
        if (tasks.length > 0 && confirm('Are you sure you want to clear all tasks?')) {
            tasks = [];
            saveAndRender();
        }
    });

    renderTasks();
});