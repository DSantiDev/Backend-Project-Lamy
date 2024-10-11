const { dbGetProductsdescount, dbGetProductdescountById, dbInsertProductdescount, dbUpdateProductdescount, dbDeleteProductdescount, findProductByName } = require("../services/productdescount.service");


async function getProductsdescount( req, res ) {

    try {
        const data = await dbGetProductsdescount();

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

async function getProductdescountById( req, res ) {
    const productId = req.params.id;

    try {
        const data = await dbGetProductdescountById( productId );

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

async function createProductdescount( req, res ) {
    const payload = req.authUser;
    const inputData = req.body;
    console.log( inputData );       

    inputData.userId = payload.id;

    try {
        const data = await dbInsertProductdescount( inputData );
        console.log( data );           
    
        res.status( 201 ).json({
            ok: true,
            data           
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


async function updateProductdescountPatch( req, res ) {
    const productId = req.params.id;
    const inputData = req.body;

    try {
        const data = await dbUpdateProductdescount( productId, inputData );

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

async function deleteProductdescount( req, res ) {
    const productId = req.params.id;

    try {
        const data = await dbDeleteProductdescount( productId );

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

        return res.status(200).json(product); 
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};



module.exports = {
    getProductsdescount,
    getProductdescountById,
    createProductdescount,
    updateProductdescountPatch,
    deleteProductdescount,
    getProductByName
}