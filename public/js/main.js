const openSideBar = function() {
  const sideBar = document.getElementById('sideBar');
  sideBar.style['transition'] = 'width 0.1s';
  sideBar.style.width = '20vw';
  sideBar.style['display'] = 'block';
  document.getElementById('menuBar').style['display'] = 'none';
  document.getElementById('crossButton').style['display'] = 'block';
};

const closeSideBar = function() {
  document.getElementById('sideBar').style.width = '0vw';
  document.getElementById('menuBar').style['display'] = 'block';
  document.getElementById('crossButton').style['display'] = 'display';
};

const showAddListOption = function() {
  document.getElementById('addList').style['display'] = 'block';
  document.getElementById('sideBar').style.width = '0vw';
  document.getElementById('menuBar').style['display'] = 'block';
};

const cancelList = function() {
  document.getElementById('taskName').value = '';
  document.getElementById('addList').style['display'] = 'none';
};

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

const createFooter = function() {
  const subTaskName = document.createElement('div');
  subTaskName.className = 'subTaskName';
  return subTaskName;
};

const createToDoBlock = function(todo) {
  const {title, todoId} = todo;
  const header = createHeader(title, todoId);
  const footer = createFooter();
  const toDoBlock = document.createElement('div');
  toDoBlock.className = 'task';
  toDoBlock.appendChild(header);
  toDoBlock.appendChild(footer);
  container.appendChild(toDoBlock);
};

const createTask = function(todoList) {
  const container = document.getElementById('container');
  while (container.firstChild) {
    container.firstChild.remove();
  }
  todoList.forEach(createToDoBlock);
};
