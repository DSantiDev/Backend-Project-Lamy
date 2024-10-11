const express = require( 'express' );
const { register, login, reNewToken } = require('../controllers/auth.controller');
const { authUser } = require('../middlewares/auth-user.middleware');
const router = express.Router();

/**Definir las rutas para la entidad usuario 
 * http://localhost:3000/api/auth
*/

// Crear un usuario --> http://localhost:3000/api/auth/register
router.post( '/register', register );
// Autenticar usuario --> http://localhost:3000/api/auth/login
router.post( '/login', login );
// Renovar las credenciales (Token) --> http://localhost:3000/api/auth/re-new-token
router.get( '/re-new-token', authUser, reNewToken);


module.exports = router;