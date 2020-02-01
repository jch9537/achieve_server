const boardsModel = require("../model/boardModel");

module.exports = {
  get: (req, res) => {
    console.log("board 겟 리퀘스트 바디", req.body, "세션", req.session);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        user_id: req.session.userId
      };
      // console.log("board 아규먼트", arg);
      boardsModel.get(arg, (err, result) => {
        if (err) {
          // console.log("보드 에러 리절트", result);
          return res
            .status(500)
            .send({ error: { status: 500, message: "boards 가져오기 실패" } });
        } else {
          //결과 없는 경우도 에러처리 안하는 것으로 처리 : 없는 것 자체가 에러로 보기 어려움
          // if (!result.length) {
          //     return res.status(406).send({
          //         error: { status: 406, message: "생성한 boards가 없습니다." }
          //       });
          //     } else {
          return res.status(200).send({
            // console.log("보드 겟 리절트", result);
            boards: result,
            message: "boards 가져오기 완료"
          });
        }
        // }
      });
    }
  },
  getOne: (req, res) => {
    // console.log("board 겟 원 리퀘스트 바디", req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        board_id: Number(req.params.board_id)
      };
      // console.log("board겟 원 아규먼트", arg);
      boardsModel.getOne(arg, (err, result) => {
        if (err) {
          return res.status(500).send({
            error: { status: 500, message: "board 가져오기 실패" }
          });
        } else {
          // console.log("board 겟 원 리절트", result);
          return res.status(200).send({
            board: result[0],
            message: "board 가져오기 완료"
          });
        }
      });
    }
  },
  post: (req, res) => {
    // console.log("board 포스트 리퀘스트", req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    }
    // else if (!req.body) {
    //   return res.status(400).send({
    //     error: {
    //       status: 400,
    //       message: "요청에 빠진 내용을 확인해주세요. {name}"
    //     }
    //   });
    // }
    else {
      let arg = {
        user_id: req.session.userId,
        newBoard: req.body.newBoard
      };
      boardsModel.post(arg, (err, result) => {
        if (err) {
          // console.log("board포스트 에러 ", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "board생성 실패" } });
        } else {
          // console.log("board포스트 결과", result);
          return res
            .status(201)
            .send({ boards: result, message: "board생성 완료" });
        }
      });
    }
  },
  put: (req, res) => {
    // console.log("board 수정 리퀘스트", req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        board_id: Number(req.body.board_id),
        changeBoard: req.body.changeBoard
      };
      // console.log("board수정 아규먼트", arg);
      boardsModel.put(arg, (err, result) => {
        if (err) {
          // console.log("board수정 에러", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "board수정 실패" } });
        } else {
          // console.log("board수정 결과", result);
          res.status(200).send({
            board: result[0],
            message: "board수정 완료"
          });
        }
      });
    }
  },
  delete: (req, res) => {
    // console.log("board 삭제 리퀘스트", req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        user_id: req.session.userId,
        board_id: Number(req.body.board_id)
      };
      // console.log("board삭제 아규먼트", arg);
      boardsModel.delete(arg, (err, result) => {
        if (err) {
          // console.log("board삭제 에러 ", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "baord삭제 실패" } });
        } else {
          // console.log("board삭제 결과", result);
          return res
            .status(200)
            .send({ boards: result, message: "baord삭제완료" });
        }
      });
    }
  }
};
