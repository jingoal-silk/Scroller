'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sticky = undefined;

var _Scroller = require('./Scroller');

var _Scroller2 = _interopRequireDefault(_Scroller);

var _Sticky = require('./Sticky');

var _Sticky2 = _interopRequireDefault(_Sticky);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file index.js
 * @author liyang@jingoal.com
 *
 * 入口文件
 * */

_Scroller2.default.Sticky = _Sticky2.default;

exports.default = _Scroller2.default;
exports.Sticky = _Sticky2.default;