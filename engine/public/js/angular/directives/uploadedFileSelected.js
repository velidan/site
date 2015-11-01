(function (window) {
    angular.module('terminal')
        .directive('bindFile', [function () {
            return {
                restrict: 'A',
                link: function ($scope, el, attrs) {
                    el.bind('change', function (event) {
                        $scope.$apply(function() {
                            $scope.isFileSelected = true;
                        });

                    });
                }
            };
        }]);
}(window));