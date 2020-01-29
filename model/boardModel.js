const connection = require("../database/dbConnection");

module.exports = {
  get: ({ userId }, callback) => {
    let sql = `SELECT id, board_name FROM boards WHERE user_id=${userId}`;
    connection.query(sql, (err, result) => {
      if (err) {
        // console.log("겟에러결과", err);
        return callback(err, null);
      } else {
        // console.log("겟 결과", result);
        return callback(null, result);
      }
    });
  }, //get은 정보를 가져와야함
  getOne: ({ board_id }, callback) => {
    let sql = `SELECT id, board_name FROM boards WHERE id=${board_id};`;
    connection.query(sql, (err, result) => {
      if (err) {
        console.log("겟 원 에러결과", err);
        return callback(err, null);
      } else {
        console.log("겟 원 결과", result);
        return callback(null, result);
      }
    });
  },
  post: ({ userId, board_name }, callback) => {
    let sql = `INSERT INTO boards (user_id, board_name) VALUES (${userId}, '${board_name}');`;
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err, null); //DB입력오류
      } else {
        sql = `SELECT id, board_name FROM boards WHERE user_id=${userId};`;
        connection.query(sql, (err, result) => {
          if (err) {
            return callback(err, null); //DB가져오기오류
          } else {
            return callback(null, result);
          }
        });
      }
    });
  },
  put: ({ board_id, board_name }, callback) => {
    let sql = `UPDATE boards SET board_name='${board_name}' WHERE id=${board_id};`;
    connection.query(sql, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        sql = `SELECT id, board_name FROM boards WHERE id=${board_id}`; //수정 후 해당 유저아이디 값으로 모든보드 들고오기
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
  delete: ({ userId, boardId }, callback) => {
    let sql = `DELETE FROM boards WHERE id=${boardId};`;
    connection.query(sql, (err, result) => {
      if (err) {
        // console.log("삭제오류");
        return callback(err, null);
      } else {
        sql = `SELECT id, board_name FROM boards WHERE user_id=${userId};`;
        connection.query(sql, (err, result) => {
          if (err) {
            // console.log("가져오기오류");
            return callback(err, null);
          } else {
            return callback(null, result);
          }
        });
      }
    });
  }
};
