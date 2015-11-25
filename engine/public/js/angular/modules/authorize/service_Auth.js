/**
 * Created by Cronix-23-ZTan on 18.11.2015.
 * Auth service
 */
'use strict';
(function(angular) {
    angular.module('terminal')
        .service('authorizationService'
                ,['$http'
                , function($http) {

            function initialize(userData) {

                return new Promise(function (resolve, reject){
                    var rej  = reject;

                    $http.post('/terminal/identify', userData).
                    then(function (response) {
                        var userInfoObj = response.data,
                            userData = userInfoObj.userData;

                       resolve(userInfoObj.authStatus);
                    }, function (reject) {
                        rej('Возникла ошибка при идентификации');
                    });


                });



            }



            return {
                launch : initialize,
                checkAuthStatus: function ($scope) {

                    $scope.isAuthorized = UTIL.getCookie('isAuthorized') || false;

                    /* defence from hack attack from outside */
                    $scope.$watch('isAuthorized', function() {
                        /* we must check cookie because it was created when success auth */
                        if (!UTIL.getCookie('isAuthorized')) {$scope.isAuthorized = false; }
                    });



                }
            };

        }]);






}(angular));