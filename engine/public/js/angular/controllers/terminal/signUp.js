(function(window){
	"use strict";

	angular.module('terminal')
		.controller('signUpController', ['$scope'
			, 'authorizationService'
			, function($scope
					,authorizationService) {

		var authCookie = UTIL.getCookie('isAuthorized') || false;
		$scope.isAuthorized = authCookie;

		/* defence from hack attack from outside */
		$scope.$watch('isAuthorized', function() {
			if (!authCookie) {$scope.isAuthorized = false; }
		});

		/* Auth request to server */
		$scope.identify = function (user){
            var userData = angular.copy(user);

			authorizationService.launch(userData).then(
					success => {
						operateAuthStatus($scope, success)
					},
					error => {console.log(error)}
			);

        };

	}]);

	/* Handle server auth response */
	function operateAuthStatus($scope, authStatus) {

		switch (authStatus) {
			case 0 :
				console.log('Пользователь не найден');

				break;
			case 1 :
				UTIL.clearHTMLSignInIdentif();
				$scope.isAuthorized = true;
				$scope.$apply();

				break;
			case 2 :
				console.log('Неверный пароль');

				break;
		}
	}
}(window));

