(function (window) {
    'use strict';


    angular.module('terminal')
        /* make ajax with some default config (like progress) */
        .factory('mediaGalleryPopUp', ['config', function (config) {


            /* Main class media show popup */
            function MediaGalleryPopUp() {
                var mediaShow_Plugin = this;

                /**
                 * @param mediaPopupWrapper -> wrapper for all stuff
                 * @param mediaPopup -> media popup element
                 * @param itemBox -> media gallery item
                 */
                mediaShow_Plugin.mediaPopupWrapper = null;
                mediaShow_Plugin.mediaPopup = null;
                mediaShow_Plugin.itemBox = null;


                /** TODO
                 * Make handler to different file type (video\audio etc)
                 * @param fileDataObject {Object} -> file data
                 * @returns {{isert: insert}}
                 */
                mediaShow_Plugin.buildItem = function (fileDataObject) {
                    /* create img */
                    $("<img src='" + config.mediaPath + '/img/' + fileDataObject.sourceName + "' alt='" + fileDataObject.name + "'>")
                        .appendTo(mediaShow_Plugin.itemBox);

                    /* create itemBox */
                    mediaShow_Plugin.itemBox = $("<div/>", {
                        "class" : "mediaGalleryItemBox"
                    });

                    /* create property block and insert into itemBox */
                    mediaShow_Plugin.makePropertyBox(fileDataObject)
                        .appendTo(mediaShow_Plugin.itemBox);


                    return {
                        /* Insert item to popup */
                        insert : function () {
                            mediaShow_Plugin.itemBox.appendTo(mediaShow_Plugin.mediaPopup);
                        }
                    };
                };

                /**
                 * Create property rows and push it into property box
                 * @param propertyObject {Object} -> object with properties data
                 * @param propertyBox {HTMLElement} -> properties container
                 */
                mediaShow_Plugin.fillPropertyBox = function (propertyObject, propertyBox) {

                    var propertyRow,
                        key;


                    for (key in propertyObject) {
                        propertyRow = $("<span/>", {
                            "class" : "propertyRow"
                        });

                        $("<b/>", {
                            "text" : key + " : "
                        }).appendTo(propertyRow);

                        $("<mark/>", {
                           "text" : propertyObject[key]
                        }).appendTo(propertyRow);

                        propertyRow.appendTo(propertyBox);
                    }

                };


                /**
                 * Make property box
                 * @param propertyObject {Object} -> properties data
                 * @returns {jQuery|HTMLElement} -> filled property container
                 */
                mediaShow_Plugin.makePropertyBox = function (propertyObject) {
                    var propertyBox = $("<div/>", {
                        "class" : "propertyBox"
                    }),
                        resPropertyObject = {};

                    /* fill resultObject a file data */
                    UTIL.fillObject(propertyObject, resPropertyObject);



                    /*  */
                    mediaShow_Plugin.fillPropertyBox(resPropertyObject, propertyBox);

                    return propertyBox;
                };


                /**
                 * Create structure of elements
                 * @returns {{popup: (jQuery|HTMLElement)}} -> popup element iside wrapper
                 */
                mediaShow_Plugin.createStructure = function () {
                    mediaShow_Plugin.mediaPopupWrapper = $("<div/>", {
                        "id" : "mediaPopupWrapper"
                    });
                    mediaShow_Plugin.mediaPopup = $("<div/>", {
                        "id" : "mediaPopup"
                    });

                    mediaShow_Plugin.mediaPopup.appendTo(mediaShow_Plugin.mediaPopupWrapper);
                    mediaShow_Plugin.mediaPopupWrapper.appendTo('body');

                    return {
                        "popup" : mediaShow_Plugin.mediaPopup
                    };
                };  /* !createStructure */
            }


            return new MediaGalleryPopUp();
        }]);
}(window));