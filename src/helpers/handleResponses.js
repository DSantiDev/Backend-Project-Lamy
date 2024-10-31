
const handleResponseSuccess = ( res, statusCode, data ) => {
    // Enviando un objeto JSON como respuesta al usuario que realizo la peticion
    res.status( statusCode ).json({
        ok: true,
        data: data
    });
}

const handleResponseError = ( res, statusCode, msg, error ) => {
    console.log(error);
    
    if( error ) {
        console.error( error );                // Mostramos el mensaje de error al desarrollador en la terminal
    }
    
    const errors = verifyFieldErrors( error );

    res.status( statusCode ).json({            // Enviando un objeto JSON como respuesta al usuario que realizo la peticion
        ok: false,
        msg: msg,
        errors: errors
    }); 
}
 
const verifyFieldErrors = ( error ) => {
    const errors = {};      // Define objeto donde se almacenaran los mensajes de error y el nombre del campo que produce el error

    /** Validamos si existen los errores de validacion */
    if( error?.name === 'ValidationError' ) {

        /** Iteramos el objeto de error.errors por cada una de las propiedades que contenga */
        for( let property in error.errors ) {
            // console.log( '--->>>', property );
            errors[ property ] = error.errors[ property ].message; 
        }

        // console.errors( errors );
    }

    // Manejo de errores de clave duplicada
    // TODO: Validar si la actualizacion es PUT y evitar que este error se guarde, para permitir la actualizacion
    if( error?.code === 11000 ) {
        errors[ 'reference' ] = 'La referencia ya existe. Esta debe ser un valor único'
    }

    return errors;
}

module.exports = {
    handleResponseSuccess,
    handleResponseError
}

