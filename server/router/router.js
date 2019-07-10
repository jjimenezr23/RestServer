const express = require("express");
const User = require('../model/user');
const bcrypt = require("bcrypt");
const _ = require('underscore');
var jwt = require('jsonwebtoken');
const app = express();



app.get('/user', function(req, res) {

    let since = req.query.since || 0;
    since = Number(since);

    let limite = req.query.limite || 5;

    limite = Number(limite);

    User.find({ Status: true }, "name email role status google img")
        .skip(since)
        .limit(limite)
        .exec((err, users) => {

            if (err) {
                return res.status(400).json({

                    ok: false,
                    err
                });
            }

            User.countDocuments({}, (err, counter) => {
                res.json({
                    ok: true,
                    users,
                    counter

                });

            });


        });


});


app.post('/user', function(req, res) {

    let body = req.body;


    let user = new User({

        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,

    });


    user.save((err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //   userDB.password = null;

        res.json({

            ok: true,
            user: userDB
        });


    });



});

app.put('/user/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'status']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {

        userDB.save(body);

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,

            user: userDB

        });

    });





});


app.delete('/user/:id', function(req, res) {



    let id = req.params.id;
    let changeStatus = {

        Status: false
    };

    // delete all file of the system, 

    // User.findByIdAndRemove(id, (err, userdelete) => {
    User.findByIdAndUpdate(id, changeStatus, { new: true }, (err, userdelete) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!userdelete) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "user not found"
                }
            });
        }

        res.json({

            ok: true,
            user: userdelete

        });


    })

});

module.exports = app;