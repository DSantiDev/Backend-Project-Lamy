const express = require( 'express' );
const { authUser } = require('../middlewares/auth-user.middleware');
const { insertorder, Getorder, getorderById, updateOrderPatch, deleteorder } = require('../controllers/orden.controller');
const router = express.Router();


router.post( '/', authUser ,insertorder);           // inserta un procto a la lista de deseos 
router.get( '/',authUser, Getorder);                         // muestra todos los productos en la lista de deseos 
router.get( '/:id',authUser, getorderById);  
router.patch( '/:id', authUser, updateOrderPatch);    // Actualiza parcialmente los campos de un producto
router.delete( '/:id', authUser, deleteorder);       // elimina la lista de deseos 

module.exports = router;