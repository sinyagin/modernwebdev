/// <reference path="refs.ts"/>

'use strict';

module auction {


    angular.module('auction', ['ngRoute'])
        .config(($routeProvider: ng.route.IRouteProvider) => {

            $routeProvider
                .when('/', {
                    templateUrl: 'views/home.html',
                    controller: 'HomeController',
                    controllerAs: 'ctrl'
                })
                .when('/search', {
                    templateUrl: 'views/search.html',
                    controller: 'SearchController',
                    controllerAs: 'ctrl'
                })
                .when('/product/:id', {
                    templateUrl: 'views/product.html' ,
                    controller: 'ProductController',
                    controllerAs: 'ctrl',
                    resolve: auction.controller.ProductController.resolve
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
}
