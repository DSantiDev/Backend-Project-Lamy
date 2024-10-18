const express = require( 'express' );
const router = express.Router();

const { authUser } = require('../middlewares/auth-user.middleware');
const { createCart, getCart, getCartById, updateCartPatch, deleteCart, getProductInCartByName  } = require('../controllers/cart.contoller');


router.post( '/', authUser, createCart );
router.get( '/',authUser, getCart);             
router.get( '/:id',authUser, getCartById ); 
router.patch( '/:id', authUser, updateCartPatch);
router.delete( '/:id', authUser, deleteCart );                               
// Router para búsqueda en el carrito de compras
router.post('/search', getProductInCartByName);
module.exports = router;