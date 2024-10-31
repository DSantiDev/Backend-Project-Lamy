const { Router } = require('express');
const router = Router();

const { 
    getSubcategories, 
    getSubcategoryById, 
    createSubcategory, 
    removeSubcategoryById, 
    updateSubcategoryById, 
    getPaginatedSubcategories 
} = require('../controllers/subcategory.controller');

const { authUser } = require('../middlewares/auth-user.middleware');

/** Definir todas las rutas de la API para la data de subcategorías */
// http://localhost:3000/api/subcategories

// Obtener todas las subcategorías
router.get('/', getSubcategories);

// Crear una subcategoría
router.post('/', authUser, createSubcategory);

// Obtener una subcategoría por ID
router.get('/:id', getSubcategoryById);

// Actualizar completamente una subcategoría por ID
router.put('/:id', authUser, updateSubcategoryById);

// Actualizar parcialmente una subcategoría por ID
router.patch('/:id', authUser, updateSubcategoryById);

// Eliminar una subcategoría por ID
router.delete('/:id', authUser, removeSubcategoryById);

// Obtener subcategorías paginadas
router.get('/:page?/:pageSize?', getPaginatedSubcategories);

// Obtener subcategorías paginadas (requiere autenticación)
router.get('/user/:page?/:pageSize?', authUser, getPaginatedSubcategories);

module.exports = router;
