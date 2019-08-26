const express = require("express");
require('../config/config');
const User = require('../model/user');
const bcrypt = require("bcrypt");
const _ = require('underscore');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
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

//configuraciones de google
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    return {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }


}

app.post('/login/google', async(req, res) => {

    let token = req.body.idtoken;

    let googleUser = await verify(token)
        .catch(e => {
            return res.status(403).json({
                ok: false,
                err: e
            });
        });
    console.log(googleUser);

    User.findOne({ email: googleUser.email }, (err, userDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err

            });
        };

        if (userDB) {

            if (userDB.google === false) {
                return res.status(400).json({
                    ok: false,
                    err: {

                        message: 'debe usar autenticacion normal'
                    }

                });
            } else {
                let token = jwt.sign({
                    user: userDB
                }, process.env.SEED, { expiresIn: process.env.EXPIRETOKEN });

                return res.json({
                    ok: true,
                    user: userDB,
                    token
                });

            }
            //create a new user if not exist
        } else {
            let user = new User();
            user.name = googleUser.name;
            user.email = googleUser.email;
            user.img = googleUser.img;
            user.google = true;
            user.password = ':)';

            user.save((err, userDB) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err

                    });
                };
                let token = jwt.sign({
                    user: userDB
                }, process.env.SEED, { expiresIn: process.env.EXPIRETOKEN });

                return res.json({
                    ok: true,
                    user: userDB,
                    token,
                });

            });

        }




    });

});





module.exports = app;