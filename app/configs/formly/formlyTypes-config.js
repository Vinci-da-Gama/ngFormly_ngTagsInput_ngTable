(function() {
    var fmM = angular.module('ftt.formly');

    fmM.config(['formlyConfigProvider', function(formlyConfigProvider) {
        formlyConfigProvider.setType({
            name: 'basicinput',
            templateUrl: '../_partials/component-templates/formly/type-input.html',
            wrapper: ['validation', 'label'],
            overwriteOk: true,
            defaultOptions: {
                validation: {
                    messages: {
                        required: '"This field is required"'
                    }
                }
            }
        });
    }]);

})();