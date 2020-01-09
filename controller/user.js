module.exports = {
  signup: (req, res) => {
    console.log(req.body);
    res.status(201).send({ message: "회원가입완료" });
  },
  signin: (req, res) => {
    console.log(req.body);
    res.status(200).send({ message: "로그인완료" });
  },
  signout: (req, res) => {
    console.log(req.body);
  },
  get: (req, res) => {
    console.log(req.body);
  },
  post: (req, res) => {
    console.log(req.body);
  },
  put: (req, res) => {
    console.log(req.body);
  },
  delete: (req, res) => {
    console.log(req.body);
  }
};
