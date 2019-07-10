require('./config/config');


const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//global confi router
app.use(require('./router/index'));




mongoose.connect('mongodb://localhost:27017/cafe', {
    useNewUrlParser: true,
    useCreateIndex: true
}, (err, res) => {

    if (err) throw err;

    console.log("Base de datos ONLINE");
});




app.listen(process.env.PORT, () => {

    console.log('corriendo en el puerto 3000');

});