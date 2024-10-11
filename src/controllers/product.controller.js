const { dbInsertProduct, dbGetProducts, dbGetProductById, dbDeleteProduct, dbUpdateProduct, findProductByName } = require('../services/product.service');


// Muestra todos los productos registrados
async function getProducts( req, res ) {
    /** ! TODO: Obtener los productos paginados */
    try {
        const data = await dbGetProducts();

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al obtener todos los productos'
        });
    }
}

async function getProductById( req, res ) {
    const productId = req.params.id;

    try {
        const data = await dbGetProductById( productId );

        /** Valida si el producto NO fue encontrado */
        if( ! data ) {
            res.status( 404 ).json({
                ok: false,
                msg: 'Producto no encontrado'
            });
        } 

        res.status( 200 ).json({
            ok: true,
            data
        });
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al obtener un producto por ID'
        })  
    }

}

async function createProduct( req, res ) {
    const payload = req.authUser;
    const inputData = req.body;
    console.log( inputData );       // Testing

    inputData.userId = payload.id;

    try {
        const data = await dbInsertProduct( inputData );
        console.log( data );            // Testing
    
        res.status( 201 ).json({
            ok: true,
            data           // ECMAScript data: data ---> data
        });        
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al crear un producto'
        })
    }

}

function updateProductPut( req, res ) {
    res.json({
        ok: true,
        msg: 'Actualiza todos los campos del producto'
    });
}

async function updateProductPatch( req, res ) {
    const productId = req.params.id;
    const inputData = req.body;

    try {
        const data = await dbUpdateProduct( productId, inputData );

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al actualizar un producto por ID'
        })   
    }
}

async function deleteProduct( req, res ) {
    const productId = req.params.id;
    /** ! TODO: Validar cuando no encuentra un producto y responder al usuario */

    try {
        const data = await dbDeleteProduct( productId );

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al eliminar un producto por ID'
        })
    } 
}

const getProductByName = async (req, res) => {
    const { productName } = req.params;

    try {
        const product = await findProductByName(productName);

        return res.status(200).json(product); // Devolvemos el producto encontrado
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};



module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProductPut,
    updateProductPatch,
    deleteProduct,
    getProductByName
}