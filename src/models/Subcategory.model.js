const { Schema, model } = require('mongoose');

// Definir el esquema de Subcategoría
const SubcategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la subcategoría es obligatorio.'],
        unique: [true, 'La subcategoría ya está registrada.']
    },
    description: String,
    category: {
        type: Schema.Types.ObjectId, // Hace referencia a un ID de documento de otra colección
        ref: 'Categories', // Nombre de la colección con la cual se vincula
        required: [true, 'La categoría a la que pertenece la subcategoría es obligatoria.']
    }
}, {
    timestamps: true
});

// Crear el modelo de Subcategoría
const SubcategoryModel = model('Subcategories', SubcategorySchema);

module.exports = SubcategoryModel;
