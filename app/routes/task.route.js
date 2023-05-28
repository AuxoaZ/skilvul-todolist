const auth = require("../config/auth");


module.exports = app => {

    const task = require("../controllers/task.controller")
    const route = require("express").Router();

    route.post("/user/:id", auth, task.create);
    route.get("/user/:id", auth, task.findAll);
    route.delete("/user/:id", auth, task.deleteAll);

    route.get("/:id", auth, task.show);
    route.put("/:id", auth, task.update);
    route.delete("/:id", auth, task.delete);


    app.use("/tasks", route);
}