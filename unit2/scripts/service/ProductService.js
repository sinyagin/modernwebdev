// This file should contain ProductService implementation which is responsible for managing products.
// All other parts of the app shouldn't access data/*.json files directly, instead they should use this service.
var auction;
(function (auction) {
    // Leverage as many TypeScript features (classes, type annotations, lambdas, etc.)
    // as you can (and as it seems reasonable to you ;))
    /// <reference path='../refs.ts'/>
    (function (service) {
        'use strict';

        var ProductService = (function () {
            function ProductService($http, $q, $l) {
                this.$http = $http;
                this.$q = $q;
                this.$l = $l;
            }
            ProductService.prototype.getFeatured = function () {
                return this.getData('data/featured.json');
            };

            ProductService.prototype.search = function () {
                return this.getData('data/search.json');
            };

            ProductService.prototype.getData = function (url) {
                var products = this.$q.defer();
                this.$http.get(url).success(function (data) {
                    return products.resolve(data.items);
                }).error(function () {
                    return console.log("Error load data");
                });
                return products.promise;
            };
            ProductService.$inject = ['$http', '$q', '$location'];
            return ProductService;
        })();

        angular.module('auction').service('ProductService', ProductService);
    })(auction.service || (auction.service = {}));
    var service = auction.service;
})(auction || (auction = {}));
//# sourceMappingURL=ProductService.js.map
