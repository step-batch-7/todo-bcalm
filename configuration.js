const {env} = process;

module.exports = {
  DATA_PATH: env.TODO_STORE_PATH || './dataBase/todoList.json'
};
