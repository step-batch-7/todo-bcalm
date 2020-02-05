class Todo {
  constructor(todoList) {
    this.todoList = todoList;
    this.todoId = this.getNextId();
  }

  getNextId() {
    const lastElement = this.todoList[this.todoList.length - 1];
    return lastElement ? lastElement.todoId + 1 : 1;
  }

  addNewTodo(todoName) {
    const todo = {};
    todo['title'] = todoName;
    todo['todoId'] = this.todoId;
    todo['taskName'] = [];
    this.todoId++;
    this.todoList.push(todo);
    return todo;
  }

  toJSON() {
    const indentSpace = 2;
    return JSON.stringify(this.todoList, null, indentSpace);
  }

  deleteTodo(todoId) {
    const todoIdIndex = this.todoList.findIndex(todo => todo.todoId === +todoId);
    this.todoList.splice(todoIdIndex, 1);
  }

  addTask(title, todoId) {
    const todoIdIndex = this.todoList.findIndex(todo => todo.todoId === +todoId);
    const task = new TodoTask(this.todoList[todoIdIndex].taskName);
    return task.addTask(title);
  }

  deleteTask(todoId, taskId) {
    const todoIdIndex = this.todoList.findIndex(todo => todo.todoId === +todoId);
    console.log(todoIdIndex, todoId);
    const task = new TodoTask(this.todoList[todoIdIndex].taskName);
    task.deleteTask(taskId);
  }
  toggleStatus(todoId, taskId) {
    const todoIdIndex = this.todoList.findIndex(todo => todo.todoId === +todoId);
    const task = new TodoTask(this.todoList[todoIdIndex].taskName);
    task.toggleStatus(taskId);
  }
}

class TodoTask {
  constructor(tasks) {
    this.tasks = tasks;
    this.taskId = this.getNextId();
  }

  getNextId() {
    const lastElement = this.tasks[this.tasks.length - 1];
    return lastElement ? lastElement.taskId + 1 : 1;
  }

  addTask(task) {
    const todoTask = {};
    todoTask['title'] = task;
    todoTask['taskId'] = this.taskId;
    todoTask['done'] = false;
    this.taskId++;
    this.tasks.push(todoTask);
    return this.tasks;
  }

  deleteTask(taskId) {
    const taskIdIndex = this.tasks.findIndex(task => task.taskId === +taskId);
    this.tasks.splice(taskIdIndex, 1);
  }

  toggleStatus(taskId) {
    const taskIdIndex = this.tasks.findIndex(task => task.taskId === +taskId);
    const nextStatus = this.tasks[taskIdIndex]['done'] === false;
    this.tasks[taskIdIndex]['done'] = nextStatus;
  }

  toJSON() {
    const indentSpace = 2;
    return JSON.stringify(this.tasks, null, indentSpace);
  }
}

module.exports = {Todo};
