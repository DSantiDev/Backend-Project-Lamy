const mongoose = require( 'mongoose' );

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
    phone: {
        type: Number,
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
    timestamps: true    
});

const UserModel = mongoose.model(
    'users',           
    UserSchema          
); 


module.exports = UserModel;