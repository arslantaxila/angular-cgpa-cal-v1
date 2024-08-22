import { Injectable } from '@angular/core';
    
@Injectable()
export class ProductService {
    getProductsData() {
        return [
            {
                id: '1000',
                code: 'f230fh0g3',
                name: 'Bamboo Watch',
                description: 'Product Description',
                image: 'bamboo-watch.jpg',
                price: 65,
                category: 'Accessories',
                quantity: 24,
                inventoryStatus: 'INSTOCK',
                rating: 5
            },
            {
                id: '1001',
                code: 'nvklal433',
                name: 'Black Watch',
                description: 'Product Description',
                image: 'black-watch.jpg',
                price: 72,
                category: 'Accessories',
                quantity: 61,
                inventoryStatus: 'OUTOFSTOCK',
                rating: 4
            },
            {
                id: '1002',
                code: 'zz21cz3c1',
                name: 'Blue Band',
                description: 'Product Description',
                image: 'blue-band.jpg',
                price: 79,
                category: 'Fitness',
                quantity: 2,
                inventoryStatus: 'LOWSTOCK',
                rating: 3
            },            
            {
                id: '1029',
                code: 'gwuby345v',
                name: 'Yoga Set',
                description: 'Product Description',
                image: 'yoga-set.jpg',
                price: 20,
                category: 'Fitness',
                quantity: 25,
                inventoryStatus: 'INSTOCK',
                rating: 8
            }
        ];
    }

    getProductsWithOrdersData() {
        return [
            {
                id: '1000',
                code: 'f230fh0g3',
                name: 'Bamboo Watch',
                description: 'Product Description',
                image: 'bamboo-watch.jpg',
                price: 65,
                category: 'Accessories',
                quantity: 24,
                inventoryStatus: 'INSTOCK',
                rating: 5,
                orders: [
                    {
                        id: '1000-0',
                        productCode: 'f230fh0g3',
                        date: '2020-09-13',
                        amount: 65,
                        quantity: 1,
                        customer: 'David James',
                        status: 'PENDING'
                    },
                    {
                        id: '1000-1',
                        productCode: 'f230fh0g3',
                        date: '2020-05-14',
                        amount: 130,
                        quantity: 2,
                        customer: 'Leon Rodrigues',
                        status: 'DELIVERED'
                    },
                    {
                        id: '1000-2',
                        productCode: 'f230fh0g3',
                        date: '2019-01-04',
                        amount: 65,
                        quantity: 1,
                        customer: 'Juan Alejandro',
                        status: 'RETURNED'
                    },
                    {
                        id: '1000-3',
                        productCode: 'f230fh0g3',
                        date: '2020-09-13',
                        amount: 195,
                        quantity: 3,
                        customer: 'Claire Morrow',
                        status: 'CANCELLED'
                    }
                ]
            },
            {
                id: '1001',
                code: 'nvklal433',
                name: 'Black Watch',
                description: 'Product Description',
                image: 'black-watch.jpg',
                price: 72,
                category: 'Accessories',
                quantity: 61,
                inventoryStatus: 'INSTOCK',
                rating: 4,
                orders: [
                    {
                        id: '1001-0',
                        productCode: 'nvklal433',
                        date: '2020-05-14',
                        amount: 72,
                        quantity: 1,
                        customer: 'Maisha Jefferson',
                        status: 'DELIVERED'
                    },
                    {
                        id: '1001-1',
                        productCode: 'nvklal433',
                        date: '2020-02-28',
                        amount: 144,
                        quantity: 2,
                        customer: 'Octavia Murillo',
                        status: 'PENDING'
                    }
                ]
            },
            {
                id: '1002',
                code: 'zz21cz3c1',
                name: 'Blue Band',
                description: 'Product Description',
                image: 'blue-band.jpg',
                price: 79,
                category: 'Fitness',
                quantity: 2,
                inventoryStatus: 'LOWSTOCK',
                rating: 3,
                orders: [
                    {
                        id: '1002-0',
                        productCode: 'zz21cz3c1',
                        date: '2020-07-05',
                        amount: 79,
                        quantity: 1,
                        customer: 'Stacey Leja',
                        status: 'DELIVERED'
                    },
                    {
                        id: '1002-1',
                        productCode: 'zz21cz3c1',
                        date: '2020-02-06',
                        amount: 79,
                        quantity: 1,
                        customer: 'Ashley Wickens',
                        status: 'DELIVERED'
                    }
                ]
            },
            {
                id: '1003',
                code: '244wgerg2',
                name: 'Blue T-Shirt',
                description: 'Product Description',
                image: 'blue-t-shirt.jpg',
                price: 29,
                category: 'Clothing',
                quantity: 25,
                inventoryStatus: 'INSTOCK',
                rating: 5,
                orders: []
            },
            {
                id: '1004',
                code: 'h456wer53',
                name: 'Bracelet',
                description: 'Product Description',
                image: 'bracelet.jpg',
                price: 15,
                category: 'Accessories',
                quantity: 73,
                inventoryStatus: 'INSTOCK',
                rating: 4,
                orders: [
                    {
                        id: '1004-0',
                        productCode: 'h456wer53',
                        date: '2020-09-05',
                        amount: 60,
                        quantity: 4,
                        customer: 'Mayumi Misaki',
                        status: 'PENDING'
                    },
                    {
                        id: '1004-1',
                        productCode: 'h456wer53',
                        date: '2019-04-16',
                        amount: 2,
                        quantity: 30,
                        customer: 'Francesco Salvatore',
                        status: 'DELIVERED'
                    }
                ]
            },            
            {
                id: '1029',
                code: 'gwuby345v',
                name: 'Yoga Set',
                description: 'Product Description',
                image: 'yoga-set.jpg',
                price: 20,
                category: 'Fitness',
                quantity: 25,
                inventoryStatus: 'INSTOCK',
                rating: 8,
                orders: [
                    {
                        id: '1029-0',
                        productCode: 'gwuby345v',
                        date: '2020-02-14',
                        amount: 4,
                        quantity: 80,
                        customer: 'Maryann Royster',
                        status: 'DELIVERED'
                    }
                ]
            }
        ];
    }

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 5));
    }

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    }

    getProducts() {
        return Promise.resolve(this.getProductsData());
    }

    getProductsWithOrdersSmall() {
        return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
    }

    getProductsWithOrders() {
        return Promise.resolve(this.getProductsWithOrdersData());
    }
};