(function(window){
	"use strict";
	function clearSignInStyle() {
		$('html').removeClass('signIn');
	}

	angular.module('terminal')
		.controller('signUpController', ['$scope'
			, 'authorizationService'
			, function($scope
					,authorizationService) {


				$scope.isAuthorized = UTIL.getCookie('isAuthorized') || false;
				console.log($scope);



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


	function operateAuthStatus($scope, authStatus) {

		switch (authStatus) {
			case 0 :
				console.log('Пользователь не найден');
				break;
			case 1 :
				clearSignInStyle();
				$scope.isAuthorized = true;
				$scope.$apply();
				/*				$location.path('/panel');*/
				break;
			case 2 :
				console.log('Неверный пароль');
				break;
		}
	}
}(window));

