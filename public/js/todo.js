const createDeleteButton = function(id) {
  const deleteButton = document.createElement('div');
  deleteButton.className = 'delete';
  deleteButton.innerHTML = `<i class="fa fa-trash-o" onclick=deleteTodo()
   id=${id} aria-hidden="true"></i>`;
  return deleteButton;
};

const createHeader = function(task, id) {
  const taskName = document.createElement('div');
  taskName.innerText = task;
  taskName.className = 'taskName';
  const deleteButton = createDeleteButton(id);
  const taskHeader = document.createElement('div');
  taskHeader.className = 'taskHeader';
  taskHeader.appendChild(taskName);
  taskHeader.appendChild(deleteButton);
  return taskHeader;
};

const createAddTask = function(id) {
  const addTask = document.createElement('div');
  addTask.className = 'addTask';
  addTask.innerHTML = `<input name="taskName" id=${id} placeholder="Let's create a task"></input>`;
  return addTask;
};

const createFooter = function(todoId) {
  const subTaskName = document.createElement('div');
  subTaskName.className = 'subTaskName';
  const addTask = createAddTask(todoId);
  subTaskName.appendChild(addTask);
  return subTaskName;
};

const createToDoBlock = function(todo) {
  const {title, todoId} = todo;
  const header = createHeader(title, todoId);
  const footer = createFooter(todoId);
  const toDoBlock = document.createElement('div');
  toDoBlock.className = 'task';
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
