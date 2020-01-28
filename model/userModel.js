const connection = require("../database/dbConnection");

module.exports = {
  signup: ({ name, email, password }, callback) => {
    const query = `INSERT INTO users (name, email, password) VALUES ( '${name}', '${email}','${password}');`;
    connection.query(query, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        // console.log("결과 ----- : ", result);
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
        return callback(null, "No match Email"); //여기서 에러가 난 경우 email이 없는 경우
      } else {
        const query = `SELECT * FROM users WHERE email='${email}' AND password='${password}';`;
        connection.query(query, (err, result) => {
          if (err) {
            return callback(err, null);
          } else {
            if (!result.length) {
              return callback(null, "No match Password"); //여기서 에러가 난 경우 password가 없는 경우
            } else {
              return callback(null, result);
            }
          }
        });
      }
    });
  },
  // signout: () => {},
  get: ({ id }, callback) => {
    let sql = `SELECT * FROM users WHERE id=${id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, result);
      }
    });
  }, //get은 정보를 가져와야함
  put: ({ userId, name, password }, callback) => {
    // let sql = `UPDATE users SET name='${name}', password='${password}' WHERE id=${userId}`;
    let sql;
    if (!name) {
      sql = `UPDATE users SET password='${password}' WHERE id=${userId};`;
    } else if (!password) {
      sql = `UPDATE users SET name='${name}' WHERE id=${userId};`;
    } else {
      sql = `UPDATE users SET name='${name}', password='${password}' WHERE id=${userId};`;
    }
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        // console.log("수정결과", result);
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

// get: ({ id }, callback) => {
//   let sql = `SELECT * FROM boards WHERE user_id=${id}`;
//   connection.query(sql, (err, result) => {
//     if (err) {
//       console.log("겟에러결과", err);
//       return callback(err, null);
//     } else {
//       console.log("겟 결과", result);
//       return callback(null, result);
//     }
//   });
// }, //get은 정보를 가져와야함
