/// <reference path='../refs.ts'/>
module auction.controller {
    'use strict';

    import m = auction.model;
    import s = auction.service;

    export class HomeController {
        public static $inject = ['ProductService'];
        public featured: m.ProductModel[];

        constructor(private productService: s.IProductService) {
            this.productService.getFeatured().then((products) =>  this.featured = products);
        }
    }
    angular.module('auction').controller('HomeController', HomeController);
}

