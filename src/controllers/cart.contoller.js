const { dbCart, dbGetCart, dbGetCartById, dbUpdateCart, dbDeleteCart,  findProductInCart, searchProductsInCart } = require("../services/cart.service")

async function createCart( req, res ) {
    const payload = req.authUser;
    const inputData = req.body;
    console.log( inputData );      

    inputData.userId = payload.id;

    try {
        const data = await dbCart( inputData );

    
        res.status( 201 ).json({
            ok: true,
            data           
        });        
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al crear un carrito'
        })
    }
}

async function getCart( req, res ) {

    try {
        const data = await dbGetCart();

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al obtener todos los carritos'
        });
    }
}

async function getCartById( req, res ) {
    const historyId = req.params.id;

    try {
        const data = await dbGetCartById( historyId );

        if( ! data ) {
            res.status( 404 ).json({
                ok: false,
                msg: 'Carrito no encontrado'
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
            msg: 'Error al obtener un carrito por ID'
        })  
    }

}

async function updateCartPatch( req, res ) {
    const productId = req.params.id;
    const inputData = req.body;

    try {
        const data = await dbUpdateCart( productId, inputData );

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al actualizar un carrito por ID'
        })   
    }
}

async function deleteCart( req, res ) {
    const historyId = req.params.id;

    try {
        const data = await dbDeleteCart( historyId );

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al eliminar un carrito por ID'
        })
    }

    
}

const getProductInCartByName = async (req, res) => {
    const { userId, name, description } = req.body;

    try {
        const products = await searchProductsInCart(userId, { name, description });

        if (products.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron productos en tu carrito que coincidan con los criterios de búsqueda.'
            });
        }

        return res.status(200).json({
            ok: true,
            data: products
        });
    } catch (error) {
        console.error('Error en la búsqueda de productos en el carrito:', error);
        return res.status(500).json({
            ok: false,
            msg: error.message || 'Error al buscar productos en el carrito'
        });
    }
};


module.exports = { 
    createCart, 
    getCart, 
    getCartById, 
    updateCartPatch, 
    deleteCart,
    getProductInCartByName
}