(function(root){

	var terminal = angular.module('terminal', [
		'ngRoute',
		'ngAnimate'
	]);



/*	terminal.directive('isAuthorized', function () {
		return {
			restrict : 'A',
			link : function (scope, element, attrs) {
				scope.isAuthorized = attrs.isAuthorized;
				a = attrs.isAuthorized;
			}
		}
	});*/
/*	terminal.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.
				when('/signIn', {
					templateUrl: '/viewPartials/terminal/signUp.html',
					controller: 'TerminalController'
				}).
				otherwise({
					redirectTo: '/signIn'
				});
		}]);*/

	terminal.controller('TerminalController', ['$scope','$http', function($scope, $http) {


		if (getCookie('isAuthorized')) {
			$scope.templateUrl = '/viewPartials/terminal/terminal.html';
		} else {
			$scope.templateUrl = '/viewPartials/terminal/signUp.html';
		}


        $scope.userData = {};

		$scope.identify = function (user){
            $scope.userData = angular.copy(user);

            $http.post('/terminal/identify', $scope.userData).
                then(function (response) {
                    var userInfoObj = response.data,
						userData = userInfoObj.userData;


					operateAuthStatus.call($scope, userInfoObj.authStatus);

                }, function (reject) {
                    console.log('Возникла ошибка при идентификации');
                })

        };

	}]);



	terminal.controller('terminalCreateArticle',['$scope', '$http', function ($scope, $http) {
		var articleData = {};
		$scope.articleCreate = function () {
			articleData = angular.copy($scope.article);

			$http.post('/terminal/articleSave', articleData).
				then(function (response) {
					console.log(response);
				}, function (reject) {
					console.log('Возникла ошибка при создании статьи');
				})
		}
	}]);


	function operateAuthStatus(authStatus) {
		var $scope = this;

console.log(authStatus);
		switch (authStatus) {
			case 0 :
				console.log('Пользователь не найден');
				break;
			case 1 :
				$scope.templateUrl = "/viewPartials/terminal/terminal.html";
				break;
			case 2 :
				console.log('Неверный пароль');
				break;
		}
	}



	function getCookie(name) {
		var matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}


}(window));

