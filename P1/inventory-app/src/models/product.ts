import { ProductInterface } from '../types';

export default class Product implements ProductInterface {
    constructor(
        public name: string,
        public quantity: number,
        public price: number
    ) {}
}