(function (window) {
    angular.module('terminal')
        .controller('terminalMediaCenter', ['$scope'
            ,'$http'
            ,'$location'
            ,'$xhrFactory'

            ,function ($scope
                ,$http
                ,$location
                ,$xhrFactory) {

            var vm = this;
            vm.fileData = {};


            if (!UTIL.getCookie('isAuthorized')) { $location.path('/'); }

            $scope.isFileSelected = false;

                /**
                 *
                 * @param fileData {Object} -> file data like name, album etc
                 */
            $scope.loadMedia = function (fileData) {
                var file = $scope.file_1,
                    formData = new FormData(),
                    xhr = $xhrFactory;

                for (var key in fileData) {
                    formData.append(key, fileData[key]);
                }

                formData.append('file', file);

                xhr.useDefaultConf('POST', '/terminal/mediaLoad', formData);
            }

        }]);
}(window));