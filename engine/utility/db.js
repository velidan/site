/* Class for DB operations */
var monk = require('monk');
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

    this.table = null;
}


/**
 * open db connection
 */
DB.prototype.connect = function() {

    this.dbConnection = monk(this.hostName + ':' + this.port + '/' + this.dbName);

    return this.dbConnection;
};

/**
 * get table from db
 * @param tableName
 * @returns {table | null}
 */
DB.prototype.getTable = function (tableName) {
    this.table = this.dbConnection.get(tableName);

   return this.table;
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

