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
      // response.forEach(todo => createTaskName(todo.taskName, todo.todId));
    }
  });
};

const saveTodo = function() {
  document.getElementById('addList').style['display'] = 'none';
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

const deleteTodo = function() {
  const req = {
    method: 'DELETE',
    url: '/deleteTodo',
    body: event.target.parentNode.parentNode.parentNode.id
  };
  sendHttpRequest(req, function() {
    deleteTodoItem(req.body);
  });
};

const addTask = function() {
  //   const {id, value} = event.target;
  //   if (event.key === 'Enter' && value.trim()) {
  //     const data = {title: value, id};
  //     event.target.value = '';
  //     const req = {method: 'POST', url: '/addTask'};
  //     sendHttpRequest(req, data, createTaskName, id);
  //   }
};

const deleteTask = function() {
  //   const taskId = event.target.parentNode.parentNode.id;
  //   const [id] = taskId.split('_');
  //   const req = {method: 'DELETE', url: '/deleteTask'};
  //   sendHttpRequest(req, taskId, createTaskName, id);
};

const toggleStatus = function(event) {
  //   const taskId = event.target.parentNode.parentNode.id;
  //   const [id] = taskId.split('_');
  //   const req = {method: 'POST', url: '/toggleStatus'};
  //   sendHttpRequest(req, sendData, createTaskName, id);
};
