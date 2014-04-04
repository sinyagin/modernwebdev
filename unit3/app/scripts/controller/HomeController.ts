/// <reference path='../refs.ts'/>
module auction.controller {
    'use strict';

    import m = auction.model;
    import s = auction.service;

    export interface IHomeScope extends ng.IScope {
        model: HomeController;
    }

    export class HomeController {
        public static $inject = ['$scope', 'ProductService'];
        public featured: m.ProductModel[];

        constructor(private $scope: IHomeScope, private productService: s.IProductService) {
            this.$scope.model = this;
            this.productService.getFeatured().then((products) =>  this.featured = products);
        }
    }
    angular.module('auction').controller('HomeController', HomeController);
}

