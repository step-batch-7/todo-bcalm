const sendHttpRequest = function(req, sendData, action, id) {
  const actions = {
    addTask: createTaskName,
    addTodo: createTodo
  };
  const callback = actions[action];
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    const correctStatusCode = 200;
    if (this.status === correctStatusCode) {
      callback(JSON.parse(this.responseText), id);
    }
  };
  xhr.open(req.method, req.url);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(sendData);
};

const saveTodo = function() {
  document.getElementById('addList').style['display'] = 'none';
  const todo = document.getElementById('todoName');
  const sendData = JSON.stringify(todo.value);
  const req = {method: 'POST', url: 'http://localhost:8080/addTodo'};
  sendHttpRequest(req, sendData, 'addTodo');
  todo.value = '';
};

const addTask = function(e) {
  if (e.key === 'Enter') {
    const id = event.target.id;
    const data = JSON.stringify({title: event.target.value, id});
    event.target.value = '';
    const req = {method: 'POST', url: 'http://localhost:8080/addTask'};
    sendHttpRequest(req, data, 'addTask', id);
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
  req.open('GET', 'http://localhost:8080/getAllTodo');
  req.setRequestHeader('content-type', 'application/json');
  req.send('');
};

const deleteTodo = function() {
  const sendData = event.target.parentNode.parentNode.parentNode.id;
  const req = {method: 'DELETE', url: 'http://localhost:8080/deleteTodo'};
  sendHttpRequest(req, sendData, 'addTodo');
};

const deleteTask = function() {
  const taskId = event.target.parentNode.parentNode.id;
  const [id] = taskId.split('_');
  const req = {method: 'DELETE', url: 'http://localhost:8080/deleteTask'};
  sendHttpRequest(req, taskId, 'addTask', id);
};

const toggleStatus = function(event) {
  const taskId = event.target.parentNode.parentNode.id;
  const [id] = taskId.split('_');
  const req = {method: 'POST', url: 'http://localhost:8080/toggleStatus'};
  sendHttpRequest(req, sendData, 'addTask', id);
};
