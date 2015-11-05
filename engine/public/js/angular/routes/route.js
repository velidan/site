angular.module('terminal')
    .config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : '/viewPartials/terminal/signUp.html',
                controller  : 'signUpController'
            })

            // route for the about page
            .when('/panel', {
                templateUrl : '/viewPartials/terminal/terminal.html',
                controller  : 'terminalController'
            })

            // route for the contact page
            .when('/media', {
                templateUrl : '/viewPartials/terminal/mediaKernel.html',
                controller  : 'terminalMediaCenter'
            })
            .otherwise({
              redirectTo: '/'
           });
    });
