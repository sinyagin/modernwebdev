// Use this file to *create* an AngularJS module for your app and configure $routeProvider.
/// <reference path="../lib/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../lib/DefinitelyTyped/angularjs/angular-route.d.ts"/>

class MainController {

    static $inject = ['$scope'];

    constructor($scope) {
        $scope.awesomeThings = [
            'Html1',
            'Angular',
            'Karma',
            'Test12'
        ];
    }
}

class SearchController {

    static $inject = ['$scope'];

    constructor($scope) {
        $scope.model= {
            message: "search"
        }
    }
}

var auction = angular.module('auction', ["ngRoute"]);
auction.controller('MainController', MainController);
auction.controller("SearchController", SearchController);

angular.module('auction').config(['$routeProvider',
    function routes($routeProvider: ng.route.IRouteProvider) { // *** $routeProvider is typed with ng.route.IRouteProvider ***
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'MainController'
            })
            .when('/search', {
                templateUrl: 'views/search.html',
                controller: 'SearchController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);
