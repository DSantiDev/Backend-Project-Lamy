const UserModel = require("../models/User.model");

async function authRole(req, res, next) {
    try {
        // Obtener el ID del usuario autenticado desde el payload (suponiendo que 'req.authUser' ya está establecido)
        const userId = req.authUser.id;

        // Buscar al usuario en la base de datos
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        // Verificar que el rol del usuario sea el adecuado
        if (user.role !== 'admin') {  // Aquí se verifica directamente el rol "admin"
            return res.status(403).json({
                ok: false,
                msg: 'No tienes permisos de administrador'
            });
        }

        // Si el rol es adecuado, continuar con la siguiente lógica
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        });
    }
}

module.exports = {
    authRole
};
