/* Class for DB operations */
//var monk = require('monk');
var mongoose = require('mongoose');
/**
 * open db connection
 * @param hostName
 * @param port
 * @param dbName
 * @returns {db connection | null};
 */
function DB(hostName, port, dbName) {
    this.hostName = hostName;
    this.port = port;
    this.dbName  = dbName;

    this.model = null;
}


/**
 * open db connection
 */
DB.prototype.connect = function() {

    mongoose.connect(this.hostName + ':' + this.port + '/' + this.dbName);
    this.dbConnection = mongoose.connection;

    this.dbConnection.on('error', console.error.bind(console, 'connection error:'));
    this.dbConnection.once('open', function (callback) {console.log('DB connection open'); });

    return this.dbConnection;
};

/**
 * get model
 * @param schemeName {String} -> Name of scheme
 * @param scheme {Object} -> Mongoose scheme config
 * @returns {Model}
 */
DB.prototype.getModel = function (schemeName, scheme) {
    var Schema;

    Schema = new mongoose.Schema(scheme);

    this.model = mongoose.model(schemeName, Schema);

   return this.model;
};
/**
 * close connection
 */
DB.prototype.close = function () {
    this.dbConnection.close()
};

/**
 *
 * @param hostName
 * @param port
 * @param dbName
 * @returns {DB}
 */
module.exports = function (hostName, port, dbName) {
    return new DB(hostName, port, dbName);
};

