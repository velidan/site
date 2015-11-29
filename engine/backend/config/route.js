'use strict';

var router = require('koa-router')(),
    routerCaller,
/* TODO - > write an autoloader for app modules */
   terminal = require(GLOBALSTUFF.rootAppPath + '/app/terminal/index')({
        DB : GLOBALSTUFF.DB,
        rootPath : GLOBALSTUFF.rootAppPath
    }),

    terminalArticle = require(GLOBALSTUFF.rootAppPath + '/app/terminal/article/index.js')({
        DB : GLOBALSTUFF.DB,
        rootPath : GLOBALSTUFF.rootAppPath
    }),

    terminalMedia = require(GLOBALSTUFF.rootAppPath + '/app/terminal/media/index.js')({
        DB : GLOBALSTUFF.DB,
        rootPath : GLOBALSTUFF.rootAppPath
    }),
   routersPackage = [terminal.routerChunk()
                    ,terminalArticle.routerChunk()
                    ,terminalMedia.routerChunk()];



/* TODO вынести в отдельный модуль */
class RouterCaller {

    constructor(routerInstance) {
        this.routerInstance = routerInstance;
    }

    start(routersSet) {
        this.routerSet = routersSet;

        this.coreRouterHandler();
    }

    coreRouterHandler() {
        var RouterCaller = this;
        this.routerSet.forEach(function (routerObject) {
            RouterCaller.coreRouterApplier(routerObject);
        })
    }

    coreRouterApplier(routerObject) {
        this.routerInstance[routerObject.method](routerObject.url, routerObject.middleware);
    }

} /* !RouterCaller */


    routerCaller = new RouterCaller(router);
    routersPackage.forEach(function (routerChunk) {
        routerCaller.start(routerChunk);
    });




/*router
    .get(terminalRoute.get.url, terminalRoute.get.middleware)
    .post(terminalRoute.post.url, terminalRoute.post.middleware)
    .post(terminalArticleRoute.post.url, terminalArticleRoute.post.middleware)
    .post(terminalMediaRoute.post.url, terminalMediaRoute.post.middleware);*/


module.exports = router;

