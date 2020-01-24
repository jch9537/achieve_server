const userModel = require("../model/userModel");

module.exports = {
  signup: (req, res) => {
    console.log(req.body);
    let { name, email, password } = req.body;
    if (!(name && email && password)) {
      return res.status(400).send({
        message: "요청에 빠진내용을 확인해주세요. {name, email, password}"
      });
    } else {
      let arg = {
        name: name,
        email: email,
        password: password
      };
      userModel.signup(arg, (err, result) => {
        if (err) {
          if (err.errno === 1062) {
            // console.log("사인업에러:", err);
            return res.status(409).send({
              error: { status: 409, message: "이미 가입된 email입니다." }
            });
          } else {
            return res.status(500).send({
              error: { status: 500, message: "데이터베이스 에러발생" }
            });
          }
        } else {
          // console.log("-------------");
          return res.status(201).send({ status: 201, message: "회원가입완료" });
        }
      });
    }
  },
  signin: (req, res) => {
    // console.log(req.body);
    let { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send({
        error: {
          status: 400,
          message: "요청에 빠진 내용을 확인해주세요. {email, password}"
        }
      });
    } else {
      //session 추가
      let arg = {
        email: email,
        password: password
      };
      userModel.signin(arg, (err, result) => {
        //에러났을 때
        if (err) {
          console.log("에러", err);
          return res
            .status(500)
            .send({ error: { status: 500, message: "데이터베이스 에러발생" } });
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
            //session에 아이디 부여 => session.user_id = result[0].id
            return res.status(200).send({ message: "로그인 완료" });
          }
        }
      });
    }
  },
  signout: (req, res) => {
    // session.user_id destroy하기
    console.log(req.body);
    res.status(200).send({ message: "로그아웃완료" });
  },
  get: (req, res) => {
    console.log(req.body);
    res.status(200).send({
      body: { email: "emial_Data", user_id: "id_Data" },
      message: "유저 겟 완료"
    });
  },
  put: (req, res) => {
    console.log(req.body);
    res.status(200).send({ message: "회원정보 수정완료" });
  },
  delete: (req, res) => {
    // session.user_id destroy하고 user정보 삭제
    console.log(req.body);
    res.status(200).send({ message: "회원탈퇴완료" });
  }
};
