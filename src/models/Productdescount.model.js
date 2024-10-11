const { Schema, model } = require( 'mongoose' );

const ProductdescountSchema = new Schema({
    name: {                 
        type: String,       
        required: true
    },
    description: {
        type: String
    },   
    price: {                
        type: Number,       
        default: 0,         
        min: 0             
    },
    descount: {                
        type: Number,       
        default: 0,         
        min: 0              
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    },
    category: {
        type: String,
        required: true,
        default: 'non-category'
    },
    urlImage: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true        
});


const ProductdescountModel = model( 
    'productsdescount',     
    ProductdescountSchema
);


module.exports = ProductdescountModel;      
