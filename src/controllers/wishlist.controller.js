const { dbInsertWishList, dbGetWishList, dbUpdateWishList, dbDeleteWishList, dbGetWishListById, findProductInWishList } = require('../services/wishlist.service');


async function insertWishList( req, res ) {
    const payload = req.authUser;
    const inputData = req.body;
    console.log( inputData );       // Testing

    inputData.userId = payload.id;

    try {
        const data = await dbInsertWishList( inputData );
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
            msg: 'Error al insertar el producto a la lista de deseos '
        })
    }

}
async function GetWishList( req, res ) {
    /** ! TODO: Obtener los productos paginados */
    try {
        const data = await dbGetWishList();

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al obtener todos los productos de la lista de deseos'
        });
    }
}
async function getWishListById( req, res ) {
    const productId = req.params.id;

    try {
        const data = await dbGetWishListById( productId );

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
async function updateWishListPatch( req, res ) {
    const productId = req.params.id;
    const inputData = req.body;

    try {
        const data = await dbUpdateWishList( productId, inputData );

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

async function deleteWishList( req, res ) {
    const productId = req.params.id;
    /** ! TODO: Validar cuando no encuentra un producto y responder al usuario */

    try {
        const data = await dbDeleteWishList( productId );

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
const getProductFromWishList = async (req, res) => {
    const { userId, productName } = req.params;

    try {
        const product = await findProductInWishList(userId, productName);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found in wish list' });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
module.exports = {
    insertWishList,
    GetWishList,
    getWishListById,
    updateWishListPatch,
    deleteWishList,
    getProductFromWishList
};