const saveTodo = function() {
  document.getElementById('addList').style['display'] = 'none';
  const userTask = document.getElementById('taskName');
  const req = new XMLHttpRequest();
  req.onload = function() {
    const correctStatusCode = 200;
    if (this.status === correctStatusCode) {
      createTodo(JSON.parse(this.responseText));
    }
  };
  req.open('POST', 'http://localhost:8080/addTodo');
  req.setRequestHeader('content-type', 'application/json');
  req.send(JSON.stringify(userTask.value));
  userTask.value = '';
};

const addExistedTodo = function() {
  const req = new XMLHttpRequest();
  req.open('GET', 'http://localhost:8080/getAllTodo');
  req.send();
  req.onload = function() {
    const correctStatusCode = 200;
    if (this.status === correctStatusCode) {
      createTodo(JSON.parse(this.responseText));
    }
  };
};

const deleteTodo = function() {
  const id = JSON.parse(event.target.id);
  const req = new XMLHttpRequest();
  req.open('DELETE', 'http://localhost:8080/deleteTodo');
  req.send(JSON.stringify(id));
  req.onload = function() {
    const correctStatusCode = 200;
    if (this.status === correctStatusCode) {
      createTodo(JSON.parse(this.responseText));
    }
  };
};
