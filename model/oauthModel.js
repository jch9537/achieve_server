const connection = require("../database/dbConnection");

module.exports = {
  signUpOrSignIn: ({ email, name, password }, callback) => {
    let sql = `SELECT id FROM users WHERE email='${email}';`;
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        if (!result.length) {
          sql = `INSERT INTO users (email, name, password, oauth_signup) VALUES ('${email}', '${name}', '${password}', true);`;
          connection.query(sql, (err, result) => {
            if (err) {
              return callback(err, null);
            } else {
              return callback(null, result);
            }
          });
        } else {
          return callback(null, result);
        }
      }
    });
  }
};
