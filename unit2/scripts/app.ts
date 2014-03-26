// Use this file to *create* an AngularJS module for your app and configure $routeProvider.
/// <reference path="../lib/DefinitelyTyped/angularjs/angular.d.ts" />

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

angular.module('auction', []).controller('MainCtrl', MainController);
