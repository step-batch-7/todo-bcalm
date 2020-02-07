const sendHttpRequest = function(req, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open(req.method, req.url);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify(req.body));
  xhr.onload = callback;
};

const addExistedTodo = function() {
  const req = {
    method: 'GET',
    url: '/getAllTodo',
    body: ''
  };
  sendHttpRequest(req, function() {
    const response = JSON.parse(this.responseText);
    const correctStatusCode = 200;
    if (this.status === correctStatusCode) {
      createTodo(response);
      response.forEach(todo => createTaskName(todo.taskName, todo.todoId));
    }
  });
};

const addTodo = function() {
  document.getElementById('addList').style['transform'] = 'scale(0)';
  const todo = document.getElementById('todoName');
  const req = {
    method: 'POST',
    url: '/addTodo',
    body: todo.value
  };
  todo.value = '';
  sendHttpRequest(req, function() {
    createToDoBlock(JSON.parse(this.responseText));
  });
};

const deleteTodo = function(taskId) {
  const req = {
    method: 'DELETE',
    url: '/deleteTodo',
    body: taskId
  };
  sendHttpRequest(req, function() {
    deleteTodoItem(req.body);
  });
};

const addTask = function(todoId) {
  const {value} = event.target;
  if (event.key === 'Enter' && value.trim()) {
    const data = {title: value, id: todoId};
    event.target.value = '';
    const req = {method: 'POST', url: '/addTask', body: data};
    sendHttpRequest(req, function() {
      createTaskName(JSON.parse(this.responseText), todoId);
    });
  }
};

const deleteTask = function(taskId) {
  const req = {method: 'DELETE', url: '/deleteTask', body: taskId};
  sendHttpRequest(req, function() {
    deleteTaskName(taskId);
  });
};

const toggleStatus = function(taskId) {
  const req = {method: 'POST', url: '/toggleStatus', body: taskId};
  sendHttpRequest(req, () => {});
};

const editTodo = function(todoId) {
  const value = event.target.innerText;
  event.target.contentEditable = false;
  const data = {title: value, id: todoId};
  const req = {method: 'POST', url: '/editTodo', body: data};
  sendHttpRequest(req, () => {});
};

const editTask = function(taskId) {
  event.target.contentEditable = false;
  const value = event.target.innerText;
  const data = {title: value, id: taskId};
  const req = {method: 'POST', url: '/editTask', body: data};
  sendHttpRequest(req, () => {});
};
