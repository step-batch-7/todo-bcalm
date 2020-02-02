const fs = require('fs');
const queryString = require('querystring');
const {App} = require('../lib/app');
const contentTypes = require('../lib/mimeTypes.js');

const STATIC_FOLDER = `${__dirname}/../public`;
const isFileExists = function(path) {
  const stat = fs.existsSync(path) && fs.statSync(path);
  return !stat || !stat.isFile();
};

const sendResponse = function(res, content, contentType, status = 200) {
  res.writeHead(status, {
    'content-type': contentType,
    'content-length': content.length
  });
  res.write(content);
  res.end();
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
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      data = queryString.parse(data);
    }
    req.body = data;
    next();
  });
};

const serveTaskName = function(req, res) {
  const indentSpace = 2;
  const filePath = './dataBase/taskName.json';
  const taskName = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  taskName.push(JSON.parse(req.body));
  const content = JSON.stringify(taskName, null, indentSpace);
  fs.writeFileSync(filePath, content);
  sendResponse(res, content, 'application/json');
};

const methodNotAllowed = function(req, res) {
  const statusCode = 400;
  res.writeHead(statusCode);
  res.end('Method Not Allowed');
};

const app = new App();

app.use(readBody);
app.get('', serveStaticFile);
app.get('', fileNotFound);
app.post('', serveTaskName);
app.use(methodNotAllowed);

module.exports = {app};