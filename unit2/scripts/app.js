// Use this file to *create* an AngularJS module for your app and configure $routeProvider.
/// <reference path="../lib/DefinitelyTyped/angularjs/angular.d.ts" />
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

angular.module('auction', []).controller('MainCtrl', MainController);
//# sourceMappingURL=app.js.map
