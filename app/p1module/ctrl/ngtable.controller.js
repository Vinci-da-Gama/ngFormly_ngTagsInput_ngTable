(function() {
    'use strict';

    angular.module('p1.ctrl')
        .controller('homeNgtableCtrl', ngtableCtrl);

    ngtableCtrl.$inject = ['$log'];

    function ngtableCtrl($log) {
        var vm = this;
    }

})();