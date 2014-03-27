// Use this file to *create* an AngularJS module for your app and configure $routeProvider.
/// <reference path="../lib/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../lib/DefinitelyTyped/angularjs/angular-route.d.ts"/>
/// <reference path="model/ProductModel.ts"/>

class MainController {

    static $inject = ['$scope', '$http', '$location'];

    url: string;
    scopeData: ProductModel.Items;

    constructor($scope, $http, $location) {
        //todo code runs twice???

        //todo how to get current location
        this.url = $location.$$absUrl;
        this.url = this.url.substr(0, this.url.indexOf("/index")) + '/data/featured.json';
        console.log(this.url);
        $http.get(this.url)
            .success(function (data) {
                this.scopeData = <ProductModel.Items>data;
                console.log("Data:" + this.scopeData.items[0].id);
            })
            .error(function () {
                console.log("Error Load JSON")
            });
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
