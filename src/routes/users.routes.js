const express = require( 'express' );
const router = express.Router();

const { authUser} = require('../middlewares/auth-user.middleware');
const { createUser, getUser, getUserById, updateUserPatch, deleteUser } = require('../controllers/users.controller');
const { authRole } = require('../middlewares/auth-role.middleware');

/** Definir las rutas para la entidad producto
 * http://localhost:3000/api/products/
*/

router.post( '/', authUser, createUser  );           // Crear un producto

router.get( '/', getUser );                         // Obtiene todos los productos
router.get( '/:id', getUserById );                   // Obtiene un producto por su ID                            
// router.put( '/', authUser, updateProductPut );        // Actualiza todos los campos de un producto
router.patch( '/:id', authUser, updateUserPatch);    // Actualiza parcialmente los campos de un producto
router.delete( '/:id', authUser, deleteUser );        // Elimina un producto



module.exports = router;