/// <reference path="refs.ts"/>

'use strict';

module auction {

    interface IRootScope extends ng.IRootScopeService {
        title: string;
    }

    angular.module('auction', ['ngRoute'])
        .config(($routeProvider: ng.route.IRouteProvider) => {
            var titleUpd = (t) => t + ' | Auction';

            $routeProvider
                .when('/', {
                    templateUrl: 'views/home.html',
                    controller: 'HomeController',
                    title: 'Auction'
                })
                .when('/search', {
                    templateUrl: 'views/search.html',
                    controller: 'SearchController',
                    title: titleUpd('Search')
                })
                .when('/product/:id', {
                    templateUrl: 'views/product.html' ,
                    controller: 'ProductController',
                    title: titleUpd('Product')
                })
                .otherwise({
                    redirectTo: '/'
                });
        }).run(['$rootScope', ($rootScope: IRootScope) => {
            $rootScope.$on('$routeChangeStart', function (event, next) {
                $rootScope.title = next.title;
            });
        }]);
}
