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
  const req = {method: 'POST', url: '/addTodo'};
  sendHttpRequest(req, sendData, 'addTodo');
  todo.value = '';
};

const addTask = function() {
  const {id, value} = event.target;
  if (event.key === 'Enter' && value.trim()) {
    const data = JSON.stringify({title: value, id});
    event.target.value = '';
    const req = {method: 'POST', url: '/addTask'};
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
  req.open('GET', '/getAllTodo');
  req.setRequestHeader('content-type', 'application/json');
  req.send();
};

const deleteTodo = function() {
  const sendData = event.target.parentNode.parentNode.parentNode.id;
  const req = {method: 'DELETE', url: '/deleteTodo'};
  sendHttpRequest(req, sendData, 'addTodo');
};

const deleteTask = function() {
  const taskId = event.target.parentNode.parentNode.id;
  const [id] = taskId.split('_');
  const req = {method: 'DELETE', url: '/deleteTask'};
  sendHttpRequest(req, taskId, 'addTask', id);
};

const toggleStatus = function(event) {
  const taskId = event.target.parentNode.parentNode.id;
  const [id] = taskId.split('_');
  const req = {method: 'POST', url: '/toggleStatus'};
  sendHttpRequest(req, sendData, 'addTask', id);
};
