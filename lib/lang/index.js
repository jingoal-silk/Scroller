'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMessage = getMessage;
exports.getLocale = getLocale;

var _zh_CN = require('./zh_CN.json');

var _zh_CN2 = _interopRequireDefault(_zh_CN);

var _zh_TW = require('./zh_TW.json');

var _zh_TW2 = _interopRequireDefault(_zh_TW);

var _en_US = require('./en_US.json');

var _en_US2 = _interopRequireDefault(_en_US);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LANGUAGE = 'zh'; /**
                      * @file index.js
                      * @author houyl@jingoal.com
                      *
                      * 多语言处理
                      */

/* eslint-disable camelcase */
function getMessage() {
    var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : LANGUAGE;

    if (lang === 'zh' || lang === 'zh_CN') {
        return _zh_CN2.default;
    } else if (lang === 'zh-Hant' || lang === 'zh_TW') {
        return _zh_TW2.default;
    } else if (lang === 'en' || lang === 'en_US') {
        return _en_US2.default;
    }
    return null;
}

function getLocale() {
    var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : LANGUAGE;

    if (lang === 'zh' || lang === 'zh_CN') {
        return {
            lang: 'zh',
            messages: _zh_CN2.default
        };
    } else if (lang === 'zh-Hant' || lang === 'zh_TW') {
        return {
            lang: 'zh-Hant',
            messages: _zh_TW2.default
        };
    } else if (lang === 'en' || lang === 'en_US') {
        return {
            lang: 'en',
            messages: _en_US2.default
        };
    }
    return null;
}