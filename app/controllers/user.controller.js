const db = require("../models");
const dotenv = require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = db.user;

// register
exports.create = async (req, res) => {

    try {
        // Get user input
        const email = req.body.email;
        const password = req.body.password;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("semua kolom harus diinput!");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("email sudah terdaftar, coba email lain!");
        }

        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);


        // Create user in our database
        const userDb = await User.create({
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword
        });

        // Create token
        const token = jwt.sign(
            { user_id: userDb._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        userDb.token = token;

        // return new userDb
        res.status(201).send({ message: "akun berhasil dibuat, silakan login" });
    } catch (err) {
        res.status(500).send({ error: err.message, message: "terjadi kesalahan server!" })
    }

}

// login
exports.login = async (req, res) => {
    try {
        // Get user input
        const email = req.body.email;
        const password = req.body.password;
        // Validate user input
        if (!(email && password)) {
            res.status(400).send("semua kolom harus diinput!");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            res.status(200).json(user);
        }
        res.status(400).send("email atau password salah!");
    } catch (err) {
        res.status(500).send({ error: err.message, message: "terjadi kesalahan server!" })
    }
}


// get user by id
exports.show = (req, res) => {
    let id = req.params.user_id;
    User.findById(id)
        .then((data) => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }))
}

// update user
exports.update = (req, res) => {
    let id = req.params.user_id;
    req.deadline = new Date(req.deadline)

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "gagal update data" })
            }
            const results = {
                message: "berhasil update data",
                result: data
            }
            res.send(results)
        })
        .catch(err => res.status(500).send({ message: err.message }))

}

// delete
exports.deleteById = (req, res) => {
    let id = req.params.user_id;

    User.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "gagal hapus data" })
            }
            res.status(204).send({ message: "berhasil hapus data" })
        })
        .catch(err => res.status(500).send({ message: err.message }))
}