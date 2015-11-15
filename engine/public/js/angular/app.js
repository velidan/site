(function (window) {
    angular.module('terminal', [
        'ngRoute',
        'ngAnimate',
        'route-segment',
        'view-segment'
    ]).constant('config', {
        mediaPath : '/media'
    });


}(window));
