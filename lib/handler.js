const fs = require('fs');
const queryString = require('querystring');
const {App} = require('../lib/app');
const contentTypes = require('../lib/mimeTypes.js');
const {Todo} = require('../lib/todoList');
const {DATA_PATH} = require('../configuration');

const STATIC_FOLDER = `${__dirname}/../public`;

const isFileExists = function(path) {
  const stat = fs.existsSync(path) && fs.statSync(path);
  return !stat || !stat.isFile();
};

const todo = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8') || '[]');
const todoList = new Todo(todo);

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

const serveSignUpPage = function(req, res) {
  const filePath = `${STATIC_FOLDER}/html/signUp.html`;
  const content = fs.readFileSync(filePath);
  sendResponse(res, content, 'text/html');
};

const getAllUserDetail = function() {
  let userData = [];
  const filePath = 'dataBase/userDetail.json';
  if (!isFileExists(filePath)) {
    userData = JSON.parse(fs.readFileSync(filePath));
  }
  return userData;
};

const updateInDataStore = function(data) {
  const dataStringify = JSON.stringify(data);
  const filePath = 'dataBase/userDetail.json';
  fs.writeFileSync(filePath, dataStringify);
};
const redirect = function(res, location) {
  res.statusCode = 302;
  res.setHeader('location', location);
  res.end();
};

const saveUser = function(req, res) {
  const {userName, password, mailId} = req.body;
  const time = +new Date();
  const allUserDetail = getAllUserDetail();
  const newUser = {userName, password, mailId, time};
  allUserDetail.push(newUser);
  updateInDataStore(allUserDetail);
  redirect(res, 'login.html');
};

const serveLogInPage = function(req, res) {
  const filePath = `${STATIC_FOLDER}/html/login.html`;
  const content = fs.readFileSync(filePath);
  sendResponse(res, content, 'text/html');
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
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      data = queryString.parse(data);
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

const editTodo = function(req, res) {
  const {title, id} = req.body;
  todoList.editTodo(title, id);
  fs.writeFileSync(DATA_PATH, todoList.toString());
  sendResponse(res, JSON.stringify(''), 'application/json');
};

const editTask = function(req, res) {
  const {title, id} = req.body;
  const [todoId, taskId] = id.split('_');
  todoList.editTask(title, todoId, taskId);
  fs.writeFileSync(DATA_PATH, todoList.toString());
  sendResponse(res, JSON.stringify(''), 'application/json');
};

const app = new App();

app.use(readBody);
app.get('/getAllTodo', serveTodoList);
app.get('/signUp.html', serveSignUpPage);
app.get('/login.html', serveLogInPage);
app.post('/signUp', saveUser);
app.get('', serveStaticFile);
app.get('', fileNotFound);
app.post('/addTodo', addTodo);
app.delete('/deleteTodo', deleteTodo);
app.post('/addTask', addTask);
app.post('/toggleStatus', toggleStatus);
app.delete('/deleteTask', deleteTask);
app.post('/editTodo', editTodo);
app.post('/editTask', editTask);
app.use(methodNotAllowed);

module.exports = {app};
