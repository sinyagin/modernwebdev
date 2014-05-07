/// <reference path='../refs.ts'/>
'use strict';

module auction.controller {

  import m = auction.model;
  import s = auction.service;

  export class ProductController {
    static $inject = [
      'product',
      '$scope',
      'Restangular',
      'BidService'];

    isSearchFormVisible = false;
    bid: number;

    constructor(public product: m.ProductModel,
                private $scope: ng.IScope,
                private restangular: Restangular,
                private bidService: s.IBidService) {
      // Updates product info as soon as WS reply message arrives.
      var onBid = (p) => $scope.$apply(() => this.product = p);
      // Start listening to incoming WS messages
      bidService.watchBid(onBid);
      // Remove subscription when the controller is destroyed.
      $scope.$on('$destroy', () => bidService.unwatchBid(onBid));
    }

    placeBid() {
      var bidModel = new model.BidModel();
      bidModel.amount = this.bid;

      this.restangular.all('bid').post(bidModel).then(
          // TODO: If your app logic differs from the line below, update it accordingly (read more in the homework's assignment).
          (resp) => this.product = resp);

      // Uncomment to communicate with WebSockets endpoint.
      // this.bidService.placeBid(bidModel);
    }

    public static resolve = {
      product: ['$route', 'ProductService',
        ($route, productService: s.IProductService) => {
          var productId = parseInt($route.current.params.id);
          return productService.getById(productId);
        }]
    };
  }

  angular.module('auction').controller('ProductController', ProductController);
}
