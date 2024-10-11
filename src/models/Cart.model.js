const mongoose = require( 'mongoose' );

const CartSchema = new mongoose.Schema ({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            },

            quantity: {
                type: Number,
                required: true,
                default: 1,
                min: 1
            },


        }
    ],

    status: {
        type: String,
        enum: ['pending' , 'finished' , 'delivered' , 'refurbished'],
        default: 'pending'
    }


});

const CartModel = mongoose.model(
    'carts',         
    CartSchema       
);

module.exports = CartModel;