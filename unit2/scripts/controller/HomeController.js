var auction;
(function (auction) {
    // Implement HomeController here. It should manage Home page.
    /// <reference path='../refs.ts'/>
    (function (controller) {
        'use strict';

        var HomeController = (function () {
            function HomeController($scope, productService) {
                var _this = this;
                this.$scope = $scope;
                this.productService = productService;
                this.$scope.model = this;
                this.productService.getFeatured().then(function (products) {
                    return _this.featured = products;
                });
            }
            HomeController.$inject = ['$scope', 'ProductService'];
            return HomeController;
        })();
        controller.HomeController = HomeController;
        angular.module('auction').controller('HomeController', HomeController);
    })(auction.controller || (auction.controller = {}));
    var controller = auction.controller;
})(auction || (auction = {}));
//# sourceMappingURL=HomeController.js.map
