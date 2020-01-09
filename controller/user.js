module.exports = {
  signup: (req, res) => {
    console.log(req.body);
  },
  signin: (req, res) => {
    console.log(req.body);
    res.status(200).send({ message: "성공" });
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
