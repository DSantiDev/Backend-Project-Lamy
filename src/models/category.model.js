const { Schema, model } = require( 'mongoose' );

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [ true, 'El nombre de la categoria es obligatoria.' ],
        unique: [ true, 'La categoria ya esta registrada.' ]
    },
    description: String
},{
    timestamps: true
});

/** Crear el modelo de datos a partir de la estructura de datos */
const CategoryModel = model(
    'Categories',       // Nombre de la coleccion a la que vamos a asociar nuestra estructura de datos
    CategorySchema      // Estructura de datos para los documentos de esta coleccion
);


module.exports = CategoryModel;