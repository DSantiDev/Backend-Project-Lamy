const express = require( 'express' );
const router = express.Router();

const { createHistory, getHistoryById, deleteHistory, getHistory, updateHistoryPatch, getProductFromHistory  } = require('../controllers/history.controller');
const { authUser } = require('../middlewares/auth-user.middleware');


router.post( '/', authUser, createHistory );
router.get( '/',authUser, getHistory);             
router.get( '/:id',authUser, getHistoryById ); 
router.patch( '/:id', authUser, updateHistoryPatch);
router.delete( '/:id', authUser, deleteHistory );                               

router.get('/:userId/products/:productName', getProductFromHistory);

module.exports = router;