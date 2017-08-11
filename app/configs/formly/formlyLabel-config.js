(function() {
    var fmM = angular.module('ftt.formly');

    fmM.config(['formlyConfigProvider', function(formlyConfigProvider) {
        formlyConfigProvider.setWrapper({
            name: 'label',
            templateUrl: '../_partials/component-templates/label-validation/label.html'
        });
    }]);

})();