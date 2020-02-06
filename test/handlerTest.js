const request = require('supertest');
const {app} = require('../lib/handler');
const fs = require('fs');

const data = require('./resources/testTodoList.json');

after(() => {
  fs.writeFileSync('./test/resources/testTodoList.json', JSON.stringify(data), 'utf8');
});

describe('GET', () => {
  it('should give content of index.html file if request is for root', done => {
    request(app.serve.bind(app))
      .get('/')
      .set('content-type', 'application/json')
      .expect('Content-type', 'text/html')
      .expect(/TODO/)
      .expect(200, done);
  });
});

describe('GET', () => {
  it('should give error if any one give absent file', done => {
    request(app.serve.bind(app))
      .get('/absentFile.js')
      .set('content-type', 'application/json')
      .expect('Content-type', 'text/html')
      .expect('Content-length', '208')
      .expect(404, done);
  });
});

describe('GET/getAllTodo', function() {
  it('should return all existed todoList', function(done) {
    request(app.serve.bind(app))
      .get('/getAllTodo')
      .set('content-type', 'application/json')
      .expect('Content-type', 'application/json')
      .expect(/test for get/)
      .expect(200, done);
  });
});

describe('POST/addTodo', function() {
  it('should add given todo in todo list', function(done) {
    request(app.serve.bind(app))
      .post('/addTodo')
      .send(JSON.stringify('checking'))
      .set('Accept', 'application/json')
      .set('content-type', 'application/json')
      .expect('Content-type', 'application/json')
      .expect(/checking/)
      .expect(200, done);
  });
});

describe('POST/deleteTodo', function() {
  it('should delete given todo in todo list', function(done) {
    request(app.serve.bind(app))
      .delete('/deleteTodo')
      .send('2')
      .set('Accept', 'application/json')
      .set('content-type', 'application/json')
      .expect('Content-type', 'application/json')
      .expect(200, done);
  });
});

describe('POST/addTask', function() {
  it('should add task in todo list', function(done) {
    request(app.serve.bind(app))
      .post('/addTask')
      .send(JSON.stringify({title: 'testing', id: '1'}))
      .set('Accept', 'application/json')
      .set('content-type', 'application/json')
      .expect('Content-type', 'application/json')
      .expect(/testing/)
      .expect(200, done);
  });
});

describe('POST/deleteTask', function() {
  it('should delete task in todo list', function(done) {
    request(app.serve.bind(app))
      .delete('/deleteTask')
      .send(JSON.stringify('1_2'))
      .set('Accept', 'application/json')
      .set('content-type', 'application/json')
      .expect('Content-type', 'application/json')
      .expect(200, done);
  });
});

describe('POST/toggle', function() {
  it('should toggle Status of a particular task', function(done) {
    request(app.serve.bind(app))
      .post('/toggleStatus')
      .send(JSON.stringify('1_1'))
      .set('Accept', 'application/json')
      .set('content-type', 'application/json')
      .expect('Content-type', 'application/json')
      .expect(200, done);
  });
});

describe('PUT/wrong method', function() {
  it('should tell wrong method', function(done) {
    request(app.serve.bind(app))
      .put('/toggleStatus')
      .send(JSON.stringify('1_1'))
      .set('Accept', 'application/json')
      .set('content-type', 'application/json')
      .expect(400, done);
  });
});
