var router = require('koa-router')();

var terminalRoute = require('../app/terminal/index');


router
    .get(terminalRoute.get.url, terminalRoute.get.middleware)
    .post(terminalRoute.post.url, terminalRoute.post.middleware);



module.exports = router;

