// Use this file to *create* an AngularJS module for your app and configure $routeProvider.
/// <reference path="../lib/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../lib/DefinitelyTyped/angularjs/angular-route.d.ts"/>
var MainController = (function () {
    function MainController($scope) {
        $scope.awesomeThings = [
            'Html1',
            'Angular',
            'Karma',
            'Test12'
        ];
    }
    MainController.$inject = ['$scope'];
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
