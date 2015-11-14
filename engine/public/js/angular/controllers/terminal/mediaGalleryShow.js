(function (window) {
    angular.module('terminal')
        .controller('terminalMediaGalleryShow', ['$scope'
            ,'$http'
            ,'$location'
            ,'mediaGalleryPopUp'
            ,'config'

            ,function ($scope
                ,$http
                ,$location
                ,mediaGalleryPopUp
                ,config) {


                $scope.showGallery = function () {
                    var mediaShowStructure =  mediaGalleryPopUp.createStructure();

                    $http({
                       method : 'POST',
                       url : '/terminal/mediaShow'
                    }).then(function (response){

                        response.data.forEach(function (fileObject) {
                            mediaGalleryPopUp.buildItem(fileObject).insert();


                        });


                        console.log(response);
                    }, function (error) {
                        console.log('ERROR TO GET FILES :' + error);
                    });




                };  /* !Show gallery */




        }]);
}(window));