/**
 * Created by Cronix-23-ZTan on 28.09.2015.
 */
"use strict";
var fs = require('fs');

/* File Loader Class */
'use strict';
class Uploader {

    constructor(fileData) {
        this.fileData = fileData;
    }

    uploadTo(path, callback) {
        var Uploader_module = this,
            is, /* input Stream */
            os; /* output Stream */

        /* is path directory no Exists then create it and save file into her */
        fs.stat(path, function (err, stat) {



            /* Get generator and execute it with next yield iterable to the end of operation */
            function sync(gen) {
                var iterable, resume;

                resume = function(retVal) {

                  /*  if (err) iterable.raise(err); */
                    iterable.next(retVal); // resume!
                };

                iterable = gen(resume);
                iterable.next();
            }

            /* core function that load media file */
            function _load(callback) {
               var identifier = stat;
                 if (err) {
                 /* file no exists */
                      if (err.code === 'ENOENT') {
                      fs.mkdirSync(path);
                      identifier = true;
                     } else {
                      console.log(err);
                     }
                 }

                 if (identifier) {
                     is = fs.createReadStream(Uploader_module.fileData.path);
                     os = fs.createWriteStream(path + Uploader_module.fileData.name);

                 /* Write new file and unlink old */
                 is.pipe(os);
                 is.on('end', function () {
                     fs.unlink(Uploader_module.fileData.path);
                     callback(true);
                     });
                 }


            }

            // ****************
            // application code

            sync(function* (resume) {
                var response = yield _load(resume); // suspend!
                    callback(response);
            })



        });

    }

}

module.exports = Uploader;