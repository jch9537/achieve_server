const boardsModel = require("../model/boardModel");

module.exports = {
  get: (req, res) => {
    // console.log("보드 겟 리퀘스트 바디", req.body, "세션", req.session);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        userId: req.session.userId
      };
      // console.log("아규먼트", arg);
      boardsModel.get(arg, (err, result) => {
        if (err) {
          // console.log("보드 에러 리절트", result);
          return res
            .status(500)
            .send({ error: { status: 500, message: "보드가져오기 실패" } });
        } else {
          // console.log("보드 겟 리절트", result);
          return res.status(200).send({
            boards: result,
            message: "보드가져오기 완료"
          });
        }
      });
    }
  },
  getOne: (req, res) => {
    // console.log("보드 겟 원 리퀘스트 바디", req.body, "세션", req.session);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        board_id: req.params.board_id
      };
      console.log("보드겟 원 아규먼트", arg);
      boardsModel.getOne(arg, (err, result) => {
        if (err) {
          return res.status(500).send({
            error: { status: 500, message: "보드 하나 가져오기 실패" }
          });
        } else {
          //가져올꺼 없는 것도 추가
          console.log("보드 겟 원 리절트", result);
          return res.status(200).send({
            board: result[0],
            message: "보드 하나 가져오기 완료"
          });
        }
      });
    }
  },
  post: (req, res) => {
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else if (!req.body) {
      return res.status(400).send({
        error: {
          status: 400,
          message: "요청에 빠진 내용을 확인해주세요. {name}"
        }
      });
    } else {
      let arg = {
        userId: req.session.userId,
        board_name: req.body.newBoard
      };
      boardsModel.post(arg, (err, result) => {
        if (err) {
          return res
            .status(500)
            .send({ error: { status: 500, message: "보드생성 실패" } });
        } else {
          return res
            .status(201)
            .send({ boards: result, message: "보드생성 완료" });
        }
      });
    }
  },
  put: (req, res) => {
    // console.log(req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        board_id: req.body.board_id,
        board_name: req.body.changeBoard
      };
      console.log("보드수정 아규먼트", arg);
      boardsModel.put(arg, (err, result) => {
        if (err) {
          console.log("보드수정 에러", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "보드수정 실패" } });
        } else {
          console.log("보드수정 결과", result);
          res.status(200).send({
            board: result[0],
            message: "보드수정 완료"
          });
        }
      });
    }
  },
  delete: (req, res) => {
    // console.log("삭제요청바디", req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        userId: req.session.userId,
        boardId: req.body.boardId
      };
      // console.log("보드삭제 아규먼트", arg);
      boardsModel.delete(arg, (err, result) => {
        if (err) {
          return res
            .status(500)
            .send({ error: { status: 500, message: "보드삭제 실패" } });
        } else {
          res.status(200).send({ boards: result, message: "보드삭제완료" });
        }
      });
    }
  }
};
