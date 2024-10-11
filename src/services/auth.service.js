const { encryptedPassword } = require("../helpers/bcrypt.helper");
const UserModel = require("../models/User.model");

const dbGetUserByUsername = async ( email ) => {
    return await UserModel.findOne({ username: email });
}

const dbRegisterUser = async ( newUser ) => {
    const dbUser = new UserModel( newUser );  // Prepara los datos en JSON para registrar en MongoDB 

    const hashPassword = encryptedPassword( dbUser.password );
    // console.log( hashPassword );

    dbUser.password = hashPassword;     // Reescribiendo el password original por el encriptado

    const dbTempUser = await dbUser.save();   // Guarda en la base de datos y devuelve el usuario registrado
    const dataUser = dbTempUser.toObject();
    delete dataUser.password;
    delete dataUser.createdAt;
    delete dataUser.updatedAt;
    delete dataUser.__v; 
    return dataUser;
}


module.exports = {
    dbGetUserByUsername,
    dbRegisterUser
}