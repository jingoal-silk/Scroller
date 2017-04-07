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
function getMessage(key) {
    var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LANGUAGE;

    if (lang === 'zh' || lang === 'zh_CN') {
        return key ? _zh_CN2.default[key] : _zh_CN2.default;
    } else if (lang === 'zh-Hant' || lang === 'zh_TW') {
        return key ? _zh_TW2.default[key] : _zh_TW2.default;
    } else if (lang === 'en' || lang === 'en_US') {
        return key ? _en_US2.default[key] : _en_US2.default;
    }
    return null;
}

function getLocale(key) {
    var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LANGUAGE;

    if (lang === 'zh' || lang === 'zh_CN') {
        return {
            lang: 'zh',
            messages: key ? _zh_CN2.default[key] : _zh_CN2.default
        };
    } else if (lang === 'zh-Hant' || lang === 'zh_TW') {
        return {
            lang: 'zh-Hant',
            messages: key ? _zh_TW2.default[key] : _zh_TW2.default
        };
    } else if (lang === 'en' || lang === 'en_US') {
        return {
            lang: 'en',
            messages: key ? _en_US2.default[key] : _en_US2.default
        };
    }
    return null;
}