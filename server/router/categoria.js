const express = require('express');
let { verificaToken, verificaAdmin_Role } = require('../middlewares/authentication');
let app = express();


let Categoria = require('../model/category');

//
//show all categories
//
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({}).exec((err, categorias) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categorias
        })
    });



});

//
//show one categorie by ID
//

app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });

        }
        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: { message: 'el Id no es valido' }
            });

        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });
});



app.post('/categoria', verificaToken, (req, res) => {

    // cregresa la nueva categoria
    //req.user._id;
    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        user: req.user._id



    });
    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });

        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});

app.put('/categoria/:id', (req, res) => {

    let id = req.params.id;
    //descripcion de la categoria
    let body = req.body;
    let descCategaria = { descripcion: body.descripcion }
    Categoria.findByIdAndUpdate(id, descCategaria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });

        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });


    })

});

app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: { message: 'El id no existe' }
            });

        }

        res.json({
            ok: true,
            message: 'categoria Borrada'
        });




    });

    // solo un administrador puede borrar categorias
    //tieneque pedir el toquen, eliminar por completo
    // posman categoria.
});












module.exports = app;