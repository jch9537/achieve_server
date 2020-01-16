module.exports = {
  get: (req, res) => {
    console.log(req.body);
  },
  post: (req, res) => {
    console.log(req.body);
    res.status(201).send({ message: "보드생성완료" });
  },
  put: (req, res) => {
    console.log(req.body);
  },
  delete: (req, res) => {
    console.log(req.body);
  }
};
