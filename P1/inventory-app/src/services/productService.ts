import Product from '../models/product';

export class ProductService {
    // Arreglo privado para almacenar los productos en memoria
    private products: Product[] = [];

    /**
     * Agrega un nuevo producto al inventario.
     * @param product - El producto a agregar.
     */
    public addProduct(product: Product): void {
        this.products.push(product);
    }

    /**
     * Elimina un producto del inventario por su nombre.
     * @param name - El nombre del producto a eliminar.
     * @returns true si el producto fue eliminado, false de lo contrario.
     */
    public removeProduct(name: string): boolean {
        const initialLength = this.products.length;
        this.products = this.products.filter(product => product.name !== name);
        return this.products.length < initialLength;
    }

    /**
     * Devuelve la lista de productos en el inventario.
     * @returns Un arreglo de productos.
     */
    public getProducts(): Product[] {
        return this.products;
    }

    /**
     * Ordena la lista de productos por precio o cantidad.
     * @param sortBy - El criterio de ordenación ('price' o 'quantity').
     * @returns Un arreglo de productos ordenados.
     */
    public sortProducts(sortBy: 'price' | 'quantity'): Product[] {
        return this.products.sort((a, b) => a[sortBy] - b[sortBy]);
    }

    /**
     * Busca un producto por su nombre.
     * @param name - El nombre del producto a buscar.
     * @returns El producto encontrado o undefined si no se encuentra.
     */
    public searchProduct(name: string): Product | undefined {
        return this.products.find(product => product.name === name);
    }
}