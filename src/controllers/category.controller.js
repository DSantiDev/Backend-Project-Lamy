const { handleResponseSuccess, handleResponseError } = require("../helpers/handleResponses");
const { dbGetPaginatedCategories, dbGetCategoryById, dbCreateCategory, dbUpdateCategoryByIdPatch, dbRemoveCategoryById, dbGetCategories, dbCountRecords } = require("../services/category.service");


const getCategories = async ( req, res ) => {
    
    try {
        const data = await dbGetCategories();

        handleResponseSuccess( res, 200, data );
    } 
    catch ( error ) {       // Capturando la excepcion
        handleResponseError( res, 500, 'Error al obtener todas las categorias', error  );   
    }

}

// Obtener todas las categorias paginadas
async function getPaginatedCategories( req, res ) {
    const 
        payload = req.authUser,
        page = parseInt( req.params.page ) || 1,
        pageSize = parseInt( req.params.pageSize ) || 10;

    try {
        const total = await dbCountRecords();
        const data = await dbGetPaginatedCategories( page, pageSize );

        console.log( page, pageSize, data );

        handleResponseSuccess( res, 200, { categories: data, page, pageSize, total });
    
    } 
    catch ( error ) {
        handleResponseError( res, 500, 'Error al obtener todas las categorias', error );
    }
    
}

const getCategoryById = async ( req, res ) => {
    const categoryId = req.params.id;

    try {
        const data = await dbGetCategoryById( categoryId );

        if( ! data ) {
            return handleResponseError( res, 404, 'Categoria no encontrada' );
        }

        handleResponseSuccess( res, 200, data );
    } 
    catch ( error ) {
        handleResponseError( res, 500, 'Error al obtener una categoria por ID', error );
    }
}

const createCategory = async ( req, res ) => {
    const inputData = req.body;                     // Obteniendo los datos de la peticion
    const payload = req.authUser;                   // Obteniendo el payload del Token

    console.log( '>>>> ', payload );

    inputData.userId = payload.id;
    // console.log( '>> inputData >>', inputData );

    try {
        const data = await dbCreateCategory( inputData );
        // console.log( '>> data >>', data );

        handleResponseSuccess( res, 201, data );
    } 
    catch ( error ) {       // Capturando la excepcion
        handleResponseError( res, 500, 'Error al crear una categoria nueva', error );
    }
}

const updateCategoryById = async ( req, res ) => {
    const categoryId = req.params.id;               // Obteniendo el valor pasado por la URL como parametro
    const inputData = req.body;                     // Obteniendo los datos de la peticion

    try {
        const data = await dbUpdateCategoryByIdPatch( categoryId, inputData );

        if( ! data ) {
            return handleResponseError( res, 404, 'Categoria no encontrada' );
        }

        handleResponseSuccess( res, 200, data );
    } 
    catch ( error ) {
        handleResponseError( res, 500, 'Error al actualizar parcialmente la categoria por ID', error );
    }
}

const removeCategoryById = async ( req, res ) => {
    const categoryId = req.params.id;

    try {
        const data = await dbRemoveCategoryById( categoryId );

        if( ! data ) {
            return handleResponseError( res, 404, 'Categoria no encontrada' );
        }

        handleResponseSuccess( res, 200, data );
    } 
    catch ( error ) {
        handleResponseError( res, 500, 'Error al eliminar una categoria por ID', error );
    }
}


module.exports = {
    getCategories,
    getPaginatedCategories,
    getCategoryById,
    createCategory,
    updateCategoryById,
    removeCategoryById
}