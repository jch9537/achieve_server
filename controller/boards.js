module.exports = {
  get: (req, res) => {
    console.log(req.body);
    res.status(200).send({ message: "보드가져오기완료" });
  },
  post: (req, res) => {
    console.log(req.body);
    res.status(201).send({ message: "보드생성완료" });
  },
  put: (req, res) => {
    console.log(req.body);
    res
      .status(200)
      .send({ changeBoard: req.body.changeBoard, message: "보드수정완료" });
  },
  delete: (req, res) => {
    console.log(req.body);
    //req에서 board_id를 받아와 삭제한 뒤 user의 보드를 전체로 가져옴
    res.status(200).send({ message: "보드삭제완료" });
  }
};
