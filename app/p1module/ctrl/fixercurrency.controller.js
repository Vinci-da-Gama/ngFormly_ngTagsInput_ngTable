(function() {
    'use strict';

    angular.module('p1.ctrl')
        .controller('homeFixercurrencyCtrl', ngtableCtrl);

    ngtableCtrl.$inject = ['$log'];

    function ngtableCtrl($log) {
        var vm = this;
    }

})();