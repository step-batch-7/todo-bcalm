const sendHttpRequest = function(reqMethod, reqUrl, sendData, action, id) {
  const actions = {
    addTask: createTaskName,
    addTodo: createTodo
  };
  const callback = actions[action];
  const req = new XMLHttpRequest();
  req.onload = function() {
    const correctStatusCode = 200;
    if (this.status === correctStatusCode) {
      callback(JSON.parse(this.responseText), id);
    }
  };
  req.open(reqMethod, reqUrl);
  req.setRequestHeader('content-type', 'application/json');
  req.send(sendData);
};

const saveTodo = function() {
  document.getElementById('addList').style['display'] = 'none';
  const todo = document.getElementById('todoName');
  const reqUrl = 'http://localhost:8080/addTodo';
  const sendData = JSON.stringify(todo.value);
  sendHttpRequest('POST', reqUrl, sendData, 'addTodo');
  todo.value = '';
};

const addTask = function(e) {
  if (e.key === 'Enter') {
    const id = event.target.id;
    const data = JSON.stringify({title: event.target.value, id});
    event.target.value = '';
    const reqUrl = 'http://localhost:8080/addTask';
    sendHttpRequest('POST', reqUrl, data, 'addTask', id);
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
  const reqUrl = 'http://localhost:8080/deleteTodo';
  sendHttpRequest('DELETE', reqUrl, sendData, 'addTodo');
};

const deleteTask = function() {
  const taskId = event.target.parentNode.parentNode.id;
  const [id] = taskId.split('_');
  const reqUrl = 'http://localhost:8080/deleteTask';
  sendHttpRequest('DELETE', reqUrl, taskId, 'addTask', id);
};

const toggleStatus = function(event) {
  const taskId = event.target.parentNode.parentNode.id;
  const reqUrl = 'http://localhost:8080/toggleStatus';
  const [id] = taskId.split('_');
  sendHttpRequest('POST', reqUrl, taskId, 'addTask', id);
};
