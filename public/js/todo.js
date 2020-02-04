const createDeleteButton = function() {
  const deleteButton = document.createElement('div');
  deleteButton.className = 'delete';
  deleteButton.innerHTML = `<i class="fa fa-trash-o" onclick=deleteTodo()
    aria-hidden="true"></i>`;
  return deleteButton;
};

const createHeader = function(task) {
  const todoName = document.createElement('div');
  todoName.innerText = task;
  todoName.className = 'todoName';
  const deleteButton = createDeleteButton();
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
  placeholder="Let's create a task" class="taskTitle"></input>`;
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

const addTaskList = function(taskList, task) {
  const title = document.createElement('div');
  title.id = taskList.taskId;
  title.className = 'task';
  title.innerHTML = `<input name="taskName" type="checkBox">${taskList.title}</input>`;
  task.appendChild(title);
};

const createTaskName = function(taskLists, todoId) {
  const taskNames = document.getElementById(todoId).lastChild;
  const task = document.createElement('div');
  task.className = 'taskList';
  if (taskNames.childNodes.length > 1) {
    taskNames.lastChild.remove();
  }
  taskLists.forEach(taskList => addTaskList(taskList, task));
  taskNames.appendChild(task);
};
