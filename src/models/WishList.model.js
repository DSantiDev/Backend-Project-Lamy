const mongoose = require( 'mongoose' );

const WishListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    wishList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    }]
}, {
    timestamps: true    // Agrega campos de fecha: creacion y actualizacion del documento
});

const WishListModel = mongoose.model(
    'WishList',            // Nombre de la coleccion
    WishListSchema          // Estructura de datos de nuestro modelo
); 


module.exports = WishListModel;