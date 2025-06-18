document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Name validation
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            isValid = false;
        } else if (nameInput.value.trim().length < 3) {
            nameError.textContent = 'Name must be at least 3 characters';
            isValid = false;
        } else {
            nameError.textContent = '';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        // Message validation
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Message is required';
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            isValid = false;
        } else {
            messageError.textContent = '';
        }

        if (isValid) {
            // In a real application, you would send the form data to a server here
            alert('Form submitted successfully!');
            contactForm.reset();
        }
    });

    // To-Do List Functionality
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodo');
    const todoList = document.getElementById('todoList');

    // Load todos from localStorage
    loadTodos();

    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === '') return;

        const todoItem = document.createElement('li');
        todoItem.innerHTML = `
            <span>${todoText}</span>
            <div>
                <button class="complete-btn">Complete</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        todoList.appendChild(todoItem);
        todoInput.value = '';

        // Add event listeners to the new buttons
        todoItem.querySelector('.complete-btn').addEventListener('click', toggleComplete);
        todoItem.querySelector('.delete-btn').addEventListener('click', deleteTodo);

        saveTodos();
    }

    function toggleComplete(e) {
        const todoItem = e.target.closest('li');
        todoItem.classList.toggle('completed');
        saveTodos();
    }

    function deleteTodo(e) {
        const todoItem = e.target.closest('li');
        todoItem.remove();
        saveTodos();
    }

    function saveTodos() {
        const todos = [];
        document.querySelectorAll('#todoList li').forEach(item => {
            todos.push({
                text: item.querySelector('span').textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            const todoItem = document.createElement('li');
            if (todo.completed) {
                todoItem.classList.add('completed');
            }
            todoItem.innerHTML = `
                <span>${todo.text}</span>
                <div>
                    <button class="complete-btn">Complete</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            todoList.appendChild(todoItem);

            // Add event listeners to the loaded buttons
            todoItem.querySelector('.complete-btn').addEventListener('click', toggleComplete);
            todoItem.querySelector('.delete-btn').addEventListener('click', deleteTodo);
        });
    }
});