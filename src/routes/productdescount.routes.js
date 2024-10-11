const express = require( 'express' );
const router = express.Router();

const {createProductdescount, getProductsdescount, getProductdescountById, updateProductdescountPatch, deleteProductdescount, getProductByName} = require('../controllers/productdescount.controller');
const { authUser, greeting } = require('../middlewares/auth-user.middleware');


/** Definir las rutas para la entidad producto
 * http://localhost:3000/api/products/
*/

router.post( '/', authUser, createProductdescount  );           
router.get( '/', getProductsdescount );                        
router.get( '/:id', getProductdescountById );                                         
router.patch( '/:id', authUser, updateProductdescountPatch );    
router.delete( '/:id', authUser, deleteProductdescount );        
router.get('/products/:productName', getProductByName);

module.exports = router;