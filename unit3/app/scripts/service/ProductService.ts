/// <reference path='../refs.ts'/>
module auction.service {
    'use strict'

    import m = auction.model;

    export interface IProductService {
        getFeatured(): ng.IPromise<m.ProductModel[]>;
        search(): ng.IPromise<m.ProductModel[]>;
        getById(id: number): ng.IPromise<m.ProductModel>;
    }

    class ProductService implements IProductService {
        public static $inject = ['$http', '$q'];
        private URL:string = 'data/featured.json';

        constructor (private $http: ng.IHttpService, private $q: ng.IQService) {}

        getFeatured(): ng.IPromise<m.ProductModel[]> {
            return this.getData(this.URL);
        }

        search(): ng.IPromise<m.ProductModel[]> {
            return this.getData(this.URL);
        }

        getById(id: number): ng.IPromise<m.ProductModel> {
            return this.search().then(products => _.find(products,
                (p: m.ProductModel) => p.id === id));
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
