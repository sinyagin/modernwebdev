/**
 * Created by sinyagin on 10.04.14.
 */
/// <reference path='../refs.ts'/>

module auction.directive {
    'use strict';

    function checkDate() {
        return {
            require: 'ngModel',
            link: function(scope, el, attrs, ctrl) { 
                ctrl.$setValidity('checkDate', true);
            console.log("qwqwq");
            }
        };
    }

    angular.module('auction').directive('checkDate', checkDate);
}

