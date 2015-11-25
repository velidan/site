/**
 * Created by Cronix-23-ZTan on 25.11.2015.
 */
(function(window){
    "use strict";

    angular.module('terminal')
        .controller('authController', ['$scope'
            , 'authorizationService'
            , function($scope
                ,authorizationService) {

                $scope.isAuthorized = UTIL.getCookie('isAuthorized') || false;

                /* defence from hack attack from outside */
                $scope.$watch('isAuthorized', function() {
                    /* we must check cookie because it was created when success auth */
                    if (!UTIL.getCookie('isAuthorized')) {$scope.isAuthorized = false; }
                });

                /* Auth request to server */
                $scope.identify = function (user){
                    var userData = angular.copy(user),
                        success,
                        error;

                    authorizationService.launch(userData).then(
                        success => {
                            // send status to mainTerminalController
                            //$scope.$emit('auth', success);
                            operateAuthStatus($scope, success);
                        },
                        error => {console.log(error)}
                    );

                };

            }]);


    /* Handle server auth response */
    function operateAuthStatus($scope, authStatus) {
        var mainTerminalControllerScope = $scope.$parent;

        switch (authStatus) {
            case 0 :
                console.log('Пользователь не найден');

                break;
            case 1 :
                UTIL.clearHTMLSignInIdentif();
                mainTerminalControllerScope.$apply(function(){
                    mainTerminalControllerScope.isAuthorized = true;
                });
                break;
            case 2 :
                console.log('Неверный пароль');

                break;
        }
    }
}(window));

