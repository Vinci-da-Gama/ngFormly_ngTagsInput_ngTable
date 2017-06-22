(function() {
    'use strict';

    angular.module('p2.ctrl')
        .controller('ngformlyCtrl', formlyCtrl);

    formlyCtrl.$inject = ['$log'];

    function formlyCtrl($log) {
        var vm = this;
    }

})();