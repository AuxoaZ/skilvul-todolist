const db = require("../models");
const User = db.user
const Task = db.task;

exports.create = (req, res) => {
    req.deadline = new Date(req.deadline)

    Task.create(req.body)
        .then(function (data) {
            // If a Review was created successfully, find one Product with an `_id` equal to `req.params.id`. Update the Product to be associated with the new Review
            // { new: true } tells the query that we want it to return the updated Product -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return User.findOneAndUpdate({ _id: req.params.user_id }, { $push: { tasks: data.id } }, { new: true });
        })
        .then(function (data) {
            // If we were able to successfully update a Product, send it back to the client
            const results = {
                message: "berhasil menambah data",
                result: data
            }
            res.status(201).send(results)
            // res.json(data);
        })
        // .then(() => res.send({ message: "task berhasil dibuat" }))
        .catch(err => res.status(500).send({ message: err.message }))

}
exports.findAll = (req, res) => {
    User.findOne({ _id: req.params.user_id })
        .populate("tasks")
        .then(data => {
            const results = {
                message: "data berhasil ditampilkan",
                result: data
            }
            res.status(200).send(results)
        })
        .catch(err => res.status(500).send({ message: err.message }))

}
exports.show = (req, res) => {
    let id = req.params.task_id;
    Task.findById(id)
        .then(data => {
            const results = {
                message: "data berhasil ditampilkan",
                result: data
            }
            res.status(200).send(results)
        })
        .catch(err => res.status(500).send({ message: err.message }))

}
exports.update = (req, res) => {
    let id = req.params.task_id;

    Task.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "gagal update data" })
            }
            const results = {
                message: "data berhasil diubah",
                result: data
            }
            res.status(200).send(results)
        })
        .catch(err => res.status(500).send({ message: err.message }))

}

exports.delete = (req, res) => {
    let id = req.params.task_id;

    Task.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "gagal hapus data" })
            }
            res.status(204).send({ message: "berhasil hapus data" })
        })
        .catch(err => res.status(500).send({ message: err.message }))
}
exports.deleteAll = (req, res) => {
    let id = req.params.user_id;

    User.findByIdAndUpdate(id, { $unset: { tasks: 1 } })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "gagal hapus data" })
            }
            res.status(204).send({ message: "berhasil hapus semua data" })
        })
        .catch(err => res.status(500).send({ message: err.message }))
}