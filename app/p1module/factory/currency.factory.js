(function() {
    'use strict';

    angular
        .module('p1.factory')
        .factory('fcurrencyCoorporative', FixerCurrencyFactory);

    FixerCurrencyFactory.$inject = ['$http', '$q'];

    function FixerCurrencyFactory($http, $q) {
        var _def = $q.defer();

        var serviceObj = {
            $get: $get
        };

        return serviceObj;

        ////////////////
        function $get(obj) {
            var req = {
                method: 'GET',
                url: obj.url
            };
            return $http(req)
                .then(function(res) {
                    return res;
                })
                .catch(function(err) {
                    throw err;
                });
        }
    }

})();