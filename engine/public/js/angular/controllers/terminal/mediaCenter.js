(function (window) {
    angular.module('terminal')
        .controller('terminalLoadMedia', ['$scope', '$http', '$location', function ($scope, $http, $location) {
            $scope.loadMedia = function () {
                var file = $scope.file_1,
                    formData = new FormData();


                formData.append('file', file);

                $http.post('/terminal/mediaLoad', formData, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).
                    then(function (response) {
                        console.log(response);
                    }, function (reject) {
                        console.log('Возникла ошибка при загрузке медиа - файла');
                    })
            }

        }]);
}(window));