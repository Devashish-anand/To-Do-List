window.addEventListener('load', () => {
  DisplayTodos();

  const newTodoForm = document.querySelector('#new-todo-form');
  newTodoForm.addEventListener('submit', e => {
      e.preventDefault();
      
      const contentInput = e.target.elements.content;
      const content = contentInput.value.trim();

      if (content === '') {
          alert('Please enter a task.');
          return;
      }

      const todos = JSON.parse(localStorage.getItem('todos')) || [];

      const todo = {
          content: content,
          done: false,
          createdAt: new Date().getTime()
      };

      todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(todos));
      contentInput.value = ''; 

      DisplayTodos();
  });
});

function DisplayTodos() {
  const todoList = document.querySelector('#todo-list');
  todoList.innerHTML = '';

  const todos = JSON.parse(localStorage.getItem('todos')) || [];

  todos.forEach(todo => {
      const todoItem = document.createElement('div');
      todoItem.classList.add('todo-item');

      const label = document.createElement('label');
      const input = document.createElement('input');
      const span = document.createElement('span');
      const content = document.createElement('div');
      const actions = document.createElement('div');
      const edit = document.createElement('button');
      const deleteButton = document.createElement('button');

      input.type = 'checkbox';
      input.checked = todo.done;
      span.classList.add('bubble');

      content.classList.add('todo-content');
      actions.classList.add('actions');
      edit.classList.add('edit');
      deleteButton.classList.add('delete');

      content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
      edit.textContent = 'Edit';
      deleteButton.textContent = 'Delete';

      label.appendChild(input);
      label.appendChild(span);
      actions.appendChild(edit);
      actions.appendChild(deleteButton);
      todoItem.appendChild(label);
      todoItem.appendChild(content);
      todoItem.appendChild(actions);

      todoList.appendChild(todoItem);

      if (todo.done) {
          todoItem.classList.add('done');
      }

      input.addEventListener('click', e => {
          todo.done = e.target.checked;
          updateTodoInStorage(todo);
          DisplayTodos();
      });

      edit.addEventListener('click', e => {
          const inputField = content.querySelector('input');
          inputField.removeAttribute('readonly');
          inputField.focus();
          inputField.addEventListener('blur', e => {
              inputField.setAttribute('readonly', true);
              todo.content = e.target.value;
              updateTodoInStorage(todo);
              DisplayTodos();
          });
      });

      deleteButton.addEventListener('click', e => {
          const todos = JSON.parse(localStorage.getItem('todos')) || [];
          const updatedTodos = todos.filter(t => t.createdAt !== todo.createdAt);
          localStorage.setItem('todos', JSON.stringify(updatedTodos));
          DisplayTodos();
      });
  });
}

function updateTodoInStorage(updatedTodo) {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  const index = todos.findIndex(todo => todo.createdAt === updatedTodo.createdAt);
  if (index !== -1) {
      todos[index] = updatedTodo;
      localStorage.setItem('todos', JSON.stringify(todos));
  }
}
