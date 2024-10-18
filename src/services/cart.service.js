const CartModel = require("../models/Cart.model");


const dbCart = async ( newCart ) => {
    const existingCart = await CartModel.findOne({ userId: newCart.userId, status: 'pending' });
    
    if (existingCart) {
        return existingCart;
    }
    return await CartModel.create( newCart );
}

const dbGetCart = async () => {
    return await CartModel.find().populate(['userId']).populate({
        path: 'products.product', 
        model: 'products'
    });
}

const dbGetCartById = async ( _id ) => {
    return await CartModel.findOne({ _id }).populate(['userId']).populate({
        path: 'products.product', 
        model: 'products'
    });
}

const dbUpdateCart = async ( id, updatedCart ) => {
    return await CartModel.findOneAndUpdate(
        { _id: id },        
        updatedCart,    
        { new: true }       
    );
}

const dbDeleteCart = async ( id ) => {
    return await CartModel.findByIdAndDelete( id ).populate(['userId']).populate({
        path: 'products.product', 
        model: 'products'
    });
}

const searchProductsInCart = async (userId, { name, description }) => {
    // Buscar el carrito del usuario
    const cart = await CartModel.findOne({ userId }).populate('products.product');

    if (!cart || cart.products.length === 0) {
        throw new Error('No tienes productos en tu carrito');
    }

    // Filtrar productos por nombre o descripción
    let filteredProducts = cart.products;

    if (name) {
        filteredProducts = filteredProducts.filter(item => 
            item.product.name.match(new RegExp(name, 'i'))
        );
    }

    if (description) {
        filteredProducts = filteredProducts.filter(item => 
            item.product.description.match(new RegExp(description, 'i'))
        );
    }

    return filteredProducts;
};

module.exports = {
    dbCart,
    dbGetCart,
    dbGetCartById,
    dbUpdateCart,
    dbDeleteCart,
    searchProductsInCart
}