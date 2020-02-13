const crypto = require("crypto");
const userModel = require("../model/userModel");
//res를 return 하는 것과 하지 않는 것의 차이확인
//let 과 const
module.exports = {
  checkEmail: (req, res) => {
    // console.log("이메일 중복확인 ", req.body);
    if (!req.body.email) {
      res.status(400).send({
        error: {
          status: 400,
          message: "요청에 빠진내용을 확인해주세요 {email}."
        }
      });
    } else {
      let arg = {
        email: req.body.email
      };
      userModel.checkEmail(arg, (err, result) => {
        if (err) {
          // console.log("이메일 중복에러", err);
          res.status(500).send({
            error: {
              status: 500,
              message: "이메일 중복확인 실패"
            }
          });
        } else {
          // console.log("이메일 중복결과 ", result);
          if (!result.length) {
            res.status(200).send({ message: "사용가능한 email입니다." });
          } else {
            res.status(409).send({
              error: {
                status: 409,
                message: "이미 가입된 email입니다."
              }
            });
          }
        }
      });
    }
  },
  signup: (req, res) => {
    // console.log("회원가입 리퀘스트", req.body);
    let { name, email, password } = req.body;
    if (!(name && email && password)) {
      return res.status(400).send({
        error: {
          status: 400,
          message: "요청에 빠진내용을 확인해주세요. {name, email, password}"
        }
      });
    } else {
      let arg = {
        name: name,
        email: email,
        password: crypto
          .createHmac("sha512", process.env.SRV_CRYPTO_SALT)
          .update(password)
          .digest("base64")
      };
      console.log("아규먼트", arg);
      userModel.signup(arg, (err, result) => {
        if (err) {
          // console.log('회원가입에러',err);
          if (err.errno === 1062) {
            return res.status(409).send({
              error: { status: 409, message: "이미 가입된 email입니다." }
            });
          } else {
            return res.status(500).send({
              error: { status: 500, message: "회원가입 실패" }
            });
          }
        } else {
          // console.log("회원가입 결과", result);
          return res.status(201).send({ message: "회원가입 완료" });
        }
      });
    }
  },
  signin: (req, res) => {
    // console.log('로그인 리퀘스트', req.body);
    let session = req.session;
    let { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send({
        error: {
          status: 400,
          message: "요청에 빠진 내용을 확인해주세요. {email, password}"
        }
      });
    } else {
      let arg = {
        email: email,
        password: crypto
          .createHmac("sha512", process.env.SRV_CRYPTO_SALT)
          .update(password)
          .digest("base64")
      };
      userModel.signin(arg, (err, result) => {
        if (err) {
          // console.log("로그인 에러", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "로그인 실패" } });
        } else {
          if (result === "No match Email") {
            return res.status(406).send({
              error: { status: 406, message: "가입되지 않은 Email입니다." }
            });
          } else if (result === "No match Password") {
            return res.status(400).send({
              error: { status: 400, message: "비밀번호가 일치하지 않습니다." }
            });
          } else {
            // console.log("로그인 결과", result);
            session.userId = result[0].id;
            // console.log("로그인 세션", session);
            return res
              .status(200)
              .send({ userId: session.userId, message: "로그인 완료" });
          }
        }
      });
    }
  },
  signout: (req, res) => {
    // console.log("로그아웃 리퀘스트 바디", req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      req.session.destroy(err => {
        if (err) {
          return res
            .status(500)
            .send({ error: { status: 500, message: "로그아웃 실패" } });
        } else {
          return res.status(200).send({ message: "로그아웃 완료" });
          // res.redirect("/"); redirect에대해 공부하기
        }
      });
    }
  },
  get: (req, res) => {
    // console.log("user 겟 리퀘스트", req.body);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        id: req.session.userId
      };
      userModel.get(arg, (err, result) => {
        if (err) {
          console.log("user겟 에러 리절트", err);
          return res.status(500).send({
            error: { status: 500, message: "회원정보 가져오기 실패" }
          });
        } else {
          console.log("user겟 결과", result);
          if (!result.length) {
            return res.status(406).send({
              error: { status: 406, message: "가입정보가 없습니다." }
            });
          } else {
            return res
              .status(200)
              .send({ userInfo: result[0], message: "회원정보 가져오기 완료" });
          }
        }
      });
    }
  },
  put: (req, res) => {
    // console.log("회원정보수정 리퀘스트 바디", req.body, "세션", req.session);
    let { id, newName, newPassword } = req.body;
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else if (!(newName || newPassword)) {
      return res.status(400).send({
        error: {
          status: 400,
          message: "수정한 내용이 없습니다."
        }
      });
    } else {
      let arg = {
        id: Number(id),
        newName: newName,
        newPassword: newPassword
      };
      userModel.put(arg, (err, result) => {
        if (err) {
          // console.log("회원정보 수정 에러 ", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "회원정보 수정실패" } });
        } else {
          // console.log("회원정보 수정 결과", result);
          if (!result.length) {
            return res.status(200).send({ message: "회원정보 수정완료" });
          } else {
            return res
              .status(200)
              .send({ changeInfo: result[0], message: "회원정보 수정완료" });
          }
        }
      });
    }
  },
  delete: (req, res) => {
    // console.log("회원탈퇴 리퀘스트 바디", req.body, "세션", req.session);
    if (!req.session.userId) {
      return res
        .status(401)
        .send({ error: { status: 401, message: "로그인 상태가 아닙니다." } });
    } else {
      let arg = {
        id: req.session.userId
      };
      userModel.delete(arg, (err, result) => {
        if (err) {
          // console.log("에러결과", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "회원탈퇴 실패" } }); //서버오류
        } else {
          // console.log("탈퇴결과", result);
          return res.status(200).send({ message: "회원탈퇴 완료" });
        }
      });
    }
  }
};
