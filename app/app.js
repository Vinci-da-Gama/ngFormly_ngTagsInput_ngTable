(function() {

    /**
     * ftt Module
     *
     * The main module of this application...
     */
    angular.module('ftt', ['ui.bootstrap', 'ftt.router', 'ftt.ctrl']);

    angular.module('ftt.router', ['ui.router']);
    angular.module('ftt.ctrl', []);

})();