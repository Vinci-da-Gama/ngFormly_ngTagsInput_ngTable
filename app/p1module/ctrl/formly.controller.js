(function() {
    'use strict';

    angular.module('p1.ctrl')
        .controller('homeFormlyCtrl', ngFormlyCtrl);

    ngFormlyCtrl.$inject = ['$log', 'ProvincesConstant'];

    function ngFormlyCtrl($log, ProvincesConstant) {
        var vm = this;

        vm.rentalModel = {};
        vm.rentalFields = [{
                key: 'first_name',
                type: 'basicinput',
                templateOptions: {
                    type: 'text',
                    label: 'First Name',
                    id: 'firsnameId',
                    placeholder: 'Enter your first name'
                }
            },
            {
                key: 'last_name',
                type: 'basicinput',
                templateOptions: {
                    type: 'text',
                    label: 'Last Name',
                    id: 'lastnameId',
                    placeholder: 'Enter your last name'
                }
            },
            {
                key: 'email',
                type: 'basicinput',
                templateOptions: {
                    type: 'email',
                    label: 'Email address',
                    id: 'emailId',
                    placeholder: 'Enter email'
                }
            },
            {
                key: 'under25',
                type: 'checkbox',
                templateOptions: {
                    label: 'Are You Under 25?'
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
                type: 'basicinput',
                templateOptions: {
                    label: 'Driver\'s License Number -- In this case, you have to choose Ontario.',
                    id: 'licenseId',
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
                type: 'basicinput',
                templateOptions: {
                    label: 'Insurance',
                    id: 'insuranceId',
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