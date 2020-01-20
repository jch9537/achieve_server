const routes = require("express").Router();
const userCtrl = require("./controller/user");
const boardsCtrl = require("./controller/boards");
const todosCtrl = require("./controller/todos");
const tasksCtrl = require("./controller/tasks");

routes.post("/user/signup", userCtrl.signup);
routes.post("/user/signin", userCtrl.signin);
routes.post("/user/signout", userCtrl.signout);

routes.get("/user", userCtrl.get);
routes.put("/user", userCtrl.put);
routes.delete("/user", userCtrl.delete);

routes.get("/boards", boardsCtrl.get);
routes.post("/boards", boardsCtrl.post);
routes.put("/boards", boardsCtrl.put);
routes.delete("/boards", boardsCtrl.delete);

routes.get("/todos", todosCtrl.get);
routes.post("/todos", todosCtrl.post);
routes.put("/todos", todosCtrl.put);
routes.delete("/todos", todosCtrl.delete);

routes.get("/tasks", tasksCtrl.get);
routes.post("/tasks", tasksCtrl.post);
routes.put("/tasks", tasksCtrl.put);
routes.delete("/tasks", tasksCtrl.delete);

module.exports = routes;