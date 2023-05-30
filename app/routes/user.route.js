const auth = require("../config/auth");

module.exports = app => {

    const user = require("../controllers/user.controller")
    const route = require("express").Router()

    route.post("/register", user.create);
    route.post("/login", user.login);

    route.get("/:user_id", auth, user.show);
    route.put("/:user_id", auth, user.update);
    route.delete("/:user_id", auth, user.deleteById);


    app.use("/users", route);
}