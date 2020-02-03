class Todo {
  constructor(todoList) {
    this.todoList = todoList;
    this.todoId = this.getNextId();
  }

  getNextId() {
    const lastElement = this.todoList[this.todoList.length - 1];
    return lastElement ? lastElement.todoId + 1 : 1;
  }

  addNewTodo(todoName, taskName) {
    const task = new TodoTask([]);
    const todo = {};
    todo['title'] = todoName;
    todo['todoId'] = this.todoId;
    todo['taskName'] = [];
    if (taskName) {
      taskName.map(task.addTask);
    }
    this.todoId++;
    this.todoList.push(todo);
  }

  toJSON() {
    const indentSpace = 2;
    return JSON.stringify(this.todoList, null, indentSpace);
  }

  deleteTodo(todoId) {
    const todoIdIndex = this.todoList.findIndex(todo => todo.todoId === +todoId);
    this.todoList.splice(todoIdIndex, 1);
  }

  deleteTask(todoId, taskId) {
    const todoIdIndex = this.todoList.findIndex(todo => todo.todoId === todoId);
    const task = new TodoTask(this.todoList[todoIdIndex]);
    task.deleteTask(taskId);
  }

  toggleStatus(todoId, taskId) {
    const todoIdIndex = this.todoList.findIndex(todo => todo.todoId === todoId);
    const task = new TodoTask(this.todoList[todoIdIndex]);
    task.toggleStatus(taskId);
  }
}

class TodoTask {
  constructor(tasks) {
    this.tasks = tasks;
    this.taskId = 1;
  }

  addTask(task) {
    const todoTask = {};
    todoTask['title'] = task;
    todoTask['taskId'] = this.taskId;
    todoTask['done'] = false;
    this.taskId++;
    this.tasks.push(todoTask);
  }

  deleteTask(taskId) {
    const taskIdIndex = this.tasks.findIndex(task => task.taskId === taskId);
    this.tasks.splice(taskIdIndex, 1);
  }

  toggleStatus(taskId) {
    const taskIdIndex = this.tasks.findIndex(task => task.taskId === taskId);
    const nextStatus = this.tasks[taskIdIndex]['done'] === false;
    this.tasks[taskIdIndex]['done'] = nextStatus;
  }

  toJSON() {
    const indentSpace = 2;
    return JSON.stringify(this.tasks, null, indentSpace);
  }
}

module.exports = {Todo};
