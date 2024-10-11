/** El Archivo de Servicio tiene la responsabilidad unica de hacer consultas a la base de datos */

const ProductModel = require("../models/Product.model");

const dbGetProducts = async () => {
    return await ProductModel.find().populate('userId');
}

const dbGetProductById = async ( _id ) => {
    return await ProductModel.findOne({ _id });
}

const dbInsertProduct = async ( newProduct ) => {
    return await ProductModel.create( newProduct );
}

const dbUpdateProduct = async ( id, updatedProduct ) => {
    return await ProductModel.findOneAndUpdate(
        { _id: id },        // Objeto de consulta
        updatedProduct,     // Objeto con las propiedades y valores a actualizar
        { new: true }       // Configurando la salida de la consulta
    );
}

const dbDeleteProduct = async ( id ) => {
    return await ProductModel.findByIdAndDelete( id );
}

const findProductByName = async (productName) => {
    // Buscar el producto por nombre
    const product = await ProductModel.findOne({ name: productName });

    if (!product) {
        throw new Error('Product not found');
    }

    return product; // Devuelve el producto encontrado
};

module.exports = {
    dbGetProducts,
    dbGetProductById,
    dbInsertProduct,
    dbUpdateProduct,
    dbDeleteProduct,
    findProductByName
};