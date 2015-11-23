(function (window) {
    angular.module('terminal', [
        'ngRoute',
        'ngAnimate',
        'route-segment',
        'view-segment'
    ]).constant('config', {
        mediaPath : '/media'
    }).run(['$rootScope', '$location', function($rootScope, $location){
        /* before fire app we check if we are authorized. If not - prevent
         * template loading and redirect to auth form */
        $rootScope.$on("$routeChangeStart", function(event, next, current) {

            var isAuthorized = UTIL.getCookie('isAuthorized') || false;

            if (next.originalPath !== '/' && !isAuthorized) {
                event.preventDefault();
                $location.url('/');
            } else {
                UTIL.clearHTMLSignInIdentif();
            }

        });
    }]);


}(window));
