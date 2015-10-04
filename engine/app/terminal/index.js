/**
 * Created by Cronix-23-ZTan on 29.08.2015.
 */

/**
 * Export Terminal module
 * @param config {Object} - some config for Article module
 * @returns {Terminal}
 */
module.exports = function (config) {
    return new Terminal(config);
};

/**
 * Terminal Class
 * @param config {Object} -> some config stuff like DB instance or absolute root path or some else
 * @constructor
 */
function Terminal(config) {
    this.config = config;
}

/**
 *  Method return request middleware and root for koa-route
 * @returns {{get: {url: string, middleware: generator}, post: {url: string, middleware: generator}}}
 */
Terminal.prototype.routerChunk = function () {
    var Module = this;

    return {
        get : {
            url : '/terminal',
            middleware : Module.signIn()
        },
        post : {
            url : '/terminal/identify',
            middleware : Module.identify()
        }
    }
};

/**
 * identify User
 * @returns generator middleware for Koa
 */
Terminal.prototype.identify = function () {
    var Module = this;

    return function* (next) {
        var dataObj = {},  //Обьект для данных пользователя
            userInfo;

        dataObj.name =  this.request.body.fields.name.trim();
        dataObj.password = this.request.body.fields.password.trim();

        userInfo = yield Module.userAuth(dataObj);

        if (userInfo.authStatus === 1) {
            //  this.request.header.cookies.set('Cookie', a);
            this.set('Set-Cookie', 'isAuthorized = true; path = /');

        }

        /* Отправляем результат идентификации Ангуляру */
        this.response.body = userInfo;
        /* Закрываем соединение с ДБ */
      //  db.close();
    }
};

/**
 * Check if we registered already or not and set cookie if we logged
 * @returns generator middleware for Koa
 */
Terminal.prototype.signIn = function () {
    var Module = this;

    return function* (next) {
        var isAuthorizedCookies;
        function parseCookies (request) {
            var list = {},
                rc = request.headers.cookie;

            rc && rc.split(';').forEach(function( cookie ) {
                var parts = cookie.split('=');
                list[parts.shift().trim()] = decodeURI(parts.join('='));
            });

            return list;
        }

        isAuthorizedCookies =  parseCookies(this.request).isAuthorized;

        this.render('layouts/mainTerminalLayout.jade', {isAuthorized: isAuthorizedCookies}, true);
    }
};

/**
 * Search user in database
 * @param dataObj {Object} -> data information about user (login and password now)
 * @returns {boolean} -> Promise with success data or reject
 */
Terminal.prototype.userAuth = function (dataObj) {
    var db = this.config.DB;
        db.connect();

    var Model = db.getModel('users', {
        login : String,
        password : String,
        role : String
    });
        /* Создаем промис для запроса к базе и дальнейшей идентификации */
        return new Promise((resolve, reject) => {
                /* Запрос на извлечение пользователя из бд */

                Model.find({'login' : dataObj.name}, function (err, user) {
                    if (err) {reject(err)};
                    /* Обьект для полной информации о пользователе */
                    var userInfo = {};
                    /* Если хоть что-то извлекли из базы   Т.е. логин правильный */
                    if (user.length > 0) {
                        /* Если извлекли юзера и пароль юзера совпадает с свведенных - все супер Статус - 1 */
                        if (dataObj.password === user[0].password) {
                            userInfo.authStatus = 1;
                        } else {
                            /* Если пароли не совпадают - ставим стату не совпадения паролей */
                            userInfo.authStatus = 2;
                        }
                    } else {
                        /* Юзер не найден в базе. Неправильный логин */
                        userInfo.authStatus = 0;
                    }

                    userInfo.userData = user;

                    db.close();
                    /* Отправляем статус обратно из промиса */
                    resolve(userInfo);
                });
    });
}