var router = require('koa-router')(),

/* TODO - > write an autoloader for app modules */
   terminal = require(GLOBALSTUFF.rootAppPath + '/app/terminal/index')({
        DB : GLOBALSTUFF.DB,
        rootPath : GLOBALSTUFF.rootAppPath
    }),
    terminalRoute = terminal.routerChunk(),

    terminalArticle = require(GLOBALSTUFF.rootAppPath + '/app/terminal/article/index.js')({
        DB : GLOBALSTUFF.DB,
        rootPath : GLOBALSTUFF.rootAppPath
    }),
    terminalArticleRoute = terminalArticle.routerChunk(),

    terminalMedia = require(GLOBALSTUFF.rootAppPath + '/app/terminal/media/index.js')({
        DB : GLOBALSTUFF.DB,
        rootPath : GLOBALSTUFF.rootAppPath
    }),
    terminalMediaRoute = terminalMedia.routerChunk();


router
    .get(terminalRoute.get.url, terminalRoute.get.middleware)
    .post(terminalRoute.post.url, terminalRoute.post.middleware)
    .post(terminalArticleRoute.post.url, terminalArticleRoute.post.middleware)
    .post(terminalMediaRoute.post.url, terminalMediaRoute.post.middleware);



module.exports = router;

