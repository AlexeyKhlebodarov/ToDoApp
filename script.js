const form = document.querySelector('.todo'),
    input = document.querySelector('.todo-input'),
    todos = document.querySelector('.todo-items'),
    remove = document.querySelector('.todo-options__remove'),
    check = document.querySelector('.todo-options__check'),
    LStodos = JSON.parse(localStorage.getItem('todos'));

if (LStodos) {
    LStodos.forEach(item => addTodoItem(item))
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodoItem();
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
        todos.appendChild(todoEl);
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
    const todos = [];
    todoItems.forEach(item => {
        todos.push({
            content: item.innerText,
            done: item.classList.contains('done')
        })
    })
    localStorage.setItem('todos', JSON.stringify(todos));
}
