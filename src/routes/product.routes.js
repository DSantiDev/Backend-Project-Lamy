const express = require( 'express' );
const router = express.Router();

const { getProducts, createProduct, updateProductPatch, deleteProduct, getProductById, getProductByName } = require('../controllers/product.controller');
const { authUser, greeting } = require('../middlewares/auth-user.middleware');

/** Definir las rutas para la entidad producto
 * http://localhost:3000/api/products/
*/

router.post( '/', authUser, createProduct  );           
router.get( '/', getProducts );                         
router.get( '/:id', getProductById );                                              
router.patch( '/:id', authUser, updateProductPatch );    
router.delete( '/:id', authUser, deleteProduct );        
router.get('/products/:productName', getProductByName);

module.exports = router;