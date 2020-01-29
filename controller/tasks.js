const taskModel = require("../model/taskModel");

module.exports = {
  get: (req, res) => {
    // console.log("태스크 겟 리퀘스트", req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        todo_id: req.params.todo_id
      };
      // console.log("태스크겟 아규먼트", arg);
      taskModel.get(arg, (err, result) => {
        if (err) {
          // console.log("태스크겟 에러 리절트", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "task 가져오기 실패" } });
        } else {
          console.log("task겟 결과", result);
          if (!result.length) {
            return res.status(406).send({
              error: { status: 406, message: "todo에 task가 없습니다." }
            });
          } else {
            return res
              .status(200)
              .send({ tasks: result, message: "task가져오기 완료" });
          }
        }
      });
    }
  },
  post: (req, res) => {
    console.log("task 포스트 리퀘스트", req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        todo_id: req.body.todo_id,
        newTask: req.body.newTask
      };
      taskModel.post(arg, (err, result) => {
        if (err) {
          console.log("task포스트 에러 ", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "task생성 실패" } });
        } else {
          console.log("task포스트 결과", result);
          return res
            .status(200)
            .send({ tasks: result, message: "task생성 완료" });
        }
      });
    }
  },
  put: (req, res) => {
    console.log("task 수정 리퀘스트", req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        task_id: req.body.task_id,
        changeTask: req.body.chageTask
      };
      taskModel.put(arg, (err, result) => {
        if (err) {
          console.log("task수정 에러 ", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "task수정 실패" } });
        } else {
          console.log("task수정 결과", result);
          return res
            .status(200)
            .send({ task: result[0], message: "task수정 완료" });
        }
      });
    }
  },
  delete: (req, res) => {
    console.log("task 삭제 리퀘스트", req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        todo_id: req.body.todo_id,
        task_id: req.body.task_id
      };
      taskModel.delete(arg, (err, result) => {
        if (err) {
          console.log("task삭제 에러 ", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "task삭제 실패" } });
        } else {
          console.log("task삭제 결과", result);
          return res
            .status(200)
            .send({ tasks: result, message: "task삭제 완료" });
        }
      });
    }
  }
};
