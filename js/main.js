const taskInput = document.querySelector('.new-task');
const btnTask = document.querySelector('.btn-task');
const tasks = document.querySelector('.tasks');

function createCheckBox() {
    const check = document.createElement('input');
    check.type = 'checkbox';
    return check;
}

function createLi() {
    const li = document.createElement('li');
    return li;
}

function clearInput() {
    taskInput.value = '';
    taskInput.focus();
}

function createButtonDelete() {
    const buttonDelete = document.createElement('button');
    buttonDelete.innerText = 'Apagar';
    buttonDelete.className = 'delete';
    buttonDelete.title = 'Apagar essa tarefa';
    return buttonDelete;
}

function createTaskElement(text, done = false) {
    const li = createLi();

    const check = createCheckBox();
    check.checked = done;

    const span = document.createElement('span');
    span.innerText = text;

    const btnDel = createButtonDelete();

    li.appendChild(check);
    li.appendChild(span);
    li.appendChild(document.createTextNode(' '));
    li.appendChild(btnDel);

    if (done) {
        span.classList.add('done');
    }

    check.addEventListener('change', function () {
        if (check.checked) {
            span.classList.add('done');
        } else {
            span.classList.remove('done');
        }
        saveTask();
    });

    btnDel.addEventListener('click', function () {
        li.remove();
        saveTask();
    });

    return li;
}

function createTask(textoInput) {
    const li = createTaskElement(textoInput, false);
    tasks.appendChild(li);
    clearInput();
    saveTask();
}

function saveTask() {
    const liTasks = tasks.querySelectorAll('li');
    const listTasks = [];

    for (let task of liTasks) {
        const span = task.querySelector('span');
        const checkbox = task.querySelector('input[type="checkbox"]');
        if (!span) continue;
        listTasks.push({
            text: span.innerText,
            done: checkbox ? checkbox.checked : false
        });
    }

    localStorage.setItem('tasks', JSON.stringify(listTasks));
}

function addSavedTasks() {
    const tasksString = localStorage.getItem('tasks');
    if (!tasksString) return;
    let listTasks;
    try {
        listTasks = JSON.parse(tasksString);
    } catch (e) {
        return;
    }
    for (let t of listTasks) {
        const li = createTaskElement(t.text, t.done);
        tasks.appendChild(li);
    }
}

addSavedTasks();

taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        if (!taskInput.value) return;
        createTask(taskInput.value.trim());
    }
});

btnTask.addEventListener('click', function () {
    if (!taskInput.value) return;
    createTask(taskInput.value.trim());
});