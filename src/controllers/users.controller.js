const { dbGetUser, dbGetUserById, dbInsertUser, dbUpdateUser, dbDeleteUser } = require("../services/users.service");



// Muestra todos los productos registrados
async function getUser( req, res ) {
    /** ! TODO: Obtener los productos paginados */
    try {
        const data = await dbGetUser();

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al obtener todos los usuarios'
        });
    }
}

async function getUserById( req, res ) {
    const productId = req.params.id;

    try {
        const data = await dbGetUserById( productId );

        /** Valida si el producto NO fue encontrado */
        if( ! data ) {
            res.status( 404 ).json({
                ok: false,
                msg: 'usuario no encontrado'
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
            msg: 'Error al obtener un usuario por ID'
        })  
    }

}

async function createUser( req, res ) {
    const payload = req.authUser;
    const inputData = req.body;
    console.log( inputData );       // Testing

    inputData.userId = payload.id;

    try {
        const data = await dbInsertUser( inputData );
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
            msg: 'Error al crear un usuario'
        })
    }

}

function updateUserPut( req, res ) {
    res.json({
        ok: true,
        msg: 'Actualiza todos los campos del usuario'
    });
}

async function updateUserPatch( req, res ) {
    const productId = req.params.id;
    const inputData = req.body;

    try {
        const data = await dbUpdateUser( productId, inputData );

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al actualizar un usuario por ID'
        })   
    }
}

async function deleteUser( req, res ) {
    const productId = req.params.id;
    /** ! TODO: Validar cuando no encuentra un producto y responder al usuario */

    try {
        const data = await dbDeleteUser( productId );

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al eliminar un usuario por ID'
        })
    } 
}



module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUserPut,
    updateUserPatch,
    deleteUser
}