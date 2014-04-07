/// <reference path='../refs.ts'/>

module auction.directive {
  'use strict';

  function navbarDirective() {
    return {
      scope: false,
      restrict: 'E',
      templateUrl: 'views/partial/navbar.html'
    };
  }

  angular.module('auction').directive('auctionNavbar', navbarDirective);
}

