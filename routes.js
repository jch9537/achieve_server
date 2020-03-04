const routes = require("express").Router();
const passport = require("passport");

const oauthCtrl = require("./controller/oauth");
const userCtrl = require("./controller/users");
const boardsCtrl = require("./controller/boards");
const todosCtrl = require("./controller/todos");
const tasksCtrl = require("./controller/tasks");

//OAuth
routes.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login", "email"]
  })
);
routes.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  function(req, res) {
    // console.log("구글 리퀘스트", req.app.get("email"), req.app.get("name"));
    res.redirect(
      `/auth/signUpOrSignIn?email=${req.app.get("email")}&name=${req.app.get(
        "name"
      )}`
    );
  }
);
routes.get("/auth/signUpOrSignIn", oauthCtrl.signUpOrSignIn);
//user
routes.post("/user/checkEmail", userCtrl.checkEmail);
routes.post("/user/signup", userCtrl.signup);
routes.post("/user/signin", userCtrl.signin);
routes.post("/user/signout", userCtrl.signout);
routes.get("/user", userCtrl.get);
routes.put("/user", userCtrl.put);
routes.delete("/user", userCtrl.delete);
//boards
routes.get("/boards", boardsCtrl.get);
routes.get("/boards/:board_id", boardsCtrl.getOne);
routes.post("/boards", boardsCtrl.post);
routes.put("/boards", boardsCtrl.put);
routes.delete("/boards", boardsCtrl.delete);
//todos
routes.get("/todos/:board_id", todosCtrl.get);
routes.post("/todos", todosCtrl.post);
routes.put("/todos", todosCtrl.put);
routes.delete("/todos", todosCtrl.delete);
//task
routes.get("/tasks/:todo_id", tasksCtrl.get);
routes.post("/tasks", tasksCtrl.post);
routes.put("/tasks", tasksCtrl.put);
routes.delete("/tasks", tasksCtrl.delete);

module.exports = routes;
