(function() {
    var fmM = angular.module('ftt.formly');

    fmM.config(['formlyConfigProvider', function(formlyConfigProvider) {
        formlyConfigProvider.setWrapper({
            name: 'validation',
            templateUrl: '../_partials/component-templates/label-validation/validationMsg.html'
        });
    }]);

})();