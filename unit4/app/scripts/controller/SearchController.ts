/// <reference path='../refs.ts'/>
module auction.controller {
    'use strict';

    import m = auction.model;
    import s = auction.service;

    export class SearchController {
        public static $inject = ['ProductService'];
        public search: m.ProductModel[];
        public searchForm = new SearchForm();

        constructor(private productService: s.IProductService) {
            this.productService.getFeatured().then((products) =>  this.search = products);
        }

        submitForm() {
            console.log("test");

        }
    }
    angular.module('auction').controller('SearchController', SearchController);
}
