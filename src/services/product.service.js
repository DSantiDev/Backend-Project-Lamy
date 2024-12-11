/** El Archivo de Servicio tiene la responsabilidad unica de hacer consultas a la base de datos */
const mongoose = require('mongoose');
const ProductModel = require("../models/Product.model");
const Categorymodel = require("../models/category.model");

const dbGetProducts = async () => {
    return await ProductModel.find().populate('userId');
}

const dbGetProductById = async ( _id ) => {
    return await ProductModel.findOne({ _id });
}

const dbInsertProduct = async ( newProduct ) => {
    try {
        const product = new ProductModel(newProduct);
        await product.save();

        return product;  // Devolvemos el producto creado

    } catch (error) {
        console.error('Error al insertar el producto:', error);
        throw error;
    } 
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

const findProductByName = async (searchParams) => {
    const { name, description } = searchParams;

    // Construimos el query
    let searchQuery = {};

    if (name) {
        searchQuery.name = { $regex: name, $options: 'i' };
    }

    if (description) {
        searchQuery.description = { $regex: description, $options: 'i' };
    }

    return await ProductModel.find(searchQuery).populate('userId');
};
const dbGetProductscategory = async (categoryName) => {
    try {
        // Asegúrate de que categoryName es un string no vacío
        if (!categoryName) {
            throw new Error('El nombre de la categoría es obligatorio.');
        }

        // Busca la categoría por nombre
        const category = await Categorymodel.findOne({ name: categoryName }).populate('products');
        
        if (!category) {
            throw new Error(`Categoría "${categoryName}" no encontrada.`);
        }

        // Devuelve los productos de esa categoría
        return category.products;  // Devuelve los productos como un array
    } catch (error) {
        console.error('Error al obtener productos de la categoría:', error);
        throw error; // Relanzamos el error para que lo capture el controlador
    }
}
module.exports = {
    dbGetProducts,
    dbGetProductById,
    dbInsertProduct,
    dbUpdateProduct,
    dbDeleteProduct,
    findProductByName,
    dbGetProductscategory
};