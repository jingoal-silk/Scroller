'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file utils.js
 * @author liyang@jingoal.com
 * @desc
 *
 *      工具函数
 * */

/**
 * 针对不同内核的浏览器对requestAnimationFrane做兼容处理
 * */
var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    return window.setTimeout(callback, 1000 / 60);
};

/**
 * 缓存DIV元素的默认样式，为之后的兼容处理做准备
 * */
var elementStyle = document.createElement('div').style;

/**
 * 获取厂商前缀
 * */
var vendor = function () {
    var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'];
    var len = vendors.length;

    var transform = void 0;
    var i = 0;

    for (; i < len; i++) {
        transform = vendors[i] + 'ransform';

        if (transform in elementStyle) {
            return vendors[i].substr(0, vendors[i].length - 1);
        }
    }

    return false;
}();

/**
 * 判断是否为坏的安卓手机
 * */
var isBadAndroid = function () {
    var appVersion = window.navigator.appVersion;

    if (/Android/.test(appVersion) && !/Chrome\/\d/.test(appVersion)) {
        var safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
        if (safariVersion && (typeof safariVersion === 'undefined' ? 'undefined' : (0, _typeof3.default)(safariVersion)) === 'object' && safariVersion.length >= 2) {
            return parseFloat(safariVersion[1]) < 535.19;
        }
        return true;
    }
    return false;
}();

/**
 * 对transition、translate等属性做兼容处理
 * */
function prefixStyle(style) {
    if (vendor === false) return false;
    if (vendor === '') return style;
    return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

var transform = prefixStyle('transform');

/**
 * 绑定事件的函数
 *
 * @param
 *      el - DOM元素
 *      type - 事件类型
 *      fn - 事件处理器
 *      capture - 捕获开关
 */
function addEvent(el, type, fn, capture) {
    el.addEventListener(type, fn, !!capture);
}

/**
 * 删除事件的函数
 *
 * @param
 *      el - DOM元素
 *      type - 事件类型
 *      fn - 事件处理器
 *      capture - 捕获开关
 * */
function removeEvent(el, type, fn, capture) {
    el.removeEventListener(type, fn, !!capture);
}

/**
 * 动量函数
 *
 * @param
 *      current - 当前位置
 *      start -  起始位置
 *      time - 持续事件
 *      lowerMargin - 滑块长度
 *      wrapperSize - 容器长度
 *      deceleration - 阻尼系数
 *
 * @return
 *      destination - 终点位置
 *      duration - 持续时间
 * */
function momentum(current, start, time, lowerMargin, wrapperSize) {
    var deceleration = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.0006;

    var distance = current - start;
    var destination = void 0;
    var duration = void 0;

    var speed = Math.abs(distance) / time;

    destination = current + speed * speed / (2 * deceleration) * (distance < 0 ? -1 : 1);
    duration = speed / deceleration;

    if (destination < lowerMargin) {
        destination = wrapperSize ? lowerMargin - wrapperSize / 2.5 * (speed / 8) : lowerMargin;
        distance = Math.abs(destination - current);
        duration = distance / speed;
    } else if (destination > 0) {
        destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
        distance = Math.abs(current) + destination;
        duration = distance / speed;
    }

    return {
        destination: Math.round(destination),
        duration: duration
    };
}

var getTime = Date.now || function () {
    return new Date().getTime();
};

/**
 * 计算偏移
 * */
function offset(el) {
    var left = -el.offsetLeft;
    var top = -el.offsetTop;

    while (el = el.offsetParent) {
        // eslint-disable-line no-cond-assign, no-param-reassign
        left -= el.offsetLeft;
        top -= el.offsetTop;
    }

    return { left: left, top: top };
}

function preventDefaultException(el, exceptions) {
    for (var i in exceptions) {
        // eslint-disable-line no-restricted-syntax
        if (exceptions[i].test(el[i])) {
            return true;
        }
    }

    return false;
}

var style = {
    transform: transform,
    transitionTimingFunction: prefixStyle('transitionTimingFunction'),
    transitionDuration: prefixStyle('transitionDuration'),
    transitionDelay: prefixStyle('transitionDelay'),
    transformOrigin: prefixStyle('transformOrigin')
};

var eventType = {
    touchstart: 1,
    touchmove: 1,
    touchend: 1
};

/**
 * 动画
 * */
/* eslint-disable */
var ease = {
    quadratic: {
        style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fn: function fn(k) {
            return k * (2 - k);
        }
    },
    circular: {
        style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',
        fn: function fn(k) {
            return Math.sqrt(1 - --k * k);
        }
    },
    back: {
        style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        fn: function fn(k) {
            var b = 4;
            return (k = k - 1) * k * ((b + 1) * k + b) + 1;
        }
    },
    bounce: {
        style: '',
        fn: function fn(k) {
            if ((k /= 1) < 1 / 2.75) {
                return 7.5625 * k * k;
            } else if (k < 2 / 2.75) {
                return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
            } else if (k < 2.5 / 2.75) {
                return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
            } else {
                return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
            }
        }
    },
    elastic: {
        style: '',
        fn: function fn(k) {
            var f = 0.22,
                e = 0.4;

            if (k === 0) {
                return 0;
            }
            if (k == 1) {
                return 1;
            }

            return e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1;
        }
    }
};
/* eslint-enable */

var utils = {
    hasTransform: transform !== false,
    hasPerspective: prefixStyle('perspective') in elementStyle,
    hasTouch: 'ontouchstart' in window,
    hasTransition: prefixStyle('transition') in elementStyle,
    prefixStyle: prefixStyle,
    addEvent: addEvent,
    removeEvent: removeEvent,
    getTime: getTime,
    style: style,
    isBadAndroid: isBadAndroid,
    offset: offset,
    momentum: momentum,
    preventDefaultException: preventDefaultException,
    eventType: eventType,
    ease: ease,
    requestAnimationFrame: requestAnimationFrame
};

exports.default = utils;