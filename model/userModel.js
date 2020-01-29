const connection = require("../database/dbConnection");

module.exports = {
  signup: ({ name, email, password }, callback) => {
    const query = `INSERT INTO users (name, email, password) VALUES ( '${name}', '${email}','${password}');`;
    connection.query(query, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, result);
      }
    });
  },
  signin: ({ email, password }, callback) => {
    const query = `SELECT * FROM users WHERE email='${email}';`;
    connection.query(query, (err, result) => {
      if (err) {
        return callback(err, null);
      } else if (!result.length) {
        return callback(null, "No match Email");
      } else {
        const query = `SELECT * FROM users WHERE email='${email}' AND password='${password}';`;
        connection.query(query, (err, result) => {
          if (err) {
            return callback(err, null);
          } else {
            if (!result.length) {
              return callback(null, "No match Password");
            } else {
              return callback(null, result);
            }
          }
        });
      }
    });
  },
  get: ({ id }, callback) => {
    let sql = `SELECT id, name FROM users WHERE id=${id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, result);
      }
    });
  },
  put: ({ id, name, password }, callback) => {
    let sql;
    if (!name) {
      sql = `UPDATE users SET password='${password}' WHERE id=${id};`;
    } else if (!password) {
      sql = `UPDATE users SET name='${name}' WHERE id=${id};`;
    } else {
      sql = `UPDATE users SET name='${name}', password='${password}' WHERE id=${id};`;
    }
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, result);
      }
    });
  },
  delete: ({ id }, callback) => {
    let sql = `DELETE FROM users WHERE id=${id};`;
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, result);
      }
    });
  }
};
