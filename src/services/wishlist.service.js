const WishListModel = require("../models/WishList.model");
const ProductModel = require('../models/Product.model');

const dbInsertWishList = async ( newWishList  ) => {
    const existingWishList = await WishListModel.findOne({ userId: newWishList.userId});
    
    if (existingWishList) {
        return existingWishList;
    }
    return await WishListModel.create( newWishList );
}
const dbGetWishList = async () => {
    return await WishListModel.find().populate('userId').populate('wishList');
}
const dbGetWishListById = async ( _id ) => {
    return await WishListModel.findOne({ _id });
}
const dbUpdateWishList = async ( id, updatedProduct ) => {
    return await WishListModel.findOneAndUpdate(
        { _id: id },        // Objeto de consulta
        updatedProduct,     // Objeto con las propiedades y valores a actualizar
        { new: true }       // Configurando la salida de la consulta
    );
}

const dbDeleteWishList = async ( id ) => {
    return await WishListModel.findByIdAndDelete( id );
}

const searchProductsInWishList = async (userId, { name, description }) => {
    // Buscar la lista de deseos del usuario
    const wishList = await WishListModel.findOne({ userId }).populate('wishList');

    if (!wishList || wishList.wishList.length === 0) {
        throw new Error('No tienes productos en tu lista de deseos');
    }

    // Filtrar productos por nombre o descripción
    let filteredProducts = wishList.wishList;

    if (name) {
        filteredProducts = filteredProducts.filter(product => product.name.match(new RegExp(name, 'i')));
    }

    if (description) {
        filteredProducts = filteredProducts.filter(product => product.description.match(new RegExp(description, 'i')));
    }

    return filteredProducts;
};

module.exports={
    dbInsertWishList,
    dbGetWishList,
    dbGetWishListById,
    dbUpdateWishList,
    dbDeleteWishList,
    searchProductsInWishList
};