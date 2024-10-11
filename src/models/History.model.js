const mongoose = require( 'mongoose' );

const HistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    productsList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    }]
}, {
    timestamps: true   
});

const HistoryModel = mongoose.model(
    'History',            
    HistorySchema          
); 


module.exports = HistoryModel;