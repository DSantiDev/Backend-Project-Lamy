const mongoose = require( 'mongoose');

const ContactSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }

});

const ContactModel = mongoose.model(
    'contact',          //Nombre de la coleccion
    ContactSchema       //Estructura de datos de nuestro modelo
);

module.exports = ContactModel;