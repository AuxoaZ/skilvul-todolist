const dbConfig = require("../config/database");
const mongoose = require("mongoose");

module.exports = {
    mongoose,
    url: dbConfig.url,
    task: require("./tasks.model")(mongoose),
    user: require("./users.model")(mongoose)
};