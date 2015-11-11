(function (window) {
    angular.module('terminal')
        /* make ajax with some default config (like progress) */
        .factory('$xhrFactory', function() {


            /* main class */
            function XHR() {
                    this.xhr = new window.XMLHttpRequest({mozSystem: true});

                /**
                 * Usage with default config
                 * @param method (String) -> post or get
                 * @param url {String} -> url path to server handler
                 * @param data {Object} -> data to send
                 */
                this.useDefaultConf = function (method, url, data) {
                    this.open(method, url);
                    this.onreadystatechange();
                    this.onprogress();
                    this.send(data);
                };

                /**
                 * Open connection
                 * @param method (String) -> post or get
                 * @param url {String} -> url path to server handler
                 * @param async {Boolean} -> sync or async send
                 */
                this.open = function(method, url, async) {
                    async = async || true;
                    this.xhr.open(method, url, async);
                };

                /**
                 * Statechange handler
                 * @param actions {Function} -> statechange function
                 */
                this.onreadystatechange = function(actions) {
                    var XHR_Module = this;
                    if (actions) {
                        this.xhr.onreadystatechange = actions;
                    } else {
                        this.xhr.onreadystatechange = function (aEvt) {
                            if (XHR_Module.xhr.readyState == 4) {
                                if (XHR_Module.xhr.status == 200)
                                    console.log(XHR_Module.xhr.responseText);
                                else
                                    console.log("Error loading page\n");
                            }
                        };
                    }

                };

                /**
                 * Progress handler
                 * @param actions {Function} -> statechange function
                 */
                this.onprogress = function(actions) {
                    if (actions) {
                        this.xhr.upload.onprogress = actions;
                    } else {
                        this.xhr.upload.onprogress = function(event) {
                            var loadedPercent =  Math.round((event.loaded / event.total) * 100);

                            console.log(" Загружено -  " + loadedPercent + "%");
                        };
                    }

                };

                /**
                 *  Send data to server
                 * @param data {Object} -> data to send
                 */
                this.send = function(data) {
                    this.xhr.send(data);
                }
            }

            return  new XHR();
        })
}(window));