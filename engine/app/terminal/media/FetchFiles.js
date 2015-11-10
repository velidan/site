'use strict';
/**
 * Created by Cronix-23-ZTan on 06.11.2015.
 */
/* GetFiles Class */

class FetchFiles {
    constructor() {

    }

    /* Get all files from Media collection */
    fetchAllFiles() {
        var Media_Module = this;

        return function* (next) {
            var ctx = this, /* koa context */
                deferred = GLOBALSTUFF.Q.defer(), /* create deferred promise */
                responseData;

            Media_Module.db.connect();

            Media_Module.mediaModelScheme.find({}, {"_id" : 0, "date" : 0, "__v" : 0} ,(err, files) => {
                Media_Module.db.close();
                if (err) {
                    deferred.resolve({status : 503 });
                    return console.error(err);
                }
                /* resolve promise */
                deferred.resolve({status : 200, body : files});
            });


             responseData = yield deferred.promise;
             ctx.status = responseData.status;
             ctx.body = responseData.body;


        };




    }
}


module.exports = FetchFiles;