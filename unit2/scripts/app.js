// Use this file to *create* an AngularJS module for your app and configure $routeProvider.
/// <reference path="../lib/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../lib/DefinitelyTyped/angularjs/angular-route.d.ts"/>
/// <reference path="model/ProductModel.ts"/>
var MainController = (function () {
    function MainController($scope, $http, $location) {
        //todo code runs twice???
        //todo how to get current location
        this.url = $location.$$absUrl;
        this.url = this.url.substr(0, this.url.indexOf("/index")) + '/data/featured.json';
        console.log(this.url);
        $http.get(this.url).success(function (data) {
            this.scopeData = data;
            console.log("Data:" + this.scopeData.items[0].id);
        }).error(function () {
            console.log("Error Load JSON");
        });
    }
    MainController.$inject = ['$scope', '$http', '$location'];
    return MainController;
})();

var SearchController = (function () {
    function SearchController($scope) {
        $scope.model = {
            message: "search"
        };
    }
    SearchController.$inject = ['$scope'];
    return SearchController;
})();

var auction = angular.module('auction', ["ngRoute"]);
auction.controller('MainController', MainController);
auction.controller("SearchController", SearchController);

angular.module('auction').config([
    '$routeProvider',
    function routes($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        }).when('/search', {
            templateUrl: 'views/search.html',
            controller: 'SearchController'
        }).otherwise({
            redirectTo: '/'
        });
    }
]);
//# sourceMappingURL=app.js.map
