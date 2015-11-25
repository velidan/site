(function(window){
	"use strict";

	angular.module('terminal')
		.controller('mainTerminalController' ,['$scope'
					,'authorizationService', function($scope
							,authService) {

				authService.checkAuthStatus($scope);
				
	}]);

}(window));

