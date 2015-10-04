(function (window) {
    angular.module('terminal')
        .controller('terminalCreateArticle',['$scope', '$http', function ($scope, $http) {
            var formData = new FormData(),
                previewImg,
                articleData = {};
            $scope.articleCreate = function () {
                articleData = angular.copy($scope.article);

                formData.append('previewImg' ,  $scope.articlePreviewImg);
                formData.append('articleData', angular.toJson($scope.article));

                $http.post('/terminal/articleSave', formData, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).
                    then(function (response) {
                        console.log(response);
                    }, function (reject) {
                        console.log('Не удалось создать статью');
                    })
            }
        }]);
}(window));