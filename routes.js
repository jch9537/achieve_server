const routes = require("express").Router();
const userCtrl = require("./controller/user");
const boardsCtrl = require("./controller/boards");

routes.post("/user/signup", userCtrl.signup);
routes.post("/user/signin", userCtrl.signin);
routes.post("/user/signout", userCtrl.signout);

routes.get("/user", userCtrl.get);
// routes.post("/user", userCtrl.post);
routes.put("/user", userCtrl.put);
routes.delete("/user", userCtrl.delete);

routes.get("/boards", boardsCtrl.get);
routes.post("/boards", boardsCtrl.post);
routes.put("/boards", boardsCtrl.put);
routes.delete("/boards", boardsCtrl.delete);

routes.get("/todos");
routes.post("/todos");
routes.put("/todos");
routes.delete("/todos");

routes.get("/tasks");
routes.post("/tasks");
routes.put("/tasks");
routes.delete("/tasks");

module.exports = routes;
