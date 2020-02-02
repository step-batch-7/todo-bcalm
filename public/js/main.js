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
  document.getElementById('crossButton').style['display'] = 'none';
};

const showAddListOption = function() {
  document.getElementById('addList').style['display'] = 'block';
  document.getElementById('sideBar').style.width = '0vw';
  document.getElementById('menuBar').style['display'] = 'block';
};

const cancelList = function() {
  document.getElementById('addList').style['display'] = 'block';
};

const saveList = function() {
  document.getElementById('addList').style['display'] = 'none';
  const userTask = document.getElementById('taskName');
  const task = {name: userTask.value};
  userTask.value = '';
  const req = new XMLHttpRequest();
  req.onload = function() {
    if (this.status === 200) {
      const allTasks = JSON.parse(this.responseText)
        .map(task => task.name)
        .join('\n');
    }
    document.getElementById('todoList').innerText = allTasks;
  };
  req.open('POST', 'http://localhost:8080/');
  req.setRequestHeader('content-type', 'application/json');
  req.send(JSON.stringify(task));
};
