const routes = require("express").Router();
const userCtl = require("./controller/user");

routes.post("/user/signup", userCtl.signup);
routes.post("/user/signin", userCtl.signin);
routes.post("/user/signout", userCtl.signout);

routes.get("/user", userCtl.get);
routes.post("/user", userCtl.post);
routes.put("/user", userCtl.put);
routes.delete("/user", userCtl.delete);

routes.get("/boards");
routes.post("/boards");
routes.put("/boards");
routes.delete("/boards");

routes.get("/todos");
routes.post("/todos");
routes.put("/todos");
routes.delete("/todos");

routes.get("/tasks");
routes.post("/tasks");
routes.put("/tasks");
routes.delete("/tasks");

module.exports = routes;
