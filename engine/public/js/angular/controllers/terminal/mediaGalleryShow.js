(function (window) {
    angular.module('terminal')
        .controller('terminalMediaGalleryShow', ['$scope'
            ,'$http'
            ,'$location'
            ,'$xhrFactory'

            ,function ($scope
                ,$http
                ,$location
                ,$xhrFactory) {

                var xhr = $xhrFactory;

                xhr.useDefaultConf('POST', '/terminal/mediaShow');


        }]);
}(window));