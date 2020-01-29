const todoModel = require("../model/todoModel");

module.exports = {
  get: (req, res) => {
    // console.log("투두 겟 리퀘스트", req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        board_id: Number(req.params.board_id)
      };
      // console.log("todo 겟 아규먼트", arg);
      todoModel.get(arg, (err, result) => {
        if (err) {
          // console.log("투두겟 에러 리절트", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "todo  가져오기 실패" } });
        } else {
          // console.log("todo겟 결과", result);
          if (!result.length) {
            return res.status(406).send({
              error: { status: 406, message: "board에 todo가 없습니다." }
            });
          } else {
            return res
              .status(200)
              .send({ todos: result, message: "todo가져오기 완료" });
          }
        }
      });
    }
  },
  post: (req, res) => {
    // console.log("todo포스트 리퀘스트", req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        board_id: req.body.board_id,
        newTodo: req.body.newTodo
      };
      todoModel.post(arg, (err, result) => {
        if (err) {
          // console.log("todo포스트  에러", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "todo생성 실패" } });
        } else {
          // console.log("todo포스트 결과", result);
          return res
            .status(201)
            .send({ todos: result, message: "todo생성 완료" });
        }
      });
    }
  },
  put: (req, res) => {
    // console.log("todo수정 리퀘스트", req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        todo_id: Number(req.body.todo_id),
        changeTodo: req.body.changeTodo
      };
      // console.log("todo수정 아규먼트", arg);
      todoModel.put(arg, (err, result) => {
        if (err) {
          // console.log("todo수정 에러 리절트", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "todo 수정 실패" } });
        } else {
          // console.log("todo수정 결과", result);
          return res.status(200).send({
            todo: result[0],
            message: "todo수정 완료"
          });
        }
      });
    }
  },
  delete: (req, res) => {
    // console.log("todo삭제 리퀘스트", req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        board_id: Number(req.body.board_id),
        todo_id: Number(req.body.todo_id)
      };
      // console.log("todo삭제 아규먼트", arg);
      todoModel.delete(arg, (err, result) => {
        if (err) {
          // console.log("todo삭제 에러 리절트", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "todo삭제 실패" } });
        } else {
          // console.log("todo삭제 결과", result);
          res.status(200).send({ todos: result, message: "todo삭제 완료" });
        }
      });
    }
  }
};
