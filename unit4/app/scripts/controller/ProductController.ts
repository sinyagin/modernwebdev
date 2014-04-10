/// <reference path='../refs.ts'/>
module auction.controller {
    'use strict';

    import m = auction.model;
    import s = auction.service;

    export class SearchForm {
        lowPrice:  number = 0;
        highPrice: number = 100;
        title: string;
        bids: number;
        date: Date;
    }

    export class ProductController {
        static $inject = ['product'];

        public isSearchFormVisible = false;
        public searchForm = new SearchForm();

        constructor(public product: m.ProductModel) {}

        public static resolve = {
            product: ['$route', 'ProductService',
                ($route, productService: s.IProductService) => {
                    var productId = parseInt($route.current.params.id);
                    return productService.getById(productId);
                }]
        };
    }
    angular.module('auction').controller('ProductController', ProductController);
}
