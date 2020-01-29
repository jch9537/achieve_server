const connection = require("../database/dbConnection");

module.exports = {
  get: ({ user_id }, callback) => {
    let sql = `SELECT id, board_name FROM boards WHERE user_id=${user_id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, result);
      }
    });
  },
  getOne: ({ board_id }, callback) => {
    let sql = `SELECT id, board_name FROM boards WHERE id=${board_id};`;
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, result);
      }
    });
  },
  post: ({ user_id, newBoard }, callback) => {
    let sql = `INSERT INTO boards (user_id, board_name) VALUES (${user_id}, '${newBoard}');`;
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        sql = `SELECT id, board_name FROM boards WHERE user_id=${user_id};`;
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
  put: ({ board_id, changeBoard }, callback) => {
    let sql = `UPDATE boards SET board_name='${changeBoard}' WHERE id=${board_id};`;
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        sql = `SELECT id, board_name FROM boards WHERE id=${board_id}`;
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
  delete: ({ user_id, board_id }, callback) => {
    let sql = `DELETE FROM boards WHERE id=${board_id};`;
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        sql = `SELECT id, board_name FROM boards WHERE user_id=${user_id};`;
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
