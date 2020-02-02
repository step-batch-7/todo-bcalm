const http = require('http');
const {app} = require('./lib/handler');

const port = 8080;

const server = new http.Server((req, res) => {
  app.serve(req, res);
});

server.listen(port);
