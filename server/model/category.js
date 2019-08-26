const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let CategoriaSchema = new Schema({


    descripcion: {
        type: String,
        unique: true,
        require: [true, ],

    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

module.exports = mongoose.model('Categoria', CategoriaSchema);