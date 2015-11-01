var nodePath = require('path'),
/* ���������� ������ ��� ��� - �������� �������� � �������� engine
 * ���������:  e:\�Malder�\Web\[1_Node]\Wellnine/engine */
    rootAppPath = nodePath.normalize(nodePath.resolve(require('app-root-path').path) + '/engine'),
    DB_Instance = require(rootAppPath +  '/utility/db')('localhost', 27017, 'Wellnine'),
    UTILITY = require(rootAppPath +  '/utility/Utility'),

    config = {
    DB : DB_Instance,
    rootAppPath : rootAppPath,
    UTILITY : UTILITY
};

module.exports = config;