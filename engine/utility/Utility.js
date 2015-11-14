/* UTILITY class */

module.exports = {
    /* Get type of file */
    getFileType : function (file) {
        "use strict";
        return file.type.replace(/\/.+/, '');
    },
    isObject : function (val) {
        "use strict";
        if (val === null) {return false; }
        return ((typeof val === 'function') || (typeof val === 'object'));
    }
};

