const express = require("express");
require('../config/config');
const User = require('../model/user');
const bcrypt = require("bcrypt");
const _ = require('underscore');
const jwt = require('jsonwebtoken');
const app = express();

app.post("/login", (req, res) => {

    let body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {

        if (err) {

            return res.status(500).json({

                ok: false,
                err
            });
        }

        if (!userDB) {
            return res.status(400).json({

                ok: false,
                err: {
                    message: "(User) or password is not correct"
                }

            });

        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({

                ok: false,
                err: {
                    message: "User or (password) no is correct"
                }

            });

        }

        let token = jwt.sign({
            user: userDB
        }, process.env.SEED, { expiresIn: process.env.EXPIRETOKEN });
        res.json({
            ok: true,
            user: userDB,
            token


        });

    });


});









module.exports = app;