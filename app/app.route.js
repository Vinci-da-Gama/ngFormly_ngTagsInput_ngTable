(function() {
    var rM = angular.module('ftt.router');

    rM.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './_partials/initHome.html',
                controller: 'homeCtrl',
                controllerAs: 'hc'
            });

    }]);

})();