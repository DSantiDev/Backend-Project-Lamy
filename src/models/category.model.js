const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definimos el esquema de Categoría
const categorySchema = new Schema({
    name: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'products' }]  // Referencia a los productos
});

// Creamos el modelo
const Categorymodel = mongoose.model(
    'Category', 
    categorySchema
);

module.exports = Categorymodel ;
