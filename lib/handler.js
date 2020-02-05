const fs = require('fs');
const {App} = require('../lib/app');
const contentTypes = require('../lib/mimeTypes.js');
const {Todo} = require('../lib/todoList');
const {DATA_PATH} = require('../configuration');

const STATIC_FOLDER = `${__dirname}/../public`;
const isFileExists = function(path) {
  const stat = fs.existsSync(path) && fs.statSync(path);
  return !stat || !stat.isFile();
};

const taskName = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const todoList = new Todo(taskName);

const sendResponse = function(res, content, contentType, status = 200) {
  res.writeHead(status, {
    'content-type': contentType,
    'content-length': content.length
  });
  res.write(content);
  res.end();
};

const methodNotAllowed = function(req, res) {
  const statusCode = 400;
  res.writeHead(statusCode);
  res.end('Method Not Allowed');
};

const fileNotFound = function(req, res) {
  const content = fs.readFileSync(`${STATIC_FOLDER}/html/absentFile.html`);
  const statusCode = 404;
  sendResponse(res, content, 'text/html', statusCode);
};

const serveStaticFile = (req, res, next) => {
  req.url = req.url === '/' ? '/html/index.html' : req.url;
  const path = `${STATIC_FOLDER}${req.url}`;
  if (isFileExists(path)) {
    return next();
  }
  const [, extension] = path.match(/.*\.(.*)$/);
  const contentType = contentTypes[extension];
  const content = fs.readFileSync(path);
  sendResponse(res, content, contentType);
};

const readBody = function(req, res, next) {
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  });
  req.on('end', () => {
    if (req.headers['content-type'] === 'application/json' && data) {
      data = JSON.parse(data);
    }
    req.body = data;
    next();
  });
};

const toggleStatus = function(req, res) {
  const [todoId, taskId] = req.body.split('_');
  todoList.toggleStatus(todoId, taskId);
  fs.writeFileSync(DATA_PATH, todoList.toString());
  sendResponse(res, JSON.stringify(''), 'application/json');
};

const serveTodoList = function(req, res) {
  const content = todoList.toString();
  sendResponse(res, content, 'application/json');
};

const addTask = function(req, res) {
  const {title, id} = req.body;
  const content = JSON.stringify(todoList.addTask(title, id));
  fs.writeFileSync(DATA_PATH, todoList.toString());
  sendResponse(res, content, 'application/json');
};

const addTodo = function(req, res) {
  const content = JSON.stringify(todoList.addNewTodo(req.body));
  fs.writeFileSync(DATA_PATH, todoList.toString());
  sendResponse(res, content, 'application/json');
};

const deleteTask = function(req, res) {
  const [todoId, taskId] = req.body.split('_');
  todoList.deleteTask(todoId, taskId);
  fs.writeFileSync(DATA_PATH, todoList.toString());
  sendResponse(res, JSON.stringify(''), 'application/json');
};

const deleteTodo = function(req, res) {
  todoList.deleteTodo(req.body);
  const content = todoList.toString();
  fs.writeFileSync(DATA_PATH, content);
  sendResponse(res, JSON.stringify(''), 'application/json');
};

const app = new App();

app.use(readBody);
app.get('/getAllTodo', serveTodoList);
app.get('', serveStaticFile);
app.get('', fileNotFound);
app.post('/addTodo', addTodo);
app.delete('/deleteTodo', deleteTodo);
app.post('/addTask', addTask);
app.post('/toggleStatus', toggleStatus);
app.delete('/deleteTask', deleteTask);
app.use(methodNotAllowed);

module.exports = {app};
