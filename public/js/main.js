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

const createToDoBlock = function(todoList) {
  const container = document.getElementById('container');
  while (container.firstChild) {
    container.firstChild.remove();
  }
  todoList.forEach(todo => {
    const toDoBlock = document.createElement('div');
    const taskName = document.createElement('div');
    taskName.innerText = todo.name;
    taskName.className = 'taskName';
    const subTaskName = document.createElement('div');
    subTaskName.className = 'subTaskName';
    toDoBlock.className = 'task';
    toDoBlock.appendChild(taskName);
    toDoBlock.appendChild(subTaskName);
    container.appendChild(toDoBlock);
  });
};

const homePage = function() {
  const req = new XMLHttpRequest();
  req.open('GET', 'http://localhost:8080/getAllTodo');
  req.send();
  req.onload = function() {
    if (this.status === 200) {
      createToDoBlock(JSON.parse(this.responseText));
    }
  };
};

const saveList = function() {
  document.getElementById('addList').style['display'] = 'none';
  const userTask = document.getElementById('taskName');
  const task = {name: userTask.value};
  userTask.value = '';
  const req = new XMLHttpRequest();
  req.onload = function() {
    if (this.status === 200) {
      createToDoBlock(JSON.parse(this.responseText));
    }
  };
  req.open('POST', 'http://localhost:8080/');
  req.setRequestHeader('content-type', 'application/json');
  req.send(JSON.stringify(task));
};
