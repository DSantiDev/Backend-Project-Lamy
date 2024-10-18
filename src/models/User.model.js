const mongoose = require( 'mongoose' );

const contactUser = require('../models/Contact.model' );

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'registered'
    }
}, {
    timestamps: true    // Agrega campos de fecha: creacion y actualizacion del documento
});

const UserModel = mongoose.model(
    'users',            // Nombre de la coleccion
    UserSchema          // Estructura de datos de nuestro modelo
); 


module.exports = UserModel;