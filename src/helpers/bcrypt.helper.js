const bcrypt = require( 'bcrypt' ); 


const encryptedPassword = ( pass ) => {
    const salt = bcrypt.genSaltSync();      // Genera una cadena aleatoria para mezclara con el password original del usuario

    // Combina el password original y el salt
    const hashPassword = bcrypt.hashSync(
        pass,       // Password original del usuario
        salt        // Cadena aleatoria
    );

    return hashPassword;
}

const verifyEncriptedPassword = ( pass, hashPass ) => {
    return bcrypt.compareSync( 
        pass,       // Password original del usuario
        hashPass    // Cadena aleatoria
    );
}


module.exports = {
    encryptedPassword,
    verifyEncriptedPassword
}