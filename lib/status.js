"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @file status.js
 * @author liyang@jingoal.com
 *
 * 下拉刷新和上拉加载更多的状态
 * */

var REFRESHSTATUS = {
    PULL: 0,
    RELEASE: 1,
    LOAD: 2,
    SUCCESS: 3,
    FAIL: 4
};

var LOADMORESTATUS = {
    PULL: 0,
    RELEASE: 1,
    LOAD: 2,
    NOMORE: 3
};

exports.REFRESHSTATUS = REFRESHSTATUS;
exports.LOADMORESTATUS = LOADMORESTATUS;