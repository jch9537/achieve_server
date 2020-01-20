module.exports = {
  get: (req, res) => {
    console.log(req.body);
    res.status(200).send({ message: "todo가져오기 완료" });
  },
  post: (req, res) => {
    console.log(req.body);
    res.status(200).send({ message: "todo생성 완료" });
  },
  put: (req, res) => {
    console.log(req.body);
    res
      .status(200)
      .send({ changeTodo: req.body.changeTodo, message: "todo수정 완료" });
  },
  delete: (req, res) => {
    console.log(req.body);
    res.status(200).send({ message: "todo삭제 완료" });
  }
};
