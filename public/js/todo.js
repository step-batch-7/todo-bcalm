const createDeleteButton = function(className, callback) {
  const deleteButton = document.createElement('div');
  deleteButton.className = className;
  deleteButton.innerHTML = `<i class="fa fa-trash-o" onclick="(${callback})()"
    aria-hidden="true"></i>`;
  return deleteButton;
};

const createHeader = function(task) {
  const todoName = document.createElement('div');
  todoName.innerText = task;
  todoName.className = 'todoName';
  const deleteButton = createDeleteButton('delete', deleteTodo);
  const todoHeader = document.createElement('div');
  todoHeader.className = 'todoHeader';
  todoHeader.appendChild(todoName);
  todoHeader.appendChild(deleteButton);
  return todoHeader;
};

const createFooter = function(id) {
  const task = document.createElement('div');
  task.className = 'taskName';
  const input = document.createElement('div');
  input.className = 'input';
  input.innerHTML = `<input name="taskName" id=${id} onkeyup=addTask(event)
  placeholder="Let's create a task" class="taskTitle" required>`;
  task.appendChild(input);
  return task;
};

const createToDoBlock = function(todo) {
  const {title, todoId} = todo;
  const header = createHeader(title);
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
