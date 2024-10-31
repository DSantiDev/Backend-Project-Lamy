const { Router } = require( 'express' );

const router = Router();

const { getCategories, getCategoryById, createCategory, removeCategoryById, updateCategoryById, getPaginatedCategories } = require('../controllers/category.controller');
const { authUser } = require('../middlewares/auth-user.middleware');

/** Definir todas las rutas de la API para la data de categorias */
// http://localhost:3000/api/categories
router.get( '/', getCategories );               // Obtener todas las categorias
router.post( '/', authUser, createCategory );             // Crear una categoria

router.get( '/:id', getCategoryById );          // Obtener una categoria por ID
router.put( '/:id', authUser, updateCategoryById );       // Actualizar una categoria totalmente
router.patch( '/:id', authUser, updateCategoryById );     // Actualizar una categoria parcialmente
router.delete( '/:id', authUser, removeCategoryById );    // Eliminar una categoria por ID

router.get( '/:page?/:pageSize?', getPaginatedCategories );   // Obtener tdos los productos paginados
router.get( '/user/:page?/:pageSize?', authUser, getPaginatedCategories );


module.exports = router; 