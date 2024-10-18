const { dbGetOrder, dbInsertOrder, dbGetOrderById, dbUpdateOrder, dbDeleteOrder } = require("../services/orden.service");


async function insertorder( req, res ) {
    const payload = req.authUser;
    const inputData = req.body;
    console.log( inputData );       // Testing

    inputData.userId = payload.id;

    try {
        const data = await dbInsertOrder( inputData );
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
            msg: 'Error al insertar el producto a la orden'
        })
    }

}
async function Getorder( req, res ) {
    /** ! TODO: Obtener los productos paginados */
    try {
        const data = await dbGetOrder();

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al obtener todos los productos de la orden'
        });
    }
}
async function getorderById( req, res ) {
    const productId = req.params.id;

    try {
        const data = await dbGetOrderById( productId );

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
async function updateOrderPatch( req, res ) {
    const productId = req.params.id;
    const inputData = req.body;

    try {
        const data = await dbUpdateOrder( productId, inputData );

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

async function deleteorder( req, res ) {
    const productId = req.params.id;
    /** ! TODO: Validar cuando no encuentra un producto y responder al usuario */

    try {
        const data = await dbDeleteOrder( productId );

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
module.exports = {
    insertorder,
    Getorder,
    getorderById,
    updateOrderPatch,
    deleteorder
};