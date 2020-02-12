const select = document.querySelectorAll.bind(document);
const getElement = document.getElementById.bind(document);

const showAddListOption = function() {
  getElement('addList').style['transform'] = 'scale(1)';
};

const cancelList = function() {
  getElement('listName').value = '';
  getElement('addList').style['transform'] = 'scale(0)';
};

const showMatchedTodo = function(todo, text) {
  const todoTitle = todo.innerText;
  const todoId = todo.parentElement.parentElement.parentElement.id;
  if (todoTitle.includes(text)) {
    getElement(todoId).style.display = 'block';
  } else {
    getElement(todoId).style.display = 'none';
  }
};

const searchByTodo = function() {
  const text = event.target.value;
  const allTodo = select('.todo span');
  allTodo.forEach(todo => showMatchedTodo(todo, text));
};

const matchTask = function(text, task, todo) {
  const taskId = task.parentElement.parentElement.id;
  if (task.innerText.includes(text) && text) {
    getElement(taskId).style['font-weight'] = '600';
  } else {
    getElement(taskId).style['font-weight'] = '100';
  }
};

const showMatchedTask = function(todo, text) {
  const taskTitle = Array.from(select(`[id="${todo.id}"] p`));
  const matchedTask = taskTitle.filter(task => task.innerText.includes(text));
  taskTitle.forEach(task => matchTask(text, task, todo));
  getElement(todo.id).style.display = '';
  if (matchedTask.length === 0 && text) {
    getElement(todo.id).style.display = 'none';
  }
};

const searchByTask = function() {
  const text = event.target.value;
  const allTodo = select('.todo');
  allTodo.forEach(todo => showMatchedTask(todo, text));
};

const matchPassword = function() {
  const reTypePassword = event.target.value;
  const password = document.querySelector('#password').value;
  const confirmPassword = document.querySelector('#confirmPassword');
  const submitButton = document.querySelector('#submit');
  if (!password.startsWith(reTypePassword)) {
    confirmPassword.style['background-color'] = 'red';
    submitButton.disabled = true;
  } else {
    confirmPassword.style['background-color'] = 'white';
    submitButton.disabled = false;
  }
};
