import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ProductController } from './controllers/productController';

const app = express();
// Define el puerto en el que el servidor escuchará
const port = 3000;
// Crea una instancia del controlador de productos
const productController = new ProductController();

app.use(bodyParser.json());
// Habilita CORS para permitir solicitudes desde diferentes orígenes
app.use(cors());

// Define las rutas para las diferentes operaciones del inventario
// Ruta para agregar un nuevo producto
app.post('/products', (req: Request, res: Response) => productController.addProduct(req, res));
// Ruta para eliminar un producto por su nombre
app.delete('/products/:name', (req: Request, res: Response) => productController.removeProduct(req, res));
// Ruta para obtener la lista de productos
app.get('/products', (req: Request, res: Response) => productController.getProducts(req, res));
// Ruta para obtener la lista de productos ordenados por precio o cantidad
app.get('/products/sorted', (req: Request, res: Response) => productController.sortProducts(req, res));
// Ruta para buscar un producto por su nombre
app.get('/products/search/:name', (req: Request, res: Response) => productController.searchProduct(req, res));

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});