var auction;
(function (auction) {
    // Implement SearchController here. It should manage Search Results page.
    /// <reference path='../refs.ts'/>
    (function (controller) {
        'use strict';

        var SearchController = (function () {
            function SearchController($scope, productService) {
                var _this = this;
                this.$scope = $scope;
                this.productService = productService;
                this.$scope.model = this;
                this.productService.getFeatured().then(function (products) {
                    return _this.search = products;
                });
            }
            SearchController.$inject = ['$scope', 'ProductService'];
            return SearchController;
        })();
        controller.SearchController = SearchController;
        angular.module('auction').controller('SearchController', SearchController);
    })(auction.controller || (auction.controller = {}));
    var controller = auction.controller;
})(auction || (auction = {}));
//# sourceMappingURL=SearchController.js.map
