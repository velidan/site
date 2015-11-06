/**
 * Created by Cronix-23-ZTan on 29.08.2015.
 */
    /* require Q library for promise server response */
var q = require('q'),
    FetchFiles = require('./FetchFiles');

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
class Media extends FetchFiles {

    constructor(config) {
        super();

        this.db = GLOBALSTUFF.DB;

        this.config = config;
        /* path to loader folder */
        this.mediaFolderPath = '/public/media/';
        /* require loader core class */
        this.ImageKernel = require(GLOBALSTUFF.rootAppPath + '/utility/image/ImageKernel');

        /* nested scheme */
        this.mediaDetailScheme = this.db.getScheme('detail', {
            album : String,
            category: String,
            type : String
        });
            /* primary scheme */
        this.mediaModelScheme = this.db.getModel('media', {
                name : String,
                sourceName : String,
                altText : String,
                detail : Array,
                date : Date
            });


        /* loader file data storage (including the file itself) */
        this.mediaFileStuff = {};

        /* path where file was saved */
        this.savePath =  GLOBALSTUFF.rootAppPath + this.mediaFolderPath + 'img/';

    }

    /**
     *  Method return request middleware and root for koa-route
     * @returns {{get: {url: string, middleware: generator}, post: {url: string, middleware: generator}}}
     */
    routerChunk() {
        var Media_Module = this;

        return [

            {
                method : 'post',
                url : '/terminal/mediaLoad',
                middleware : Media_Module.mediaLoad()
            },

            {
                method : 'post',
                url : '/terminal/mediaShow',
                middleware : Media_Module.fetchAllFiles()
            }


        ]
    };

    /**
     * If file name exists - return it  else return false;
     * @returns {*|boolean}
     */
    fileName() {
         return this.mediaFileStuff.fileData.name || Object.keys(this.mediaFileStuff.fileData).length > 1  ;
    }

    /**
     * Load loader file
     * @returns generator middleware for Koa
     */
    mediaLoad() {
    var Media_Module = this,
        mediaModel;

    return function* (next) {
        Media_Module.mediaFileStuff.fileData = this.request.body.fields; /* file data like name, album etc */
        Media_Module.mediaFileStuff.file = this.request.body.files.file; /* file */

        var deferred = q.defer(), /* create promise */
            ctx = this, /* koa context */
            ImageKernel = new Media_Module.ImageKernel(Media_Module.mediaFileStuff.file), /* loader handler class */
            responsePromiseData,
        /* file source name */
            fileSourceName = Media_Module.mediaFileStuff.file.name,
        /* get the type of file (loader/video or audio) */
            fileType = GLOBALSTUFF.UTILITY.getFileType(Media_Module.mediaFileStuff.file),
        /* name of file if passed from dashboard or use sourceName as Name */
            fileName = (Media_Module.fileName()) ? Media_Module.fileName() : fileSourceName;

        /* if some file was passed */
        if (Media_Module.mediaFileStuff.file) {
            ImageKernel.uploadTo(Media_Module.savePath, function (fileLoaded) {
                /* if file is load successfully */
                if (fileLoaded) {

                    mediaModel = new Media_Module.mediaModelScheme({
                        name : fileName,
                        sourceName : fileSourceName,
                        altText : Media_Module.mediaFileStuff.fileData.description,
                        detail : [{album : Media_Module.mediaFileStuff.fileData.album
                            ,category : Media_Module.mediaFileStuff.fileData.category
                            ,type : fileType}],
                        date : Date.now()
                    });

                    Media_Module.db.saveModel(mediaModel, function (mediaModel) {
                        console.log("File is Saved");
                    });




                    /* resolve promise */
                    deferred.resolve({
                        status : 200
                    });
                } else {
                    /* resolve promise */
                    deferred.resolve({
                        status : 503
                    });
                }
            });

            /* get promise Response from yield -> for koa "next" iterable cycle */
            responsePromiseData = yield deferred.promise;
            ctx.status = responsePromiseData.status;
        }

    }
};

}
