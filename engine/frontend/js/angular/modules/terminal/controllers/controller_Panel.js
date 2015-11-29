/**
 * Created by Cronix-23-ZTan on 25.11.2015.
 */

(function (window) {
    'use strict';

    angular.module('terminal')
        .controller('panelController',
            ['$scope',
            'panelScripts',
                function ($scope,
                          panelScripts) {
                /* Initialize Panel Scripts */
               panelScripts.init();



        }]);

}(window));