(function (window) {
    angular.module('terminal')
        .controller('terminalController', ['$scope','$http', '$location', function($scope, $http, $location) {
            if (!UTIL.getCookie('isAuthorized')) {
                $location.path('/');
            }
        }]);



}());