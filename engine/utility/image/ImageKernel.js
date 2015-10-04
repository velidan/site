/**
 * Created by Cronix-23-ZTan on 28.09.2015.
 */

/* Image operator core Class */
'use strict';
class ImageKernel {

    constructor(imgData) {
        this.imgData = imgData;
    }

    moveTo() {
        console.log(this.imgData);
    }

}

module.exports = ImageKernel;