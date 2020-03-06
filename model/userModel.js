const connection = require("../database/dbConnection");

module.exports = {
  checkEmail: ({ email }, callback) => {
    const query = `SELECT id FROM users WHERE email='${email}';`;
    connection.query(query, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, result);
      }
    });
  },
  signup: ({ name, email, password }, callback) => {
    const query = `INSERT INTO users (name, email, password, oauth_signup) VALUES ( '${name}', '${email}','${password}', false);`;
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
    let sql = `SELECT id, name, oauth_signup FROM users WHERE id=${id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, result);
      }
    });
  },
  put: ({ id, newName, newPassword }, callback) => {
    let sql;
    if (!newName) {
      sql = `UPDATE users SET password='${newPassword}' WHERE id=${id};`;
    } else if (!newPassword) {
      sql = `UPDATE users SET name='${newName}' WHERE id=${id};`;
    } else {
      sql = `UPDATE users SET name='${newName}', password='${newPassword}' WHERE id=${id};`;
    }
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        sql = `SELECT id, name FROM users WHERE id=${id};`;
        connection.query(sql, (err, result) => {
          if (err) {
            callback(err, null);
          } else {
            return callback(null, result);
          }
        });
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
