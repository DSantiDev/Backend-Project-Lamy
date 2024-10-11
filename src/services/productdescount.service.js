const ProductdescountModel = require("../models/Productdescount.model");

const dbGetProductsdescount = async () => {
    return await ProductdescountModel.find().populate('userId');
}

const dbGetProductdescountById = async ( _id ) => {
    return await ProductdescountModel.findOne({ _id });
}

const dbInsertProductdescount = async ( newProduct ) => {
    return await ProductdescountModel.create( newProduct );
}

const dbUpdateProductdescount = async ( id, updatedProduct ) => {
    return await ProductdescountModel.findOneAndUpdate(
        { _id: id },        // Objeto de consulta
        updatedProduct,     // Objeto con las propiedades y valores a actualizar
        { new: true }       // Configurando la salida de la consulta
    );
}

const dbDeleteProductdescount = async ( id ) => {
    return await ProductdescountModel.findByIdAndDelete( id );
}

const findProductByName = async (productName) => {
    const product = await ProductdescountModel.findOne({ name: productName });

    if (!product) {
        throw new Error('Product not found');
    }

    return product; 
};

module.exports = {
    dbGetProductsdescount,
    dbGetProductdescountById,
    dbInsertProductdescount,
    dbUpdateProductdescount,
    dbDeleteProductdescount,
    findProductByName
};