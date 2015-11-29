(function(window) {
    "use strict";

    angular.module("terminal")
        .directive("signIn", function () {
           return {
               templateUrl : "/js/angular/modules/authorize/templates/authForm.html",
               restrict : "E",
               controller : "authController",
               scope : false,

               link : function (scope, element, attributes) {

               }
           };
        });

}(window));