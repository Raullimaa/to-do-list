// Seleção de elementos
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');

let oldInputValue;

// Funções

const saveTodo = (text) => {
    const todo = document.createElement('div');
    todo.classList.add('todo');

    const todoTitle = document.createElement('h3');
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement('button');
    doneBtn.classList.add('finish-todo');
    doneBtn.innerHTML = '<i class="fas fa-check"></i>';
    todo.appendChild(doneBtn);
  
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-todo');
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    todo.appendChild(editBtn);
 
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-todo');
    deleteBtn.innerHTML = '<i class="fas fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();

};

const toggleForms = () => {
    editForm.classList.toggle('hide');
    todoForm.classList.toggle('hide');
    todoList.classList.toggle('hide');
};

const updateTodo = (text) => {

    const todos = document.querySelectorAll('.todo');
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3')

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    });
}

// Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = todoInput.value;
   
    if (inputValue) {
    saveTodo(inputValue);  
    }
});

document.addEventListener("click", (e) => {

    const targerEl = e.target;
    const parentEl = targerEl.closest('div');
    let todoTitle = parentEl.querySelector('h3');

    if(parentEl && parentEl.querySelector('h3')) {
        todoTitle = parentEl.querySelector('h3').innerText;
    }

    if (targerEl.classList.contains('finish-todo')) {
        parentEl.classList.toggle('done');
    }

    if (targerEl.classList.contains('delete-todo')) {
        parentEl.remove();
    }
    if (targerEl.classList.contains('edit-todo')) {
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;
// atualizar
    if (editInputValue) {
        updateTodo(editInputValue);
    }
    toggleForms();
    });