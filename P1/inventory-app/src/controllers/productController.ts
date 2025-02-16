import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
import Product from '../models/product';
import { handleError, validateInput, handleProductNotFound } from '../utils/errorHandler';

export class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    /**
     * Agrega un nuevo producto al inventario.
     * @param req - La solicitud HTTP.
     * @param res - La respuesta HTTP.
     */
    public addProduct(req: Request, res: Response): void {
        const { name, quantity, price } = req.body;
        if (!validateInput(name) || !validateInput(quantity) || !validateInput(price)) {
            res.status(400).send('Invalid input');
            return;
        }
        const product = new Product(name, quantity, price);
        this.productService.addProduct(product);
        res.status(201).send('Producto agregado');
    }

    /**
     * Elimina un producto del inventario por su nombre.
     * @param req - La solicitud HTTP.
     * @param res - La respuesta HTTP.
     */
    public removeProduct(req: Request, res: Response): void {
        const { name } = req.params;
        if (!validateInput(name)) {
            res.status(400).send('Invalid input');
            return;
        }
        if (!this.productService.removeProduct(name)) {
            handleProductNotFound(name);
            res.status(404).send('Producto no encontrado');
            return;
        }
        res.status(200).send('Producto eliminado');
    }

    /**
     * Devuelve la lista de productos en el inventario.
     * @param req - La solicitud HTTP.
     * @param res - La respuesta HTTP.
     */
    public getProducts(req: Request, res: Response): void {
        const products = this.productService.getProducts();
        res.status(200).json(products);
    }

    /**
     * Devuelve la lista de productos ordenados por precio o cantidad.
     * @param req - La solicitud HTTP.
     * @param res - La respuesta HTTP.
     */
    public sortProducts(req: Request, res: Response): void {
        const { sortBy } = req.query;
        if (!validateInput(sortBy)) {
            res.status(400).send('Invalid input');
            return;
        }
        const sortedProducts = this.productService.sortProducts(sortBy as 'price' | 'quantity');
        res.status(200).json(sortedProducts);
    }

    /**
     * Busca un producto por su nombre y devuelve su información.
     * @param req - La solicitud HTTP.
     * @param res - La respuesta HTTP.
     */
    public searchProduct(req: Request, res: Response): void {
        const { name } = req.params;
        if (!validateInput(name)) {
            res.status(400).send('Invalid input');
            return;
        }
        const product = this.productService.searchProduct(name);
        if (!product) {
            handleProductNotFound(name);
            res.status(404).send('Producto no encontrado');
            return;
        }
        res.status(200).json(product);
    }
}