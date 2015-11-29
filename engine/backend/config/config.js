/**
 * Config Class
 */
class Config {
    constructor() {
        this.rootAppPath = null;
    }

    /**
     * root app path setter
     * @param rootAppPath {String} -> root app path (wia Backend)
     */
    setRootAppPath(rootAppPath) {
        this.rootAppPath = rootAppPath;
    }

    /**
     * Config Object Getter
     * @returns {{Q: (*|exports|module.exports), DB: *, rootAppPath: (null|String|*), UTILITY: *}}
     */
    getConfig() {
        var DB_Instance = require(this.rootAppPath +  '/utility/db')('localhost', 27017, 'Wellnine'),
            UTILITY = require(this.rootAppPath +  '/utility/Utility');

        return {
            Q : require('q'),  /* Q library for async generators */
            DB : DB_Instance,
            rootAppPath : this.rootAppPath, /* path to app root  - set in the server/index.js */
            UTILITY : UTILITY /* some useful stuff */
        }
    }
}

module.exports = new Config();