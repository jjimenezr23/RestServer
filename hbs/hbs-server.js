const express = require("express");
const app = express();
var hbs = require('hbs');




//express HBS
app.set('view engine', 'hbs');

app.get('/', (req, res) => {

    res.render('login');

});



module.exports = {

    app
}