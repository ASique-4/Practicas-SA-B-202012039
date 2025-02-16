import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ProductController } from './controllers/productController';
import path from 'path';

const app = express();
const port = 3000;
const productController = new ProductController();

app.use(bodyParser.json());
app.use(cors());

app.post('/products', (req: Request, res: Response) => productController.addProduct(req, res));
app.delete('/products/:name', (req: Request, res: Response) => productController.removeProduct(req, res));
app.get('/products', (req: Request, res: Response) => productController.getProducts(req, res));
app.get('/products/sorted', (req: Request, res: Response) => productController.sortProducts(req, res));
app.get('/products/search/:name', (req: Request, res: Response) => productController.searchProduct(req, res));

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});