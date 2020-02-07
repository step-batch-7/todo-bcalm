const editTaskTitle = function(taskId) {
  event.target.contentEditable = 'true';
  event.target.onblur = () => editTask(taskId);
};

const createTaskInput = function(taskList, id) {
  const status = taskList.done ? 'checked' : 'unchecked';
  const input = document.createElement('div');
  input.className = 'taskTitle';
  input.onclick = () => editTaskTitle(id);
  input.innerHTML = `<input name="taskName" onclick="toggleStatus('${id}')" 
  ${status} type="checkBox"><p class="taskTitle">${taskList.title}</p>`;
  return input;
};

const createTaskTitle = function(task, taskList, todoId) {
  const title = document.createElement('div');
  const id = `${todoId}_${taskList.taskId}`;
  title.id = id;
  title.className = task;
  return {title, id};
};

const addTaskList = function(taskDetail, taskList, todoId) {
  const {title, id} = createTaskTitle('task', taskDetail, todoId);
  const input = createTaskInput(taskDetail, id);
  const deleteButton = createDeleteButton('deleteTask', deleteTask, id);
  title.appendChild(input);
  title.appendChild(deleteButton);
  taskList.appendChild(title);
};

const createTaskName = function(taskLists, todoId) {
  const taskNames = document.getElementById(todoId).lastChild;
  const taskList = document.createElement('div');
  taskList.className = 'taskList';
  if (taskNames.childNodes.length > 1) {
    taskNames.lastChild.remove();
  }
  taskLists.forEach(taskDetail => addTaskList(taskDetail, taskList, todoId));
  taskNames.appendChild(taskList);
  taskList.scrollTop = taskList.scrollHeight;
};

const deleteTaskName = function(taskId) {
  document.getElementById(taskId).remove();
};
