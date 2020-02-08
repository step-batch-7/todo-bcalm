const showAddListOption = function() {
  document.getElementById('addList').style['transform'] = 'scale(1)';
};

const cancelList = function() {
  document.getElementById('listName').value = '';
  document.getElementById('addList').style['transform'] = 'scale(0)';
};

const filterTodo = function(matchList, todo, text) {
  const todoTitle = todo.innerText;
  if (todoTitle.includes(text)) {
    matchList.push(todo.parentElement.parentElement.parentElement.id);
  }
  return matchList;
};

const getAllTodo = () => Array.from(document.querySelectorAll('.todo span'));

const showResult = function(todo, text) {
  const todoTitle = todo.innerText;
  const todoId = todo.parentElement.parentElement.parentElement.id;
  if (todoTitle.includes(text)) {
    document.getElementById(todoId).style.display = 'block';
  } else {
    document.getElementById(todoId).style.display = 'none';
  }
};

const searchByTodo = function() {
  const text = event.target.value;
  const allTodo = getAllTodo();
  allTodo.forEach(todo => showResult(todo, text));
};

