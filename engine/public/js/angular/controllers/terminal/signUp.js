(function(window){
	"use strict";
	function clearSignInStyle() {
		$('html').removeClass('signIn');
	}

	angular.module('terminal')
		.controller('signUpController', ['$scope','$http', '$location', function($scope, $http, $location) {

		if (UTIL.getCookie('isAuthorized')) {
			var path = $location.path();
			clearSignInStyle();
			if (path === "/") {
				$location.path('/panel');
			} else {
				$location.path($location.path());
			}

		}

        $scope.userData = {};

		$scope.identify = function (user){
            $scope.userData = angular.copy(user);

            $http.post('/terminal/identify', $scope.userData).
                then(function (response) {
                    var userInfoObj = response.data,
						userData = userInfoObj.userData;


					operateAuthStatus.call($scope, userInfoObj.authStatus, $location);

                }, function (reject) {
                    console.log('Возникла ошибка при идентификации');
                });

        };

	}]);

	function operateAuthStatus(authStatus, $location) {

		switch (authStatus) {
			case 0 :
				console.log('Пользователь не найден');
				break;
			case 1 :
				clearSignInStyle();
				$location.path('/panel');
				break;
			case 2 :
				console.log('Неверный пароль');
				break;
		}
	}

}(window));

