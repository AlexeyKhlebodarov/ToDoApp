const input = document.querySelector('.todo-input'),
    todoContainer = document.querySelector('.todo-items'),
    remove = document.querySelector('.todo-options__remove'),
    check = document.querySelector('.todo-options__check'),
    LStodos = JSON.parse(localStorage.getItem('todos'));

if (LStodos) {
    LStodos.forEach(item => addTodoItem(item))
}

input.addEventListener('keydown', ({ key }) => {
    if (key === 'Enter') {
        addTodoItem();
    }
})

function addTodoItem(todoItem) {
    let todoInput = input.value;
    if (todoItem) {
        todoInput = todoItem.content;
    }

    if (todoInput) {
        const todoEl = document.createElement('li');
        if (todoItem && todoItem.done) {
            todoEl.classList.add('done');
        }

        todoEl.innerText = todoInput;
        todoContainer.appendChild(todoEl);
        input.value = "";

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('done');
            updateLS();
        })

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoEl.remove();
            updateLS();
        })
        updateLS();
    }
}

function updateLS() {
    const todoItems = document.querySelectorAll("li");
    const todos = [];
    todoItems.forEach(item => {
        todos.push({
            content: item.innerText,
            done: item.classList.contains('done')
        })
    })
    localStorage.setItem('todos', JSON.stringify(todos));
}


remove.addEventListener('click', () => {
    const todoItems = document.querySelectorAll("li");
    todoItems.forEach(item => {
        item.remove();
        localStorage.removeItem('todos');
    })
    localStorage.clear();
})

check.addEventListener('click', () => {
    const todoItems = document.querySelectorAll("li");
    if (Array.from(todoItems).every(item => item.classList.contains('done'))) {
        todoItems.forEach(item => item.classList.remove('done'));
    } else {
        todoItems.forEach(item => item.classList.add('done'));
    }
    updateLS();
})