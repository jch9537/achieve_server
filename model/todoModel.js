const connection = require("../database/dbConnection");

module.exports = {
  get: ({ user_id, board_id }, callback) => {
    let sql = `SELECT id, todo_name FROM todos WHERE board_id=${board_id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, result);
      }
    });
  },
  post: ({ board_id, todo_name }, callback) => {
    let sql = `INSERT INTO todos (board_id, todo_name) VALUES (${board_id}, '${todo_name}');`;
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        sql = `SELECT id, todo_name FROM todos WHERE board_id=${board_id};`;
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
  put: ({ todo_id, todo_name }, callback) => {
    let sql = `UPDATE todos SET todo_name='${todo_name}' WHERE id=${todo_id};`;
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        sql = `SELECT id, todo_name FROM todos WHERE id=${todo_id};`;
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
  delete: ({ board_id, todo_id }, callback) => {
    let sql = `DELETE FROM todos WHERE id=${todo_id};`;
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        sql = `SELECT id, todo_name FROM todos WHERE board_id=${board_id};`;
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
