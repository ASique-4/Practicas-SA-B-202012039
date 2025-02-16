import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
import Product from '../models/product';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public addProduct(req: Request, res: Response): void {
    const { name, quantity, price } = req.body;
    const product = new Product(name, quantity, price);
    this.productService.addProduct(product);
    res.status(201).send('Producto agregado');
  }

  public removeProduct(req: Request, res: Response): void {
    const { name } = req.params;
    this.productService.removeProduct(name);
    res.status(200).send('Producto eliminado');
  }

  public getProducts(req: Request, res: Response): void {
    const products = this.productService.getProducts();
    res.status(200).json(products);
  }

  public sortProducts(req: Request, res: Response): void {
    const { sortBy } = req.query;
    const sortedProducts = this.productService.sortProducts(sortBy as 'price' | 'quantity');
    res.status(200).json(sortedProducts);
  }

  public searchProduct(req: Request, res: Response): void {
    const { name } = req.params;
    const product = this.productService.searchProduct(name);
    res.status(200).json(product);
  }
}