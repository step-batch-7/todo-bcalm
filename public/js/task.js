const editTaskTitle = function(taskId) {
  const task = event.target.parentElement;
  task.previousSibling.lastChild.contentEditable = 'true';
  const send = document.createElement('img');
  send.src = '/images/send.svg';
  send.className = editTask;
  send.onclick = () => editTask(task, taskId);
  task.appendChild(send);
  task.firstChild.style.display = 'none';
};

const createTaskInput = function(taskList, id) {
  const status = taskList.done ? 'checked' : 'unchecked';
  const input = document.createElement('div');
  input.className = 'taskTitle';
  input.innerHTML = `<input name="taskName" onclick="toggleStatus('${id}')" 
  ${status} type="checkBox"><p>${taskList.title}</p>`;
  return input;
};

const createTaskTitle = function(task, taskList, todoId) {
  const title = document.createElement('div');
  const id = `${todoId}_${taskList.taskId}`;
  title.id = id;
  title.className = 'task';
  return {title, id};
};

const addTaskList = function(taskList, task, todoId) {
  const {title, id} = createTaskTitle(task, taskList, todoId);
  const input = createTaskInput(taskList, id);
  const editButton = createEditButton('editTask', editTaskTitle, id);
  const deleteButton = createDeleteButton('deleteTask', deleteTask, id);
  title.appendChild(input);
  title.appendChild(editButton);
  title.appendChild(deleteButton);
  task.appendChild(title);
};

const createTaskName = function(taskLists, todoId) {
  const taskNames = document.getElementById(todoId).lastChild;
  const task = document.createElement('div');
  task.className = 'taskList';
  if (taskNames.childNodes.length > 1) {
    taskNames.lastChild.remove();
  }
  taskLists.forEach(taskList => addTaskList(taskList, task, todoId));
  taskNames.appendChild(task);
};

const deleteTaskName = function(taskId) {
  document.getElementById(taskId).remove();
};
