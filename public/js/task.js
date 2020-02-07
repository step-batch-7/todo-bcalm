const createTaskInput = function(taskList, id) {
  const status = taskList.done ? 'checked' : 'unchecked';
  const input = document.createElement('div');
  input.className = 'taskTitle';
  input.innerHTML = `<input name="taskName" onclick="toggleStatus('${id}')" 
  ${status} type="checkBox"><p>${taskList.title}</p>`;
  return input;
};

const addTaskList = function(taskList, task, todoId) {
  const title = document.createElement('div');
  const id = `${todoId}_${taskList.taskId}`;
  title.id = id;
  title.className = 'task';
  const input = createTaskInput(taskList, id);
  const deleteButton = createDeleteButton('deleteTask', deleteTask, id);
  title.appendChild(input);
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
