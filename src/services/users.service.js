const UserModel = require("../models/User.model");
const { encryptedPassword } = require("../helpers/bcrypt.helper");

const dbGetUser = async () => {
    // Aquí podrías agregar lógica para excluir la contraseña en todos los usuarios
    return await UserModel.find().select('-password -createdAt -updatedAt -__v').populate('userId');
}

const dbGetUserById = async (_id) => {
    try {
        const user = await UserModel.findOne({ _id });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        const { password, createdAt, updatedAt, __v, ...userWithoutSensitiveData } = user.toObject();
        return userWithoutSensitiveData;

    } catch (error) {
        throw new Error(`Error al obtener el usuario`);
    }
}


const dbInsertUser = async (newUser) => {
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
    const { password, createdAt, updatedAt, __v, ...userWithoutPassword } = savedUser.toObject();

    return userWithoutPassword;
}

const dbUpdateUser = async (id, updatedUser) => {
    // Aquí también puedes eliminar el campo password si está presente en updatedUser
    if (updatedUser.password) {
        delete updatedUser.password; // Evitar que la contraseña se actualice accidentalmente
    }
    
    const user = await UserModel.findOneAndUpdate(
        { _id: id },
        updatedUser,
        { new: true }
    );

    // Eliminar campos sensibles antes de devolver el usuario actualizado
    if (user) {
        const { password, createdAt, updatedAt, __v, ...userWithoutSensitiveData } = user.toObject();
        return userWithoutSensitiveData;
    }
    return null; // Manejar el caso donde no se encuentra el usuario
}

const dbDeleteUser = async (id) => {
    return await UserModel.findByIdAndDelete(id);
}

module.exports = {
    dbGetUser,
    dbGetUserById,
    dbInsertUser,
    dbUpdateUser,
    dbDeleteUser
};
