const auth = require("../config/auth");

module.exports = app => {

    const user = require("../controllers/user.controller")
    const route = require("express").Router()

    route.post("/register", user.create);
    route.post("/login", user.login);

    route.get("/", auth, user.findAll);
    route.get("/:id", auth, user.show);
    route.get("/:id/tasks", auth, user.showTaskUser);

    route.put("/:id", auth, user.update);
    route.delete("/:id", auth, user.deleteById);


    app.use("/users", route);
}