import Product from '../models/product';

export class ProductService {
    private products: Product[] = [];

    public addProduct(product: Product): void {
        this.products.push(product);
    }

    public removeProduct(name: string): void {
        this.products = this.products.filter(product => product.name !== name);
    }

    public getProducts(): Product[] {
        return this.products;
    }

    public sortProducts(sortBy: 'price' | 'quantity'): Product[] {
        return this.products.sort((a, b) => a[sortBy] - b[sortBy]);
    }

    public searchProduct(name: string): Product | undefined {
        return this.products.find(product => product.name === name);
    }
}