const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let rolValidate = {
    values: ["ADMIN_ROLE", "USER_ROLE"],
    message: "{VALUE} no is a rol validate"
}
let userSchema = new Schema({


    name: {
        type: String,
        required: [true, "the name is nessesary"]
    },
    email: {

        type: String,
        unique: true,
        required: true
    },

    password: {

        type: String,
        required: [true, "la  contraseña es necesaria"]
    },
    img: {

        type: String,
        required: false

    },

    role: {

        type: String,
        default: "USER_ROLE",
        enum: rolValidate

    },
    Status: {

        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false


    }




});

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject
}

module.exports = mongoose.model("User", userSchema);