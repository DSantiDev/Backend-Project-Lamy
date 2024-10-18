const { encryptedPassword } = require("../helpers/bcrypt.helper");
const UserModel = require("../models/User.model");

const dbGetUserByUsername = async ( email ) => {
    return await UserModel.findOne({ username: email });
}

const dbRegisterUser = async ( newUser ) => {
    if (!newUser.username || newUser.username === '') {
        throw new Error('El email (username) no puede estar vacío');
    }

    const dbUser = new UserModel(newUser);

    // Encriptar la contraseña
    const hashPassword = encryptedPassword(dbUser.password);
    dbUser.password = hashPassword;

    // Guardar el usuario en la base de datos
    const savedUser = await dbUser.save();

    // Eliminar la propiedad password antes de devolver el objeto
    const userWithoutPassword = savedUser.toObject();
    delete userWithoutPassword.password;
    delete userWithoutPassword.createdAt;
    delete userWithoutPassword.updatedAt;
    delete userWithoutPassword.__v;

    return userWithoutPassword;
}


module.exports = {
    dbGetUserByUsername,
    dbRegisterUser
}