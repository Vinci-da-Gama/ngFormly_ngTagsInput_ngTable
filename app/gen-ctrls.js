/*jshint esversion: 6 */
(function() {
    var ctrlM = angular.module('general.ctrl');

    ctrlM.controller('homeCtrl', ['$scope', '$log', function($scope, $log) {
        $log.log('Home_Ctrl...');
    }]);

    ctrlM.controller('formlyTagsCtrl', ftCtrl);

    ftCtrl.$inject = ['$log'];

    function ftCtrl($log) {
        var vm = this;
        $log.log('formlyTagsCtrl...');
    }

})();