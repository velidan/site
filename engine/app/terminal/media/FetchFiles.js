/**
 * Created by Cronix-23-ZTan on 06.11.2015.
 */
/* GetFiles Class */

class FetchFiles {
    constructor() {

    }

    fetchAllFiles() {
        var Media_Module = this;

        return function* (next) {

      /*     var mediaCollection =  Media_Module.db.getModel('media', {
                           name : String,
                           sourceName : String,
                           altText : String,
                           detail : Array,
                           date : Date
                       });

            var a = mediaCollection.find({});
            a.then(function(files) {
                console.log(files);
            });*/


            var mongoose = require('mongoose');
            Media_Module.db.connect();
            var mediaSchema = mongoose.Schema({
                name : String,
                sourceName : String,
                altText : String,
                detail : Array,
                date : Date
            });

            var Media = mongoose.model('Media', mediaSchema);
            Media.find(function (err, files) {
                if (err) return console.error(err);
                console.log(files);
            })
        }


    }
}


module.exports = FetchFiles;