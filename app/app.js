(function() {

    /**
     * ftt Module
     *
     * The main module of this application...
     */
    angular.module('ftt', ['ngAnimate', 'ui.bootstrap', 'formly', 'formlyBootstrap', 'ngTable', 'ngTagsInput', 'ftt.router', 'general.ctrl', 'ftt.p1Modu', 'ftt.p2Modu']);

    angular.module('ftt.router', ['ui.router']);
    angular.module('general.ctrl', []);
    angular.module('ftt.p1Modu', []);
    angular.module('ftt.p2Modu', []);

})();