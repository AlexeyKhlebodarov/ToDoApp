const input = document.querySelector('.todo-input'),
    todoContainer = document.querySelector('.todo-items'),
    remove = document.querySelector('.todo-options__remove'),
    check = document.querySelector('.todo-options__check'),
    todoInfo = document.querySelector('.todoApp-info'),
    tooltip = document.querySelector('.todoApp-tooltip'),
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

        todoEl.setAttribute('draggable', true);
        todoContainer.appendChild(todoEl);
        todoEl.innerText = todoInput;
        input.value = "";

        todoEl.addEventListener('dragstart', (e) => {
            todoEl.classList.add('todo__item_dragging');
            let img = new Image();
            e.dataTransfer.setDragImage(img, 5000, 5000);
        })

        todoEl.addEventListener('dragend', () => {
            todoEl.classList.remove('todo__item_dragging');
        })

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

//Update LocalStorage

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


//Options

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

todoInfo.addEventListener('mouseenter', () => {
    tooltip.classList.add('todoApp-tooltip_active');
})

todoInfo.addEventListener('mouseout', () => {
    tooltip.classList.remove('todoApp-tooltip_active');
})


//Drag'n Drop
todoContainer.addEventListener('dragover', (e) => {
    e.preventDefault()
    const afterElement = getDragAfterElement(todoContainer, e.clientY)
    const draggable = document.querySelector('.todo__item_dragging')
    if (afterElement == null) {
        todoContainer.appendChild(draggable)
    } else {
        todoContainer.insertBefore(draggable, afterElement)
    }
})

function getDragAfterElement(todoContainer, y) {
    const draggableElements = [...todoContainer.querySelectorAll('li:not(todo__item_dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}
