const sendHttpRequest = function(req, sendData, callback, id) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    const correctStatusCode = 200;
    if (this.status === correctStatusCode) {
      callback(JSON.parse(this.responseText), id);
    }
  };
  xhr.open(req.method, req.url);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify(sendData));
};

const saveTodo = function() {
  document.getElementById('addList').style['display'] = 'none';
  const todo = document.getElementById('todoName');
  const sendData = todo.value;
  const req = {method: 'POST', url: '/addTodo'};
  sendHttpRequest(req, sendData, createToDoBlock);
  todo.value = '';
};

const addTask = function() {
  const {id, value} = event.target;
  if (event.key === 'Enter' && value.trim()) {
    const data = {title: value, id};
    event.target.value = '';
    const req = {method: 'POST', url: '/addTask'};
    sendHttpRequest(req, data, createTaskName, id);
  }
};

const addExistedTodo = function() {
  const req = new XMLHttpRequest();
  req.onload = function() {
    const correctStatusCode = 200;
    if (this.status === correctStatusCode) {
      const response = JSON.parse(this.responseText);
      createTodo(response);
      response.forEach(todo => createTaskName(todo.taskName, todo.todoId));
    }
  };
  req.open('GET', '/getAllTodo');
  req.setRequestHeader('content-type', 'application/json');
  req.send();
};

const deleteTodo = function() {
  const sendData = event.target.parentNode.parentNode.parentNode.id;
  const req = {method: 'DELETE', url: '/deleteTodo'};
  sendHttpRequest(req, sendData, createTodo);
};

const deleteTask = function() {
  const taskId = event.target.parentNode.parentNode.id;
  const [id] = taskId.split('_');
  const req = {method: 'DELETE', url: '/deleteTask'};
  sendHttpRequest(req, taskId, createTaskName, id);
};

const toggleStatus = function(event) {
  const taskId = event.target.parentNode.parentNode.id;
  const [id] = taskId.split('_');
  const req = {method: 'POST', url: '/toggleStatus'};
  sendHttpRequest(req, sendData, createTaskName, id);
};
