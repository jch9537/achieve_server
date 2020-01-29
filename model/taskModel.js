const connection = require("../database/dbConnection");

module.exports = {
  get: ({ todo_id }, callback) => {
    let sql = `SELECT id, task_name FROM tasks WHERE todo_id=${todo_id};`;
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, result);
      }
    });
  },
  post: ({ todo_id, newTask }, callback) => {
    let sql = `INSERT INTO tasks (todo_id, task_name) VALUES (${todo_id}, '${newTask}');`;
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        sql = `SELECT id, task_name FROM tasks WHERE todo_id=${todo_id};`;
        connection.query(sql, (err, result) => {
          if (err) {
            return callback(err, null);
          } else {
            return callback(null, result);
          }
        });
      }
    });
  },
  put: ({ task_id, changeTask }, callback) => {
    let sql = `UPDATE tasks SET task_name='${changeTask}' WHERE id=${task_id};`;
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        sql = `SELECT id, task_name FROM tasks WHERE id=${task_id};`;
        connection.query(sql, (err, result) => {
          if (err) {
            return callback(err, null);
          } else {
            return callback(null, result);
          }
        });
      }
    });
  },

  delete: ({ todo_id, task_id }, callback) => {
    let sql = `DELETE FROM tasks WHERE id=${task_id};`;
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        sql = `SELECT id, task_name FROM tasks WHERE todo_id=${todo_id};`;
        connection.query(sql, (err, result) => {
          if (err) {
            return callback(err, null);
          } else {
            return callback(null, result);
          }
        });
      }
    });
  }
};
