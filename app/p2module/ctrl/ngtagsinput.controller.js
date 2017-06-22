(function() {
    'use strict';

    angular.module('p2.ctrl')
        .controller('ngTagsInputCtrl', inputTagsCtrl);

    inputTagsCtrl.$inject = ['$log'];

    function inputTagsCtrl($log) {
        var vm = this;
    }

})();