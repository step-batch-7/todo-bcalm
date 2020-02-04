const sendHttpRequest = function(reqMethod, reqUrl, sendData, callback) {
  const req = new XMLHttpRequest();
  req.onload = function() {
    const correctStatusCode = 200;
    if (this.status === correctStatusCode) {
      callback(JSON.parse(this.responseText));
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
  sendHttpRequest('POST', reqUrl, sendData, createTodo);
  todo.value = '';
};

const addTask = function(e) {
  if (e.key === 'Enter') {
    const id = event.target.id;
    const data = {title: event.target.value, id};
    event.target.value = '';
    const req = new XMLHttpRequest();
    req.onload = function() {
      const correctStatusCode = 200;
      if (this.status === correctStatusCode) {
        createTaskName(JSON.parse(this.responseText), id);
      }
    };
    req.open('POST', 'http://localhost:8080/addTask');
    req.setRequestHeader('content-type', 'application/json');
    req.send(JSON.stringify(data));
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
  sendHttpRequest('POST', reqUrl, sendData, createTodo);
};
