const openSideBar = function(e) {
  const sideBar = document.getElementById('sideBar');
  sideBar.style['transition'] = 'width 0.1s';
  sideBar.style.width = '20vw';
  sideBar.style['display'] = 'block';
  document.getElementById('menuBar').style['display'] = 'none';
  document.getElementById('crossButton').style['display'] = 'block';
};

const closeSideBar = function(e) {
  document.getElementById('sideBar').style.width = '0vw';
  document.getElementById('menuBar').style['display'] = 'block';
  document.getElementById('crossButton').style['display'] = 'none';
};

const showAddListOption = function(e) {
  document.getElementById('addList').style['display'] = 'block';
  document.getElementById('sideBar').style.width = '0vw';
  document.getElementById('menuBar').style['display'] = 'block';
};

const cancelList = function(e) {
  document.getElementById('addList').style['display'] = 'block';
};

const generateToDoList = task => {
  return task.map(c => c.name).join('\n');
};

const saveList = function(e) {
  document.getElementById('addList').style['display'] = 'none';
  const userTask = document.getElementById('taskName');
  const task = {name: userTask.value};
  userTask.value = '';
  const req = new XMLHttpRequest();
  req.onload = function() {
    if (this.status === 200) {
      document.getElementById('todoList').innerText = generateToDoList(
        JSON.parse(this.responseText)
      );
    }
  };
  req.open('POST', 'http://localhost:8080/');
  req.setRequestHeader('content-type', 'application/json');
  req.send(JSON.stringify(task));
};
