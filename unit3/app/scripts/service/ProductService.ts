// This file should contain ProductService implementation which is responsible for managing products.
// All other parts of the app shouldn't access data/*.json files directly, instead they should use this service.

// Leverage as many TypeScript features (classes, type annotations, lambdas, etc.)
// as you can (and as it seems reasonable to you ;))
/// <reference path='../refs.ts'/>
module auction.service {
    'use strict'

    import m = auction.model;

    export interface IProductService {
        getFeatured(): ng.IPromise<m.ProductModel[]>;
        search(): ng.IPromise<m.ProductModel[]>;
    }

    class ProductService implements IProductService {
        public static $inject = ['$http', '$q', '$location'];
        private URL:string = 'data/featured.json';

        constructor (private $http: ng.IHttpService, private $q: ng.IQService, private $l: ng.ILocationService) {}

        getFeatured(): ng.IPromise<m.ProductModel[]> {
            return this.getData(this.URL);
        }

        search(): ng.IPromise<m.ProductModel[]> {
            return this.getData(this.URL);
        }

        private getData(url: string): ng.IPromise<m.ProductModel[]> {
            var products = this.$q.defer<m.ProductModel[]>();
            this.$http.get(url)
                .success((data) => products.resolve(<m.ProductModel[]>data.items))
                .error(() => console.log("Error load data"));
            return products.promise;
        }

    }

    angular.module('auction').service('ProductService', ProductService)
}
