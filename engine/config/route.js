var router = require('koa-router')(),
    nodePath = require('path'),
/* Подключили модуль рут Пас - очислити резолвом и добавили engine
 * результат:  e:\†Malder†\Web\[1_Node]\Wellnine/engine */
    rootAppPath = nodePath.resolve(require('app-root-path').path) + '/engine',
    DB_Instance = require(rootAppPath +  '/utility/db')('localhost', 27017, 'Wellnine');


var terminal = require('../app/terminal/index')({
        DB : DB_Instance,
        rootPath : rootAppPath
    }),
    terminalRoute = terminal.routerChunk(),
    terminalArticle = require('../app/terminal/article/index.js')({
        DB : DB_Instance,
        rootPath : rootAppPath
    }),
    terminalArticleRoute = terminalArticle.routerChunk();


router
    .get(terminalRoute.get.url, terminalRoute.get.middleware)
    .post(terminalRoute.post.url, terminalRoute.post.middleware)
    .post(terminalArticleRoute.post.url, terminalArticleRoute.post.middleware);



module.exports = router;

