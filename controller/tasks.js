module.exports = {
  get: (req, res) => {
    console.log(req.body);
    res.status(200).send({ message: "task가져오기 완료" });
  },
  post: (req, res) => {
    console.log(req.body);
    res.status(200).send({ message: "task생성 완료" });
  },
  put: (req, res) => {
    console.log(req.body);
    res
      .status(200)
      .send({ changeTask: req.body.chageTask, message: "task수정 완료" });
  },
  delete: (req, res) => {
    console.log(req.body);
    res.status(200).send({ message: "task삭제 완료" });
  }
};
