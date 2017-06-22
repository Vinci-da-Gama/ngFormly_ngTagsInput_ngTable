(function() {
    'use strict';

    var fcM = angular.module('p1.ctrl')
    fcM.controller('homeFixercurrencyCtrl', fcCtrl);

    fcCtrl.$inject = ['$log'];

    function fcCtrl($log) {
        var vm = this;
    }

})();