// Use this file to *create* an AngularJS module for your app and configure $routeProvider.
/// <reference path="refs.ts"/>
'use strict';
var auction;
(function (auction) {
    angular.module('auction', ['ngRoute']).config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        }).when('/search', {
            templateUrl: 'views/search.html',
            controller: 'SearchController'
        }).otherwise({
            redirectTo: '/'
        });
    });
})(auction || (auction = {}));
//# sourceMappingURL=app.js.map
