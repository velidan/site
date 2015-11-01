/* UTILITY class */

module.exports = {
    /* Get type of file */
  getFileType : function (file) {
     return file.type.replace(/\/.+/, '');
  }
};

