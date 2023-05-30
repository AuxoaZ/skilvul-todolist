const auth = require("../config/auth");


module.exports = app => {

    const task = require("../controllers/task.controller")
    const route = require("express").Router();

    route.post("/user/:user_id", auth, task.create);
    route.get("/user/:user_id", auth, task.findAll);
    route.delete("/user/:user_id", auth, task.deleteAll);

    route.get("/:task_id", auth, task.show);
    route.put("/:task_id", auth, task.update);
    route.delete("/:task_id", auth, task.delete);


    app.use("/tasks", route);
}