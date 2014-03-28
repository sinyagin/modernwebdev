// Use this file to *create* an AngularJS module for your app and configure $routeProvider.
/// <reference path="refs.ts"/>

'use strict'

module auction {
    angular.module('auction', ['ngRoute'])
        .config(($routeProvider: ng.route.IRouteProvider) => {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/home.html',
                    controller: 'HomeController'
                })
                .when('/search', {
                    templateUrl: 'views/search.html',
                    controller: 'SearchController'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
}
