/**
 * Created by Cronix-23-ZTan on 29.08.2015.
 */

var db = require('monk')('localhost:27017/Wellnine'), //подключились к бд
    monkWrap = require('co-monk'),//обертка для монка, делает запросы генератор френдли
    users = db.get('users'); // выбрали коллекци


/*//нашли документ
 users.find({'login' : 'Velidan'}, function (err, user) {
 if (err) throw err;
 console.log(user);
 });*/

/* идентификация пользователя (пока только админа)*/
function* identify(next) {
    var dataObj = {},  //Обьект для данных пользователя
        userInfo;

    dataObj.name =  this.request.body.fields.name.trim();
    dataObj.password = this.request.body.fields.password.trim();


    userInfo = yield userAuth(dataObj);

    if (userInfo.authStatus === 1) {
      //  this.request.header.cookies.set('Cookie', a);
         this.set('Set-Cookie', 'isAuthorized = true; path = /');

    }

    /* Отправляем результат идентификации Ангуляру */
    this.response.body = userInfo;
}


/* Идентифицируем пользователя */
function* userAuth(dataObj) {
/* Создаем промис для запроса к базе и дальнейшей идентификации */
    return new Promise((resolve, reject) => {
            /* Запрос на извлечение пользователя из бд */
            users.find({'login' : dataObj.name}, function (err, user) {
                if (err) throw err;
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

                /* Отправляем статус обратно из промиса */
                    resolve(userInfo);
            });
        });
}



function* signIn(next) {
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


var routerChunk = module.exports = {
    get : {
        url : '/terminal',
        middleware : signIn
    },
    post : {
        url : '/terminal/identify',
        middleware : identify
    }

};