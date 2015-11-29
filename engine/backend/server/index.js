var app  = module.exports = require('koa')(),
    path = require('path'),
    engineRoot =  path.normalize(path.resolve(require('app-root-path').path) + '/engine/backend'),
    staticRoot = path.join(engineRoot, '../frontend'),
    templateRoot = path.join(engineRoot, 'template'),
    config = require(engineRoot + '/config/config.js'),
    body = require('koa-better-body'),
    Jade = require('koa-jade'),
    session = require('koa-session'),
    router,
 
    jadeInstance = new Jade({
    viewPath: templateRoot,
    debug: false,
    pretty: false,
    compileDebug: false
});

//set AppRootPath
config.setRootAppPath(engineRoot);

/* initialize GLOBAL config  before app start parse url*/
global.GLOBALSTUFF = config.getConfig();

/* init router */
router = require(engineRoot + '/config/route.js');

//app.keys = ['authorized'];
//app.use(session(app));
app.use(require('koa-static')(staticRoot));

app.use(jadeInstance.middleware);


app.use(body({
    multipart: true
}));


app
    .use(router.routes())
    .use(router.allowedMethods());


app.use(function* () {

   this.status = 404;
   // yield this.render('service/404');
     this.render('/404.html');

});





app.listen(80);
console.log('Server start on port - 80');