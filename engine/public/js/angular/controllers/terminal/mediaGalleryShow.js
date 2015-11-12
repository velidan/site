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

                    $http({
                       method : 'POST',
                       url : '/terminal/mediaShow'
                    }).then(function (response){

                        response.data  .forEach(function (fileObject) {
                            //$( "<img src='" + config.mediaPath + '/img/' + fileObject.sourceName +"' alt='"+ fileObject.name +"'>").appendTo( "body" );
                            new mediaGalleryPopUp(fileObject);
                        });


                        console.log(response);
                    }, function (error) {
                        console.log('ERROR TO GET FILES :' + error);
                    });




                };  /* !Show gallery */




        }]);
}(window));