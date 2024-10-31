const CategoryModel = require("../models/category.model");



const dbCreateCategory = async ( newCategory ) => {
    // Insertando datos en la base de datos usando el Modelo Diseñado para esta Entidad
    return await CategoryModel.create( newCategory );        
}

const dbGetCategories = async () => {
    // Obteniendo todos los datos de la base de datos usando el Modelo Diseñado para esta Entidad
    return await CategoryModel.find({});
}

const dbGetPaginatedCategories = async ( page, pageSize, filter = {} ) => {
    return await CategoryModel.find( filter )
        .skip( ( page - 1 ) * pageSize )
        .limit( pageSize )
        .sort({ createAt: -1 });
}

const dbGetCategoryById = async ( id ) => {
    // Obteniendo categoria por ID de la base de datos usando el Modelo Diseñado para esta Entidad
    return await CategoryModel.findOne({ _id: id });
}

const dbRemoveCategoryById = async ( id ) => {
    // return await CategoryModel.findOneAndDelete({ _id: CategoryId });
    return await CategoryModel.findByIdAndDelete( id );
}

async function dbUpdateCategoryByIdPatch( id, updateCategory ) {
    // return await CategoryModel.findOneAndUpdate(
    //     { _id: id },                 // Objeto de consulta
    //     { $set: updateCategory },     // Estableciendo o actualizando parcialmente los campos del objeto (Categoryo)
    //     { new: true }                // Habilita mostrar los cambios actuales realizados al objeto
    // );
    return await CategoryModel.findByIdAndUpdate(
        id,                  // Id del objeto a encontrar
        { $set: updateCategory },                // Estableciendo o actualizando parcialmente los campos del objeto (Categoryo)
        { new: true, runValidators: true }      // Habilita mostrar los cambios actuales realizados al objeto
    );
}

async function dbUpdateCategoryByIdPut( id, updateCategory ) {
    return await CategoryModel.findOneAndReplace(
        { _id: id },
        updateCategory,
        { new: true, runValidators: true }
    );
}

async function dbCountRecords( filter = {}) {
    return await CategoryModel.countDocuments( filter ); // Total de productos
}


module.exports = {
    dbCreateCategory,
    dbGetCategories,
    dbGetPaginatedCategories,
    dbGetCategoryById,
    dbRemoveCategoryById,
    dbUpdateCategoryByIdPatch,
    dbUpdateCategoryByIdPut,
    dbCountRecords
}