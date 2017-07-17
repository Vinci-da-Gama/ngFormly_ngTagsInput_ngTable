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
            })
            .state('home.formly', {
                url: 'formlyPractice',
                templateUrl: './_partials/p1/formly.html',
                controller: 'homeFormlyCtrl',
                controllerAs: 'hfc'
            })
            .state('home.ngtable', {
                url: 'ngtable',
                templateUrl: './_partials/p1/ngtable.html',
                controller: 'homeNgtableCtrl',
                controllerAs: 'htc'
            })
            .state('formlytags', {
                url: '/formlytags',
                views: {
                    '': {
                        templateUrl: './_partials/formlyTags.html',
                        controller: 'formlyTagsCtrl',
                        controllerAs: 'ftc'
                    },
                    'formly@formlytags': {
                        templateUrl: './_partials/p2/ngformly.html',
                        controller: 'ngformlyCtrl',
                        controllerAs: 'nfc'
                    },
                    'tags@formlytags': {
                        templateUrl: './_partials/p2/ngtagsinput.html',
                        controller: 'ngTagsInputCtrl',
                        controllerAs: 'ntic'
                    }
                }
            });

    }]);

})();