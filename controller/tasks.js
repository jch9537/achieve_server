const taskModel = require("../model/taskModel");

module.exports = {
  get: (req, res) => {
    // console.log("task 겟 리퀘스트", req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        todo_id: Number(req.params.todo_id)
      };
      // console.log("task 겟 아규먼트", arg);
      taskModel.get(arg, (err, result) => {
        if (err) {
          // console.log("task겟 에러 리절트", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "task 가져오기 실패" } });
          // } else {
          //결과 없는 경우도 에러처리 안하는 것으로 처리 : 없는 것 자체가 에러로 보기 어려움
          // if (!result.length) {
          //   return res.status(406).send({
          //     error: { status: 406, message: "todo에 task가 없습니다." }
          //   });
        } else {
          // console.log("task겟 결과", result);
          return res
            .status(200)
            .send({ tasks: result, message: "task가져오기 완료" });
        }
        // }
      });
    }
  },
  post: (req, res) => {
    // console.log("task 포스트 리퀘스트", req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        todo_id: Number(req.body.todo_id),
        newTask: req.body.newTask
      };
      taskModel.post(arg, (err, result) => {
        if (err) {
          // console.log("task포스트 에러 ", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "task생성 실패" } });
        } else {
          // console.log("task포스트 결과", result);
          return res
            .status(201)
            .send({ tasks: result, message: "task생성 완료" });
        }
      });
    }
  },
  put: (req, res) => {
    // console.log("task 수정 리퀘스트", req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        task_id: Number(req.body.task_id),
        changeTask: req.body.chageTask
      };
      // console.log("task수정 아규먼트", arg);
      taskModel.put(arg, (err, result) => {
        if (err) {
          // console.log("task수정 에러 ", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "task수정 실패" } });
        } else {
          // console.log("task수정 결과", result);
          return res
            .status(200)
            .send({ task: result[0], message: "task수정 완료" });
        }
      });
    }
  },
  delete: (req, res) => {
    // console.log("task 삭제 리퀘스트", req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        todo_id: Number(req.body.todo_id),
        task_id: Number(req.body.task_id)
      };
      // console.log("task삭제 아규먼트", arg);
      taskModel.delete(arg, (err, result) => {
        if (err) {
          // console.log("task삭제 에러 ", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "task삭제 실패" } });
        } else {
          // console.log("task삭제 결과", result);
          return res
            .status(200)
            .send({ tasks: result, message: "task삭제 완료" });
        }
      });
    }
  }
};
