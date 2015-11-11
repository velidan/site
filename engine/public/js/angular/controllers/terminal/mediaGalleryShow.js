(function (window) {
    angular.module('terminal')
        .controller('terminalMediaGalleryShow', ['$scope'
            ,'$http'
            ,'$location'
            ,'$xhrFactory'
            ,'config'

            ,function ($scope
                ,$http
                ,$location
                ,$xhrFactory
                ,config) {

                var xhr = $xhrFactory;

                $scope.showGallery = function () {


                    var promise = new Promise (function (resolve, reject) {

                        xhr.open('POST', '/terminal/mediaShow');

                        xhr.onreadystatechange(function () {
                            if (this.readyState == 4) {
                                if (this.status == 200) {
                                    resolve(this.responseText);
                                } else
                                    reject("Error loading page\n");
                            }
                        });

                        xhr.send();
                    });



                    promise.then(function (response) {
                        var filesData = JSON.parse(response);

                        filesData.forEach(function (fileObject) {
                            $( "<img src='" + config.mediaPath + '/img/' + fileObject.sourceName +"' alt='"+ fileObject.name +"'>").appendTo( "body" );
                        });



                        console.log(config)
                    }, function(error) {
                        console.log("Failed: " + error);
                    })


                };  /* !Show gallery */




        }]);
}(window));