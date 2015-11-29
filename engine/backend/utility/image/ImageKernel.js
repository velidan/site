/**
 * Created by Cronix-23-ZTan on 28.09.2015.
 */
"use strict";
var fs = require('fs'),
    Uploader = require(GLOBALSTUFF.rootAppPath + '/utility/Uploader');


/* Image operator core Class */
'use strict';
class ImageKernel extends Uploader {

    constructor(imgData) {
        /* write imgData to fileData property of parent Class */
        super(imgData);
    }

}

module.exports = ImageKernel;