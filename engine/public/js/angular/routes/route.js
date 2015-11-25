angular.module('terminal')
    .config(function($routeSegmentProvider, $routeProvider) {
        $routeSegmentProvider.options.autoLoadTemplates = true;
        $routeSegmentProvider

        // route for the home page
            .when('/', 'login')
            .segment('login', {
                templateUrl : '/viewPartials/terminal/index.html',
                controller  : 'mainTerminalController'
            })

            // route for the about page
            .when('/panel', 'main')
            .segment('main',{
                templateUrl : '/viewPartials/terminal/terminal.html',
                controller  : 'terminalController'
            })

            // route for the contact page
            .when('/media', 'media')
            .segment('media',  {
                templateUrl : '/viewPartials/terminal/mediaKernel.html',
                controller  : 'terminalMediaCenter'
            });


        $routeProvider.otherwise({redirectTo: '/'});
    });