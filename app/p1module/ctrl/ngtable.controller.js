(function() {
    'use strict';

    var fcM = angular.module('p1.ctrl')
    fcM.controller('homeNgtableCtrl', fcCtrl);

    fcCtrl.$inject = ['$log', 'fcurrencyCoorporative', '$q', 'NgTableParams'];

    function fcCtrl($log, fcurrencyCoorporative, $q, NgTableParams) {
        var vm = this;
        var headerObj = {
            url: 'http://api.fixer.io/latest'
        };
        vm.BaseCurrncy = "";

        fcurrencyCoorporative
            .$get(headerObj)
            .then(function(res) {
                console.log('18 -- res is: ', res);
                vm.BaseCurrncy = res.data.base;
                return res.data.rates;
            })
            .then(function(rates) {
                var ckeys = Object.keys(rates);
                var cvals = Object.values(rates);
                var currencyObj = {
                    keys: ckeys,
                    vals: cvals
                };
                return currencyObj;
            })
            .then(function(currency) {
                var currencyData = [];
                var len = currency.keys.length;
                for (var i = 0; i < len; i++) {
                    var elem = {
                        name: currency.keys[i],
                        rate: currency.vals[i]
                    };
                    currencyData.push(elem);
                }
                return currencyData;
            })
            .then(function(currencyResult) {
                console.log('45 -- currencyResult is: ', currencyResult);
                vm.tableParams = new NgTableParams({}, {
                    dataset: currencyResult
                });
            })
            .catch(function(err) {
                throw err;
            });

    }

})();