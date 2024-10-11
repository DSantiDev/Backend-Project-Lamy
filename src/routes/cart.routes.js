const express = require( 'express' );
const router = express.Router();

const { authUser } = require('../middlewares/auth-user.middleware');
const { createCart, getCart, getCartById, updateCartPatch, deleteCart, getProductFromCart  } = require('../controllers/cart.contoller');


router.post( '/', authUser, createCart );
router.get( '/',authUser, getCart);             
router.get( '/:id',authUser, getCartById ); 
router.patch( '/:id', authUser, updateCartPatch);
router.delete( '/:id', authUser, deleteCart );                               
// Ruta para obtener un producto en el carrito por nombre
router.get('/:userId/products/:productName',authUser, getProductFromCart);
module.exports = router;