const taskInput = document.querySelector('.new-task');
const btnTask = document.querySelector('.btn-task');
const tasks = document.querySelector('.tasks');

function createLi() {
    const li = document.createElement('li');
    return li;
}

function clearInput() {
    taskInput.value = '';
    taskInput.focus();
}

function createButtonDelete(li) {
    li.innerText += ' ';
    const buttonDelete = document.createElement('button');
    buttonDelete.innerText = 'Apagar';
    buttonDelete.setAttribute('class', 'delete');
    buttonDelete.setAttribute('title', 'Apagar essa tarefa')
    li.appendChild(buttonDelete);
}

function createTask(textoInput) {
    const li = createLi();
    li.innerText = textoInput;
    tasks.appendChild(li);
    clearInput();
    createButtonDelete(li);
    saveTask();
}

function saveTask() {
    const liTasks = tasks.querySelectorAll('li');
    const listTasks = [];

    for (let task of liTasks) {
        let taskText = task.innerText;
        taskText = taskText.replace('Apagar', '').trim();
        listTasks.push(taskText);
    }

    const tasksJSON = JSON.stringify(listTasks);
    localStorage.setItem('tasks', tasksJSON);
}

function addSavedTasks() {
    const tasks = localStorage.getItem('tasks');
    const listTasks = JSON.parse(tasks);

    for(let task of listTasks) {
        createTask(task);
    }
}

addSavedTasks();

taskInput.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if (!taskInput.value) return;
        createTask(taskInput.value);
    }
})

btnTask.addEventListener('click', function () {
    if (!taskInput.value) return;
    createTask(taskInput.value);
});

document.addEventListener('click', function (e) {
    const el = e.target;
    if (el.classList.contains('delete')) {
        el.parentElement.remove();
        saveTask();
    }
});


