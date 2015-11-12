(function (window) {
    angular.module('terminal')
        /* make ajax with some default config (like progress) */
        .factory('mediaGalleryPopUp', ['config' ,function(config) {


            /* main class */
            function MediaGalleryPopUp() {


                this.start = function (fileObject) {
                    $("<img src='" + config.mediaPath + '/img/' + fileObject.sourceName + "' alt='" + fileObject.name + "'>").appendTo("body");
                }
            }

            return new MediaGalleryPopUp();
        }])
}(window));