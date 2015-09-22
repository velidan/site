var app  = module.exports =  require('koa')(),
    path = require('path'),
    projectRoot = __dirname,
    engineRoot = projectRoot.replace(/server/, ''),
    staticRoot = path.join(engineRoot, 'public'),
    templateRoot = path.join(engineRoot, 'template'),
    body = require('koa-better-body'),
    jade = require('koa-jade'),
    session = require('koa-session'),
    router = require('../config/route.js');


//app.keys = ['authorized'];
//app.use(session(app));

app.use(require('koa-static')(staticRoot));

app.use(jade.middleware({
    viewPath: templateRoot,
    debug: false,
    pretty: false,
    compileDebug: false
}));


app.use(body({
    multipart: true
}));


app
    .use(router.routes())
    .use(router.allowedMethods());


app.use(function *() {

   this.status = 404;
   // yield this.render('service/404');
     this.render('/404.html');

});





app.listen(80);
console.log('Сервер запустился. Порт - 80');