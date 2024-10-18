const express = require( 'express' );
const router = express.Router();

const { authUser} = require('../middlewares/auth-user.middleware');
const { createUser, getUser, getUserById, updateUserPatch, deleteUser } = require('../controllers/users.controller');
const { authRole } = require('../middlewares/auth-role.middleware');

/** Definir las rutas para la entidad producto
 * http://localhost:3000/api/products/
*/

router.post( '/',authRole, authUser, createUser  );           // Crear un producto

router.get( '/',authRole, getUser );                         // Obtiene todos los productos
router.get( '/:id',authRole, getUserById );                   // Obtiene un producto por su ID                            
// router.put( '/', authUser, updateProductPut );        // Actualiza todos los campos de un producto
router.patch( '/:id',authRole, authUser, updateUserPatch);    // Actualiza parcialmente los campos de un producto
router.delete( '/:id',authRole, authUser, deleteUser );        // Elimina un producto



module.exports = router;