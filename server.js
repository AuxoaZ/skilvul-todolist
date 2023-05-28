const express = require("express");
const cors = require("cors");

const db = require("./app/models")

const app = express();

const corsOptions = {
    origin: "http://localhost:8080"
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// koneksi db
const mongooseConfig = {
    useNewurlParser: true,
    useUnifiedTopology: true
}
db.mongoose.connect(db.url, mongooseConfig)
    .then(() => console.log("database is connected"))
    .catch(err => {
        console.log(`failed to connect database -> ${err.message}`);
        process.exit();
    });


//koneksi route
require("./app/routes/task.route")(app)
require("./app/routes/user.route")(app)


app.get("/user", (req, res) => {
    res.json({
        message: "Welcome to the Todolist app"
    })
});

const PORT = 8000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})