const SubcategoryModel = require("../models/subcategory.model");

// Crear una nueva subcategoría
const dbCreateSubcategory = async (newSubcategory) => {
    return await SubcategoryModel.create(newSubcategory);
};

// Obtener todas las subcategorías
const dbGetSubcategories = async () => {
    return await SubcategoryModel.find({}).populate('category', 'name description');
};

// Obtener subcategorías paginadas
const dbGetPaginatedSubcategories = async (page, pageSize, filter = {}) => {
    return await SubcategoryModel.find(filter)
        .populate('category', 'name description')
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort({ createdAt: -1 });
};

// Obtener subcategoría por ID
const dbGetSubcategoryById = async (id) => {
    return await SubcategoryModel.findOne({ _id: id }).populate('category', 'name description');
};

// Eliminar subcategoría por ID
const dbRemoveSubcategoryById = async (id) => {
    return await SubcategoryModel.findByIdAndDelete(id);
};

// Actualizar parcialmente una subcategoría por ID (PATCH)
const dbUpdateSubcategoryByIdPatch = async (id, updateSubcategory) => {
    return await SubcategoryModel.findByIdAndUpdate(
        id,
        { $set: updateSubcategory },
        { new: true, runValidators: true }
    ).populate('category', 'name description');
};

// Reemplazar completamente una subcategoría por ID (PUT)
const dbUpdateSubcategoryByIdPut = async (id, updateSubcategory) => {
    return await SubcategoryModel.findOneAndReplace(
        { _id: id },
        updateSubcategory,
        { new: true, runValidators: true }
    ).populate('category', 'name description');
};

// Contar el total de subcategorías
const dbCountSubcategoryRecords = async (filter = {}) => {
    return await SubcategoryModel.countDocuments(filter);
};

module.exports = {
    dbCreateSubcategory,
    dbGetSubcategories,
    dbGetPaginatedSubcategories,
    dbGetSubcategoryById,
    dbRemoveSubcategoryById,
    dbUpdateSubcategoryByIdPatch,
    dbUpdateSubcategoryByIdPut,
    dbCountSubcategoryRecords
};