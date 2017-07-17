(function() {
    'use strict';

    angular.module('p1.ctrl')
        .controller('homeFormlyCtrl', ngFormlyCtrl);

    ngFormlyCtrl.$inject = ['$log', 'ProvincesConstant'];

    function ngFormlyCtrl($log, ProvincesConstant) {
        var vm = this;
        console.log('11 -- ProvincesConstant: ', ProvincesConstant);
        vm.rentalModel = {};
        vm.rentalFields = [{
                key: 'first_name',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'First Name',
                    placeholder: 'Enter your first name',
                    required: true
                }
            },
            {
                key: 'last_name',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Last Name',
                    placeholder: 'Enter your last name',
                    required: true
                }
            },
            {
                key: 'email',
                type: 'input',
                templateOptions: {
                    type: 'email',
                    label: 'Email address',
                    placeholder: 'Enter email',
                    required: true
                }
            },
            {
                key: 'under25',
                type: 'checkbox',
                templateOptions: {
                    label: 'Are You Under 25?',
                    required: true
                },
                hideExpression: '!model.email'
            }, ,
            {
                key: 'pt',
                type: 'select',
                templateOptions: {
                    label: 'Province/Territory',
                    options: ProvincesConstant
                },
                hideExpression: '!model.email'
            },
            {
                key: 'license',
                type: 'input',
                templateOptions: {
                    label: 'Driver\'s License Number -- In this case, you have to choose Ontario.',
                    placeholder: 'Enter your drivers license number -- emp: a2222-55555-55555'
                },
                hideExpression: '!model.pt',
                validators: {
                    driverLicense: function($viewValue, $modelValue, scope) {
                        var val = $viewValue || $modelValue;
                        if (val) {
                            return regexValidation(val);
                        }
                    }
                },
                expressionProperties: {
                    'templateOptions.disabled': function($viewValue, $modelValue, scope) {
                        if (scope.model.pt === 'ontario') {
                            return false;
                        }
                        return true;
                    }
                }
            },
            {
                key: 'insurance',
                type: 'input',
                templateOptions: {
                    label: 'Insurance',
                    placeholder: 'Enter your insurance policy number'
                },
                hideExpression: '!model.under25 || !model.pt'
            }
        ];

        function regexValidation(licenseVal) {
            return /[A-Za-z]\d{4}[\s|\-]*\d{5}[\s|\-]*\d{5}$/.test(licenseVal);
        }

    }

})();