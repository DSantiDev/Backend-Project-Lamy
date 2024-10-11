const HistoryModel = require("../models/History.model");
const ProductModel = require("../models/Product.model");

const dbHistory = async ( newHistory ) => {
    const existingHistory = await HistoryModel.findOne({ userId: newHistory.userId });
    
    if (existingHistory) {
        return existingHistory;
    }
    return await HistoryModel.create( newHistory );
}

const dbGetHistory = async () => {
    return await HistoryModel.find().populate(['productsList','userId']);
}

const dbGetHistoryById = async ( _id ) => {
    return await HistoryModel.findOne({ _id }).populate(['userId', 'productsList']);
}

const dbUpdateHistory = async ( id, updatedProduct ) => {
    return await HistoryModel.findOneAndUpdate(
        { _id: id },        
        updatedProduct,    
        { new: true }       
    );
}

const dbDeleteHistory = async ( id ) => {
    return await HistoryModel.findByIdAndDelete( id ).populate(['userId', 'productsList']);
}
const findProductInHistory = async (userId, productName) => {
    const history = await HistoryModel.findOne({ userId }).populate('productsList');

    if (!history) {
        throw new Error('History not found');
    }

    const product = history.productsList.find(item => item.name === productName);
    
    return product || null; // Devuelve el producto o null si no se encuentra
};

module.exports = {
    dbHistory,
    dbGetHistory,
    dbGetHistoryById,
    dbUpdateHistory,
    dbDeleteHistory,
    findProductInHistory
}