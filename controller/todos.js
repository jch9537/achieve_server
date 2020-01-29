const todoModel = require("../model/todoModel");

module.exports = {
  get: (req, res) => {
    // console.log('투두겟 리퀘스트', req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        user_id: req.session.userId,
        board_id: Number(req.params.board_id)
      };
      // console.log("투두겟 아규먼트", arg);
      todoModel.get(arg, (err, result) => {
        if (err) {
          // console.log("투두겟 에러 리절트", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "투두 가져오기 실패" } });
        } else {
          // console.log("투두겟 결과", result);
          return res
            .status(200)
            .send({ todos: result, message: "투두가져오기 완료" });
        }
      });
    }
  },
  post: (req, res) => {
    // console.log("투두포스트 리퀘스트", req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        board_id: req.body.board_id,
        todo_name: req.body.newTodo
      };
      todoModel.post(arg, (err, result) => {
        if (err) {
          // console.log("투두포스트  에러 리절트", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "투두 가져오기 실패" } });
        } else {
          // console.log("투두포스트 결과", result);
          return res
            .status(200)
            .send({ todos: result, message: "투두생성 완료" });
        }
      });
    }
  },
  put: (req, res) => {
    // console.log("투두수정 리퀘스트", req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        todo_id: req.body.todo_id,
        todo_name: req.body.changeTodo
      };
      todoModel.put(arg, (err, result) => {
        if (err) {
          console.log("투두수정 에러 리절트", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "투두 수정 실패" } });
        } else {
          return res.status(200).send({
            todo: result[0],
            message: "todo수정 완료"
          });
        }
      });
    }
  },
  delete: (req, res) => {
    // console.log("투두삭제 리퀘스트", req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        board_id: req.body.board_id,
        todo_id: req.body.todo_id
      };
      todoModel.delete(arg, (err, result) => {
        if (err) {
          // console.log("투두삭제 에러 리절트", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "투두삭제 실패" } });
        } else {
          res.status(200).send({ todos: result, message: "todo수정 완료" });
        }
      });
    }
  }
};
