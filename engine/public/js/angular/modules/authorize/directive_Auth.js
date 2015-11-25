(function(window) {
    "use strict";

    angular.module("terminal")
        .directive("signIn", function () {
           return {
               templateUrl : "/viewPartials/authorize/authForm.html",
               restrict : "E",
               controller : "authController",
               scope : false,

               link : function (scope, element, atributes) {

               }
           };
        });

}(window));