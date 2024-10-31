const { handleResponseSuccess, handleResponseError } = require("../helpers/handleResponses");
const {dbCreateSubcategory,dbGetSubcategories,dbGetPaginatedSubcategories,dbGetSubcategoryById,dbRemoveSubcategoryById,dbUpdateSubcategoryByIdPatch,dbCountSubcategoryRecords
} = require("../services/subcategory.service");

// Obtener todas las subcategorías
const getSubcategories = async (req, res) => {
    try {
        const data = await dbGetSubcategories();
        handleResponseSuccess(res, 200, data);
    } catch (error) {
        handleResponseError(res, 500, 'Error al obtener todas las subcategorías', error);
    }
};

// Obtener subcategorías paginadas
const getPaginatedSubcategories = async (req, res) => {
    const page = parseInt(req.params.page) || 1;
    const pageSize = parseInt(req.params.pageSize) || 10;

    try {
        const total = await dbCountSubcategoryRecords();
        const data = await dbGetPaginatedSubcategories(page, pageSize);

        handleResponseSuccess(res, 200, { subcategories: data, page, pageSize, total });
    } catch (error) {
        handleResponseError(res, 500, 'Error al obtener las subcategorías paginadas', error);
    }
};

// Obtener subcategoría por ID
const getSubcategoryById = async (req, res) => {
    const subcategoryId = req.params.id;

    try {
        const data = await dbGetSubcategoryById(subcategoryId);

        if (!data) {
            return handleResponseError(res, 404, 'Subcategoría no encontrada');
        }

        handleResponseSuccess(res, 200, data);
    } catch (error) {
        handleResponseError(res, 500, 'Error al obtener una subcategoría por ID', error);
    }
};

// Crear una nueva subcategoría
const createSubcategory = async (req, res) => {
    const inputData = req.body;

    try {
        const data = await dbCreateSubcategory(inputData);
        handleResponseSuccess(res, 201, data);
    } catch (error) {
        handleResponseError(res, 500, 'Error al crear una nueva subcategoría', error);
    }
};

// Actualizar parcialmente una subcategoría por ID
const updateSubcategoryById = async (req, res) => {
    const subcategoryId = req.params.id;
    const inputData = req.body;

    try {
        const data = await dbUpdateSubcategoryByIdPatch(subcategoryId, inputData);

        if (!data) {
            return handleResponseError(res, 404, 'Subcategoría no encontrada');
        }

        handleResponseSuccess(res, 200, data);
    } catch (error) {
        handleResponseError(res, 500, 'Error al actualizar parcialmente la subcategoría por ID', error);
    }
};

// Eliminar una subcategoría por ID
const removeSubcategoryById = async (req, res) => {
    const subcategoryId = req.params.id;

    try {
        const data = await dbRemoveSubcategoryById(subcategoryId);

        if (!data) {
            return handleResponseError(res, 404, 'Subcategoría no encontrada');
        }

        handleResponseSuccess(res, 200, data);
    } catch (error) {
        handleResponseError(res, 500, 'Error al eliminar una subcategoría por ID', error);
    }
};

module.exports = {
    getSubcategories,
    getPaginatedSubcategories,
    getSubcategoryById,
    createSubcategory,
    updateSubcategoryById,
    removeSubcategoryById
};
