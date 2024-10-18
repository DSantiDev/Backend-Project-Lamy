const express = require( 'express' );
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;

const dbConection = require( './config/mongo.config' );

/** Establecer la conexion a MongoDB usando la configuracion */
dbConection();

/** MIDDLEWARE: */
app.use(cors());
app.use( express.json() );              // Middleware: Permite manejar JSON en las solicitudes

/** EndPoints de nuestro servidor */
app.use( '/api/products', require( './routes/product.routes' ) );   // Middleware: Activa solicitudes que comienzan con el prefijo /api/products
app.use( '/api/auth', require( './routes/auth.routes' ) );          // Middleware: Activa solicitudes que comienzan con el prefijo /api/auth
app.use( '/api/cart', require( './routes/cart.routes' ) );  
app.use( '/api/wishlist', require( './routes/wishlist.routes' ) ); 
app.use( '/api/history', require( './routes/history.routes' ) );  
app.use( '/api/order', require( './routes/orden.routes' ) );
/** Lanzamos el servidor en puergto indicado 
 * http://localhost:3000
*/
app.listen( PORT, function() {
    console.log( 'Servidor corriendo en puerto ', PORT );
});