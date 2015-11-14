(function (window) {
	var UTIL = {
		getCookie : function(name) {
			var matches = document.cookie.match(new RegExp(
				"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
			));
			return matches ? decodeURIComponent(matches[1]) : undefined;
		},
		isObject : function (val) {
			"use strict";
			if (val === null) {return false; }
			return ((typeof val === 'function') || (typeof val === 'object'));
		},

		 fillObject : function(dataObject, resultObject) {
			var key;

			for (key in dataObject) {
				if (UTIL.isObject(dataObject[key])) {
					UTIL.fillObject(dataObject[key], resultObject);

				} else {
					resultObject[key] = dataObject[key];
				}
			}
		  }

	};

	window.UTIL = UTIL;

}(window));