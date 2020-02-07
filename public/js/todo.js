const editTodoTitle = function(todoId) {
  const todo = event.target.parentElement;
  todo.previousSibling.firstChild.contentEditable = 'true';
  const send = document.createElement('img');
  send.src = '/images/send.svg';
  send.className = editTodo;
  send.onclick = () => editTodo(todo, todoId);
  todo.appendChild(send);
  todo.firstChild.style.display = 'none';
};

const createEditButton = function(className, callback, id) {
  const editButton = document.createElement('div');
  editButton.className = className;
  editButton.innerHTML = `<img src="/images/pencil.svg" 
  onclick="(${callback})('${id}')">`;
  return editButton;
};

const createDeleteButton = function(className, callback, id) {
  const deleteButton = document.createElement('div');
  deleteButton.className = className;
  deleteButton.innerHTML = `<i class="fa fa-trash-o"
   onclick="(${callback})('${id}')" aria-hidden="true"></i>`;
  return deleteButton;
};

const createTodoName = function(task) {
  const todoName = document.createElement('div');
  todoName.innerHTML = `<span >${task}</span`;
  todoName.className = 'todoName';
  return todoName;
};

const createHeader = function(task, todoId) {
  const todoName = createTodoName(task);
  const editButton = createEditButton('editTodo', editTodoTitle, todoId);
  const deleteButton = createDeleteButton('delete', deleteTodo, todoId);
  const todoHeader = document.createElement('div');
  todoHeader.className = 'todoHeader';
  todoHeader.appendChild(todoName);
  todoHeader.appendChild(editButton);
  todoHeader.appendChild(deleteButton);
  return todoHeader;
};

const createFooter = function(id) {
  const task = document.createElement('div');
  task.className = 'taskName';
  const input = document.createElement('div');
  input.className = 'input';
  input.innerHTML = `<input name="taskName" id=${id} onkeyup=addTask(${id})
  placeholder="Let's create a task" class="taskTitle" required>`;
  task.appendChild(input);
  return task;
};

const createToDoBlock = function(todo) {
  const {title, todoId} = todo;
  const header = createHeader(title, todoId);
  const footer = createFooter(todoId);
  const toDoBlock = document.createElement('div');
  toDoBlock.className = 'todo';
  toDoBlock.id = todoId;
  toDoBlock.appendChild(header);
  toDoBlock.appendChild(footer);
  container.appendChild(toDoBlock);
};

const createTodo = function(todoList) {
  const container = document.getElementById('container');
  while (container.firstChild) {
    container.firstChild.remove();
  }
  todoList.forEach(createToDoBlock);
};

const deleteTodoItem = function(todoId) {
  document.getElementById(todoId).remove();
};
