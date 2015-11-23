(function (window) {
	/**
	 * Some useful UTILITY stuff
	 * @type {{
	 * getCookie: UTIL.getCookie,
	 * isObject: UTIL.isObject,
	 * fillObject: UTIL.fillObject,
	 * clearHTMLSignInIdentif: UTIL.clearHTMLSignInIdentif}}
     */
	var UTIL = {

		/**
		 * Get cookie value
		 * @param name {String} -> cookie name
         * @returns {String} -> cookie value
         */
		getCookie : function(name) {
			var matches = document.cookie.match(new RegExp(
				"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
			));
			return matches ? decodeURIComponent(matches[1]) : undefined;
		},

		/**
		 * Check if object really object
		 * @param val {Object} -> some instance to check
		 * @returns {boolean}
         */
		isObject : function (val) {
			"use strict";
			if (val === null) {return false; }
			return ((typeof val === 'function') || (typeof val === 'object'));
		},

		/**
		 * Fill Object some data (make single Object from one Obj and his subObjects properties
		 * @param dataObject {JSON} -> initial object with some subObjected properties
		 * @param resultObject {JSON} -> result single-level object
         */
		 fillObject : function(dataObject, resultObject) {
			var key;

			for (key in dataObject) {
				if (UTIL.isObject(dataObject[key])) {
					UTIL.fillObject(dataObject[key], resultObject);

				} else {
					resultObject[key] = dataObject[key];
				}
			}
		  },

		/**
		 * Remove signIn style class from HTML tag
		 */
		 clearHTMLSignInIdentif : function () {
			 $('html').removeClass('signIn');
		 }

	};

	window.UTIL = UTIL;

}(window));