/**
 * Created by Cronix-23-ZTan on 29.08.2015.
 */
/**
 * Export Media module
 * @param config {Object} - some config for Article module
 * @returns {Media}
 */
module.exports = function (config) {
    return new Media(config);

};

/**
 * Article Class
 * @param config {Object} -> some config stuff like DB instance or absolute root path or some else
 * @constructor
 */
function Media(config) {
    this.config = config;

    this.ImageKernel = require(config.rootPath + '/utility/image/ImageKernel');

}

/**
 *  Method return request middleware and root for koa-route
 * @returns {{get: {url: string, middleware: generator}, post: {url: string, middleware: generator}}}
 */
Media.prototype.routerChunk = function () {
    var Module = this;

    return {
        post : {
            url : '/terminal/mediaLoad',
            middleware : Module.mediaLoad()
        }
    }
};


/**
 * Load media file
 * @returns generator middleware for Koa
 */
Media.prototype.mediaLoad =  function () {
    var Module = this;

    return function* (next) {
        var mediaFile = this.request.body.files.file, ImageKernel = new Module.ImageKernel(mediaFile);

        ImageKernel.moveTo();

    }
};