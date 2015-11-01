var router = require('koa-router')(),
    nodePath = require('path'),
/* ���������� ������ ��� ��� - �������� �������� � �������� engine
 * ���������:  e:\�Malder�\Web\[1_Node]\Wellnine/engine */
    rootAppPath = nodePath.normalize(nodePath.resolve(require('app-root-path').path) + '/engine'),
    DB_Instance = require(rootAppPath +  '/utility/db')('localhost', 27017, 'Wellnine'),
    UTILITY = require(rootAppPath +  '/utility/Utility');


global.GLOBALSTUFF = {
    DB : DB_Instance,
    rootAppPath : rootAppPath,
    UTILITY : UTILITY
};

var terminal = require(rootAppPath + '/app/terminal/index')({
        DB : DB_Instance,
        rootPath : rootAppPath
    }),
    terminalRoute = terminal.routerChunk(),

    terminalArticle = require(rootAppPath + '/app/terminal/article/index.js')({
        DB : DB_Instance,
        rootPath : rootAppPath
    }),
    terminalArticleRoute = terminalArticle.routerChunk(),

    terminalMedia = require(rootAppPath + '/app/terminal/media/index.js')({
        DB : DB_Instance,
        rootPath : rootAppPath
    }),
    terminalMediaRoute = terminalMedia.routerChunk();


router
    .get(terminalRoute.get.url, terminalRoute.get.middleware)
    .post(terminalRoute.post.url, terminalRoute.post.middleware)
    .post(terminalArticleRoute.post.url, terminalArticleRoute.post.middleware)
    .post(terminalMediaRoute.post.url, terminalMediaRoute.post.middleware);



module.exports = router;

