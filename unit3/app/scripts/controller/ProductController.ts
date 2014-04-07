/// <reference path='../refs.ts'/>
module auction.controller {
    'use strict';

    import m = auction.model;
    import s = auction.service;

    export interface IProductScope extends ng.IScope {
        model: ProductController;
    }

    export class ProductController {
        public static $inject = ['$scope', '$routeParams', 'ProductService'];
        public selected: m.ProductModel;

        constructor(private $scope: IProductScope, private $routeParams: ng.route.IRouteParamsService,
                    private productService: s.IProductService) {
            this.$scope.model = this;
            var id = this.$routeParams['id'];
            this.productService.getFeatured().then((products) =>  {
                this.selected = products.filter(current => current.id === parseInt(id))[0];
            });
        }
    }
    angular.module('auction').controller('ProductController', ProductController);
}
