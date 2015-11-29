/**
 * Created by Cronix-23-ZTan on 25.11.2015.
 */

(function (window) {
    "use strict";

    angular.module('terminal')
        .directive('panel', function () {
            return {
                templateUrl : '/js/angular/modules/terminal/templates/panel.html',
                restrict : 'E',
                controller : 'panelController',
                scope : true,

                link : function (scope, element, attributes) {
                    
                }
            };
        });

}(window));