var nodePath = require('path'),
/* ���������� ������ ��� ��� - �������� �������� � �������� engine
 * ���������:  e:\�Malder�\Web\[1_Node]\Wellnine/engine */
    rootAppPath = nodePath.normalize(nodePath.resolve(require('app-root-path').path) + '/engine'),
    DB_Instance = require(rootAppPath +  '/utility/db')('localhost', 27017, 'Wellnine'),
    UTILITY = require(rootAppPath +  '/utility/Utility'),

    config = {
    Q : require('q'),  /* Q library for async generators */
    DB : DB_Instance,
    rootAppPath : rootAppPath, /* path to app root */
    UTILITY : UTILITY /* some useful stuff */
};

module.exports = config;