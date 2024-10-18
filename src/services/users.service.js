/** El Archivo de Servicio tiene la responsabilidad unica de hacer consultas a la base de datos */
const UserModel = require("../models/User.model");
const { encryptedPassword } = require("../helpers/bcrypt.helper");

const dbGetUser = async () => {
    return await ProductModel.find().populate('userId');
}

const dbGetUserById = async ( _id ) => {
    return await ProductModel.findOne({ _id });
}

const dbInsertUser = async ( newProduct ) => {
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

const dbUpdateUser = async ( id, updatedProduct ) => {
    return await ProductModel.findOneAndUpdate(
        { _id: id },        // Objeto de consulta
        updatedProduct,     // Objeto con las propiedades y valores a actualizar
        { new: true }       // Configurando la salida de la consulta
    );
}

const dbDeleteUser = async ( id ) => {
    return await ProductModel.findByIdAndDelete( id );
}
module.exports = {
    dbGetUser,
    dbGetUserById,
    dbInsertUser,
    dbUpdateUser,
    dbDeleteUser
};