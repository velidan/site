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

                $scope.showGallery = function () {
                    xhr.useDefaultConf('POST', '/terminal/mediaShow');
                };




        }]);
}(window));