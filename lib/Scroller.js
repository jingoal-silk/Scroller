'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp; /**
                    * @file Scroller.jsx
                    * @author liyang@jingoal.com
                    *
                    * 滚动组件，用于提供滚动容器
                    *
                    * 滚动原理:
                    * 该组件是通过提供一个容器（container）和一个滑块 (scroller) 实现的。容器必须有一个确定的高度才能正常工作，滑块通过两种方案实现滚动
                    * 1、CSS3动画实现方案 transition + transform
                    * 2、通过requestAnimationFrame + transform实现，这样做是为了更加精细的控制滚动过程，但是会稍微牺牲性能
                    *
                    * tip: 如果系统不支持transform，修改left、right、top、bottom值作为降级方案
                    *
                    * 功能:
                    * 1、提供横向滚动、纵向滚动和自由滚动
                    * 2、提供下拉刷新和上拉加载更多功能
                    * */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _icons = require('./icons');

var _icons2 = _interopRequireDefault(_icons);

var _status = require('./status');

var _lang = require('./lang');

require('./Scroller.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boundaryThreshold = 5;

var Scroller = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(Scroller, _Component);

    /*eslint-enable*/

    function Scroller(props) {
        (0, _classCallCheck3.default)(this, Scroller);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Scroller.__proto__ || (0, _getPrototypeOf2.default)(Scroller)).call(this, props));

        _this.x = 0;
        _this.y = 0;
        _this.directionX = 0;
        _this.directionY = 0;
        _this.scrollerStyle = {};
        _this.stickyHeaders = [];
        _this.stickyIndex = 0;
        _this.stickyOffset = 0;
        _this.wrapperOffsetTop = 0;

        _this.isIphone = /iphone/gi.test(navigator.appVersion);
        // 重置属性
        _this.resetProps();
        // 缓存个滑块的DOM节点
        _this.loadTipElCache = _this.getLoadTipElCache();
        // 初始化语言包
        _this.lang = (0, _lang.getMessage)(props.lang);
        return _this;
    }
    /*eslint-disable*/
    // 这里禁用了eslint语法检查：no-unused-prop-types，因为这些属性可能不是直接调用，有可能是传参调用，这时候esline语法检查不能通过


    (0, _createClass3.default)(Scroller, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return { scroller: this };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            // 缓存滑块的样式，提高效率
            this.scrollerStyle = this.scroller.style;

            if (this.props.usePullRefresh) {
                this.pullRefreshOffsetHeight = this.pullRefreshEl.offsetHeight;
            }

            if (this.props.useLoadMore) {
                this.loadMoreOffsetHeight = this.loadMoreEl.offsetHeight;
            }

            // 初始化事件
            this.initEvent();
            this.refresh();

            this.refreshSticky(true);
            if (this.stickyHeaders.length) this.useTransition = false;

            // 设置刷新、加载更多状态
            this.setRefreshStatus(_status.REFRESHSTATUS.PULL);
            this.setLoadMoreStatus(this.loadMoreStatus || _status.LOADMORESTATUS.PULL);
            // 重置加载更多
            this.refreshLoadMore();

            this.resetPosition();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.resetProps(nextProps, true);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProp, prevState) {
            if (this.props.autoRefresh) this.refresh();

            this.refreshSticky();
            if (this.stickyHeaders.length) this.useTransition = false;

            // 重置 pullRefresh 和 loadMore
            if (prevState.usePullRefresh !== this.state.usePullRefresh) {
                this.setRefreshStatus(_status.REFRESHSTATUS.PULL);
            }
            if (prevState.useLoadMore !== this.state.useLoadMore || prevState.noMoreData !== this.props.noMoreData) {
                this.setLoadMoreStatus(this.loadMoreStatus || _status.LOADMORESTATUS.PULL);
                this.refreshLoadMore();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.initEvent(true);
        }

        /**
         * 设置下拉刷新的状态
         * @param status [Number] 下拉刷新的状态
         * @param callback [Function] 修改完状态后的执行的回调函数
         * */

    }, {
        key: 'setRefreshStatus',
        value: function setRefreshStatus(status) {
            if (!this.state.usePullRefresh) return;

            // 保存之前的状态
            this.prevRefreshState = this.pullRefreshStatus;
            this.pullRefreshStatus = status;

            var iconEl = this.loadTipElCache.querySelector('i');
            var textEl = this.loadTipElCache.querySelector('div');
            var cssText = '';

            switch (status) {
                case _status.REFRESHSTATUS.PULL:
                    textEl.innerHTML = this.lang.pullDownToRefresh;
                    if (this.prevRefreshState === _status.REFRESHSTATUS.RELEASE) {
                        iconEl.innerHTML = _icons2.default.upArrow;
                        cssText = 'transform: rotate(-180deg); -webkit-transform: rotate(-180deg);';
                    } else {
                        iconEl.innerHTML = _icons2.default.downArrow;
                    }
                    break;
                case _status.REFRESHSTATUS.RELEASE:
                    textEl.innerHTML = this.lang.releaseToLoadMore;
                    if (this.prevRefreshState === _status.REFRESHSTATUS.PULL) {
                        iconEl.innerHTML = _icons2.default.downArrow;
                        cssText = 'transform: rotate(180deg); -webkit-transform: rotate(180deg);';
                    } else {
                        iconEl.innerHTML = _icons2.default.upArrow;
                    }
                    break;
                case _status.REFRESHSTATUS.LOAD:
                    textEl.innerHTML = this.lang.loading;
                    iconEl.innerHTML = _icons2.default.loading;
                    cssText = 'animation: rotate 1s linear infinite; -webkit-animation: rotate 1s linear infinite';
                    break;
                case _status.REFRESHSTATUS.SUCCESS:
                    textEl.innerHTML = this.lang.refreshSuccess;
                    iconEl.innerHTML = _icons2.default.success;
                    break;
                case _status.REFRESHSTATUS.FAIL:
                    textEl.innerHTML = this.lang.refreshFailed;
                    iconEl.innerHTML = _icons2.default.error;
                    break;
                default:
                    console.warn('Unsupported state!');
                    break;
            }

            this.pullRefreshEl.replaceChild(this.loadTipElCache.cloneNode(true), this.pullRefreshEl.childNodes[0]);

            var icon = this.pullRefreshEl.querySelector('i');
            setTimeout(function () {
                icon.style.cssText = cssText;
            }, 0);
        }

        /**
         * 设置上拉加载更多的状态
         * @param status [Number] 上拉加载更多的状态
         * @param callback [Function] 修改完状态后的执行的回调函数
         * */

    }, {
        key: 'setLoadMoreStatus',
        value: function setLoadMoreStatus(status) {
            if (!this.state.useLoadMore) return;

            // 保存之前的状态
            this.prevLoadState = this.loadMoreStatus;
            this.loadMoreStatus = status;

            var iconEl = this.loadTipElCache.querySelector('i');
            var textEl = this.loadTipElCache.querySelector('div');
            var cssText = '';

            switch (status) {
                case _status.LOADMORESTATUS.PULL:
                    textEl.innerHTML = this.lang.pullupToLoadMore;
                    if (this.prevLoadState === _status.LOADMORESTATUS.RELEASE) {
                        iconEl.innerHTML = _icons2.default.downArrow;
                        cssText = 'transform: rotate(180deg); -webkit-transform: rotate(180deg);';
                    } else {
                        iconEl.innerHTML = _icons2.default.upArrow;
                    }
                    break;
                case _status.LOADMORESTATUS.RELEASE:
                    textEl.innerHTML = this.lang.releaseToLoadMore;
                    if (this.prevLoadState === _status.LOADMORESTATUS.PULL) {
                        iconEl.innerHTML = _icons2.default.upArrow;
                        cssText = 'transform: rotate(-180deg); -webkit-transform: rotate(-180deg);';
                    } else {
                        iconEl.innerHTML = _icons2.default.downArrow;
                    }
                    break;
                case _status.LOADMORESTATUS.LOAD:
                    textEl.innerHTML = this.lang.loading;
                    iconEl.innerHTML = _icons2.default.loading;
                    cssText = 'animation: rotate 1s linear infinite; -webkit-animation: rotate 1s linear infinite';
                    break;
                case _status.LOADMORESTATUS.NOMORE:
                    textEl.innerHTML = this.lang.noMoreData;
                    iconEl.innerHTML = '';
                    break;
                default:
                    console.warn('Unsupported state!');
                    break;
            }

            this.loadMoreEl.replaceChild(this.loadTipElCache.cloneNode(true), this.loadMoreEl.firstChild);

            var icon = this.loadMoreEl.querySelector('i');
            setTimeout(function () {
                icon.style.cssText = cssText;
            }, 0);
        }

        /**
         * 获取loadTip的DOM缓存
         * */

    }, {
        key: 'getLoadTipElCache',
        value: function getLoadTipElCache() {
            var dom = document.createElement('div');

            dom.className = 'silk-listcontrol-loadtip';
            dom.innerHTML = '<i class="silk-listcontrol-icon"></i><div class="silk-listcontrol-text"></div>';

            return dom;
        }

        /**
         * 获取当前的置顶块
         * */

    }, {
        key: 'getCurrentSticky',
        value: function getCurrentSticky() {
            var ret = null;
            if (this.y < 0) {
                var absY = Math.abs(this.y);
                var wrapperTop = this.wrapperOffsetTop;
                var upperHeaders = this.stickyHeaders.filter(function (header) {
                    return header.offsetTop - wrapperTop <= absY;
                });

                if (upperHeaders.length) {
                    var currentHeader = upperHeaders[upperHeaders.length - 1];
                    var nextHeader = this.stickyHeaders[upperHeaders.length];
                    var index = upperHeaders.length - 1;
                    if (nextHeader) {
                        var distToNext = nextHeader.offsetTop - wrapperTop - absY;
                        var adjustOffset = distToNext > currentHeader.height ? 0 : -(currentHeader.height - distToNext);
                        ret = { currentHeader: currentHeader, adjustOffset: adjustOffset, index: index };
                    } else {
                        ret = { currentHeader: currentHeader, adjustOffset: 0, index: index };
                    }
                } else {
                    ret = null;
                }
            } else {
                ret = null;
            }
            return ret;
        }

        /**
         * 获取计算样式
         * */

    }, {
        key: 'getComputedPosition',
        value: function getComputedPosition() {
            var matrix = window.getComputedStyle(this.scroller, null);
            var x = void 0;
            var y = void 0;

            if (this.useTransform) {
                matrix = matrix[_utils2.default.style.transform].split(')')[0].split(', ');
                x = +(matrix[12] || matrix[4]);
                y = +(matrix[13] || matrix[5]);
            } else {
                x = +matrix.left.replace(/[^-\d.]/g, '');
                y = +matrix.top.replace(/[^-\d.]/g, '');
            }

            return { x: x, y: y };
        }

        /**
         * 刷新置顶块
         * */

    }, {
        key: 'refreshSticky',
        value: function refreshSticky(forceRefresh) {
            if (this.stickyHeaders.length) {
                var currentSticky = this.getCurrentSticky();
                var stickyNode = this.stickyNode;

                if (currentSticky) {
                    var currentHeader = currentSticky.currentHeader,
                        adjustOffset = currentSticky.adjustOffset;


                    if (currentSticky.index !== this.stickyIndex || currentSticky.adjustOffset !== this.stickyOffset || forceRefresh) {
                        var transform = 'translate(0px,' + adjustOffset + 'px) translateZ(0px)';
                        stickyNode.style.transform = transform;
                        stickyNode.style.WebkitTransform = transform;
                        stickyNode.style.display = 'block';
                        stickyNode.className = currentHeader.stickyExtraClass;
                        _reactDom2.default.render(_react2.default.cloneElement(currentHeader.onlyChild), stickyNode);

                        this.stickyIndex = currentSticky.index;
                        this.stickyOffset = currentSticky.adjustOffset;
                    }
                } else {
                    this.stickyIndex = null;
                    this.stickyOffset = null;
                    stickyNode.style.display = 'none';
                }
            }
        }

        /**
         * touchStart事件处理器
         * @param e [Event] 事件对象
         * */

    }, {
        key: 'touchStart',
        value: function touchStart(e) {
            if (this.disabled || this.initiated && _utils2.default.eventType[e.type] !== this.initiated) return;

            if (this.preventDefault && !_utils2.default.isBadAndroid && !_utils2.default.preventDefaultException(e.target, this.props.preventDefaultException)) {
                e.preventDefault();
            }

            var point = e.touches ? e.touches[0] : e;
            var pos = void 0;

            this.initiated = _utils2.default.eventType[e.type];
            this.moved = false;
            this.distX = 0;
            this.distY = 0;
            this.directionX = 0;
            this.directionY = 0;
            this.directionLocked = 0;

            // 取得touchStart的时间
            this.startTime = _utils2.default.getTime();

            // 如果支持transition并且正在执行transition动画
            if (this.useTransition && this.isInTransition) {
                // 将动画暂停
                this.transitionTime();
                // 将IScroll的状态修改一下
                this.isInTransition = false;
                // 得到计算的位置
                pos = this.getComputedPosition();
                this.translate(Math.round(pos.x), Math.round(pos.y));
                // 停止滚动
                this.execEvent('onScrollEnd');
            } else if (!this.useTransition && this.isAnimating) {
                // 设置为false后  requestAnimationFrame不会在执行
                this.isAnimating = false;
                _utils2.default.cancelAnimationFrame.call(window, this.rAF);
                this.execEvent('onScrollEnd');
            }

            // 将当前位置设置为开始滚动的初始位置
            this.startX = this.x;
            this.startY = this.y;
            this.absStartX = this.x;
            this.absStartY = this.y;
            // 手指的位置
            this.pointX = point.pageX;
            this.pointY = point.pageY;
            // 触发钩子  beforeScrollStart
            this.execEvent('onBeforeScrollStart');
        }

        /**
         * touchMove事件处理器
         * @param e [Event] 事件对象
         * */

    }, {
        key: 'touchMove',
        value: function touchMove(e) {
            if (this.disabled || _utils2.default.eventType[e.type] !== this.initiated) return;

            if (this.preventDefault) e.preventDefault();

            var point = e.touches ? e.touches[0] : e;
            var timestamp = _utils2.default.getTime();
            // 手指在X／Y轴上的增量
            var deltaX = point.pageX - this.pointX;
            var deltaY = point.pageY - this.pointY;
            var newX = void 0;
            var newY = void 0;

            // 更新pointX 和 pointY
            this.pointX = point.pageX;
            this.pointY = point.pageY;

            this.distX += deltaX;
            this.distY += deltaY;
            var absDistX = Math.abs(this.distX);
            var absDistY = Math.abs(this.distY);

            // 如果时间间隔相差300ms 并且 实际滚动的距离小于10像素
            if (timestamp - this.endTime > 300 && absDistX < 10 && absDistY < 10) return;

            // 只让其在一个方向上滚动  directionLocked 初始值为0  directionLockThreshold = 5
            if (!this.directionLocked && !this.freeScroll) {
                // 如果水平方向移动的绝对值 > 垂直方向移动的绝对值 + 5 则直接锁定运动方向为水平方向
                if (absDistX > absDistY + this.directionLockThreshold) {
                    this.directionLocked = 'h'; // 锁住水平方向的滚动
                } else if (absDistY >= absDistX + this.directionLockThreshold) {
                    this.directionLocked = 'v'; // 锁住垂直方向的滚动
                } else {
                    this.directionLocked = 'n'; // 不锁
                }
            }

            // 有些时候你想保留原生纵向的滚动条但想为横向滚动条增加iScroll功能（比如走马灯）。
            // 设置这个属性为true并且iScroll区域只将影响横向滚动，纵向滚动将滚动整个页面。
            if (this.directionLocked === 'h') {
                // 水平方向滚动时 锁住 全局垂直滚动
                if (this.eventPassthrough === 'vertical') {
                    e.preventDefault();
                } else if (this.eventPassthrough === 'horizontal') {
                    this.initiated = false;
                    // 若为是水平方向的eventPassthrough，将启动设置为false 则永远不会执行_move函数
                    return;
                }
                // 始终将Y方向的位移设置为0
                deltaY = 0;
            } else if (this.directionLocked === 'v') {
                if (this.eventPassthrough === 'horizontal') {
                    e.preventDefault();
                } else if (this.eventPassthrough === 'vertical') {
                    this.initiated = false;
                    return;
                }
                deltaX = 0;
            }

            // 允许垂直或者水平滚动时 才会将deltaX deltaY赋值 否则为0
            deltaX = this.hasHorizontalScroll ? deltaX : 0;
            deltaY = this.hasVerticalScroll ? deltaY : 0;

            // 新的位置
            newX = this.x + deltaX;
            newY = this.y + deltaY;

            // 如果超出了边界则放慢速度
            if (newX > 0 || newX < this.maxScrollX) {
                newX = this.props.bounce ? // eslint-disable-line no-nested-ternary
                this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
            }
            // 大于0  则说明拉到下边位置了  或者已经超出了顶端
            if (newY > 0 || newY < this.maxScrollY) {
                newY = this.props.bounce ? // eslint-disable-line no-nested-ternary
                this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
            }

            // 设置方向 若 deltaX大于0  说明是在向下滑动  小于0 向上滑动  等于0 不动
            this.directionX = deltaX > 0 ? // eslint-disable-line no-nested-ternary
            -1 : deltaX < 0 ? 1 : 0;
            this.directionY = deltaY > 0 ? // eslint-disable-line no-nested-ternary
            -1 : deltaY < 0 ? 1 : 0;

            // 如果现在还没动 就执行钩子函数  scrollStart
            if (!this.moved) {
                this.execEvent('onScrollStart');
            }

            // 将其设置为true
            this.moved = true;

            // 运动到新的位置
            this.translate(newX, newY);

            // 如果propbeType = 1 最少大于300ms执行一次scroll事件
            if (timestamp - this.startTime > 300) {
                // 更新开始时间
                this.startTime = timestamp;
                // 更新起始位置
                this.startX = this.x;
                this.startY = this.y;
            }

            this.execEvent('onScroll');
        }

        /**
         * touchEnd事件处理器
         * @param e [Event] 事件对象
         * */

    }, {
        key: 'touchEnd',
        value: function touchEnd(e) {
            if (this.disabled || _utils2.default.eventType[e.type] !== this.initiated) return;

            if (this.preventDefault && !_utils2.default.preventDefaultException(e.target, this.props.preventDefaultException)) {
                e.preventDefault();
            }

            var momentumX = void 0;
            var momentumY = void 0;
            var duration = _utils2.default.getTime() - this.startTime;
            var newX = Math.round(this.x);
            var newY = Math.round(this.y);
            var time = 0;
            var easing = void 0;

            this.isInTransition = 0;
            this.initiated = 0;
            this.endTime = _utils2.default.getTime();

            if (!this.moved) {
                if (this.props.click) {
                    _utils2.default.click(e);
                }

                this.execEvent('onScrollCancel');
                return;
            }

            // 设置下拉刷新
            if (this.state.usePullRefresh && this.y >= this.pullRefreshOffsetHeight) {
                if (this.pullRefreshStatus === _status.REFRESHSTATUS.LOAD) {
                    this.scrollTo(this.x, this.pullRefreshOffsetHeight, 200);
                } else {
                    this.setRefreshStatus(_status.REFRESHSTATUS.LOAD);
                    this.scrollTo(this.x, this.pullRefreshOffsetHeight, 300);
                    this.loadData('refresh');
                }
                return;
            }

            // 设置加载更多
            if (this.state.useLoadMore && this.y < this.maxScrollY) {
                if (this.loadMoreStatus !== _status.LOADMORESTATUS.NOMORE && this.loadMoreStatus !== _status.LOADMORESTATUS.LOAD && !this.props.noMoreData) {
                    this.setLoadMoreStatus(_status.LOADMORESTATUS.LOAD);
                    this.loadData('load');
                }
            }

            // 如果超出边界 需要重置
            if (this.resetPosition(this.props.bounceTime)) return;

            this.scrollTo(newX, newY);

            // 如果需要的话开始动量动画
            if (this.props.momentum && duration < 300) {
                momentumX = this.hasHorizontalScroll ? _utils2.default.momentum(this.x, this.startX, duration, this.maxScrollX, this.props.bounce ? this.wrapperWidth : 0, this.props.deceleration) : { destination: newX, duration: 0 };
                momentumY = this.hasVerticalScroll ? _utils2.default.momentum(this.y, this.startY, duration, this.maxScrollY, this.props.bounce ? this.wrapperHeight : 0, this.props.deceleration) : { destination: newY, duration: 0 };

                newX = momentumX.destination;
                newY = momentumY.destination;
                time = Math.max(momentumX.duration, momentumY.duration);
                this.isInTransition = 1;
            }

            if (newX !== this.x || newY !== this.y) {
                // 当超出边界时 改变缓动函数
                if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
                    easing = _utils2.default.ease.quadratic;
                }

                this.scrollTo(newX, newY, time, easing);
                return;
            }

            this.execEvent('onScrollEnd');
        }

        /**
         * transitionEnd事件处理器
         * @param e [Event] 事件对象
         * */

    }, {
        key: 'transitionEnd',
        value: function transitionEnd(e) {
            if (e.target !== this.scroller || !this.isInTransition) return;

            this.transitionTime();

            // resetPosition 位置没变  返回false  变了返回true
            if (!this.resetPosition(this.props.bounceTime)) {
                this.isInTransition = false;
                this.execEvent('onScrollEnd');
            }
        }

        /**
         * 绑定/删除事件
         * @param flag [boolean] 标识是添加事件还是删除事件
         * */

    }, {
        key: 'initEvent',
        value: function initEvent(flag) {
            var eventType = flag ? _utils2.default.removeEvent : _utils2.default.addEvent;

            if (this.props.click) {
                eventType(this.wrapper, 'click', this, true);
            }

            if (_utils2.default.hasTouch) {
                eventType(this.wrapper, 'touchstart', this);
                eventType(window, 'touchmove', this);
                eventType(window, 'touchend', this);
                eventType(window, 'touchcancel', this);
                eventType(this.scroller, _utils2.default.prefixStyle('transitionend'), this);
            } else {
                console.warn('your device did not support touch event!');
            }
        }

        /**
         * 执行绑定的事件
         * @param eventType [String] 需要执行的事件名称
         * @param param [Object] 执行事件处理函数传入的参数
         * */

    }, {
        key: 'execEvent',
        value: function execEvent(eventType, param) {
            if (eventType === 'onScrollStart') {
                this.isScrolling = true;
            }
            if (eventType === 'onScroll') {
                this.refreshSticky();
                if (this.pullRefreshStatus === _status.REFRESHSTATUS.PULL || this.pullRefreshStatus === _status.REFRESHSTATUS.RELEASE) {
                    this.hasVerticalScroll = true;
                } else if ((this.pullRefreshStatus === _status.REFRESHSTATUS.SUCCESS || this.pullRefreshStatus === _status.REFRESHSTATUS.FAIL) && this.y > 0) {
                    this.hasVerticalScroll = false;
                }

                if (this.isIphone && (this.scrollY && (this.pointY < boundaryThreshold || this.pointY > document.documentElement.clientHeight - boundaryThreshold) || this.scrollX && (this.pointX < boundaryThreshold || this.pointX > document.documentElement.clientWidth - boundaryThreshold))) {
                    var ev = document.createEvent('Event');
                    ev.initEvent('touchend', true, true);
                    document.dispatchEvent(ev);
                }
            }
            if (eventType === 'onScrollEnd') {
                this.refreshSticky();
                this.isScrolling = false;
                this.hasVerticalScroll = this.props.scrollY && this.maxScrollY < 0;
            }
            if (this.props[eventType]) {
                this.props[eventType].apply(this, [{
                    contentOffset: {
                        x: this.x,
                        y: this.y
                    },
                    param: param
                }]);
            }
        }

        /**
         * 重置滑块的位置
         * @param time [Number] 重置位置所需要的时间，单位ms
         * */

    }, {
        key: 'resetPosition',
        value: function resetPosition() {
            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            var x = this.x;
            var y = this.y;

            if (this.pullRefreshStatus === _status.REFRESHSTATUS.LOAD && this.y === this.pullRefreshOffsetHeight) {
                return false;
            }

            if (!this.hasHorizontalScroll || this.x > 0) {
                x = 0;
            } else if (this.x < this.maxScrollX) {
                x = this.maxScrollX;
            }

            if (!this.hasVerticalScroll || this.y > 0) {
                y = 0;
            } else if (this.y < this.maxScrollY) {
                y = this.maxScrollY;
            }

            // 做一层优化，如果没动，直接返回
            if (x === this.x && y === this.y) {
                return false;
            }

            this.scrollTo(x, y, time, this.props.bounceEasing);

            return true;
        }

        /**
         * 滚动到某个位置
         * @param x [Number] 沿X轴滚动的位置
         * @param y [Number] 沿Y轴滚动的位置
         * @param time [Number] 滚动到具体的位置所需要的时间
         * @param easing [Object] 滚动的缓动函数
         * */

    }, {
        key: 'scrollTo',
        value: function scrollTo() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.x;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.y;
            var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _utils2.default.ease.circular;

            // 判断组件是不是处于transition状态
            this.isInTransition = this.useTransition && time > 0;
            var transitionType = this.useTransition && easing.style;

            if (!time || transitionType) {
                if (transitionType) {
                    this.transitionTimingFunction(easing.style);
                    this.transitionTime(time);
                }
                this.translate(x, y);
            } else {
                this.animate(x, y, time, easing.fn);
            }
        }

        /**
         * 滚动动画的时间函数
         * @param easing [Object] 缓动函数
         * */

    }, {
        key: 'transitionTimingFunction',
        value: function transitionTimingFunction(easing) {
            this.scrollerStyle[_utils2.default.style.transitionTimingFunction] = easing;
        }

        /**
         * 滚动到具体位置所需要的时间
         * @param time [Number] 滚动时间
         * */

    }, {
        key: 'transitionTime',
        value: function transitionTime() {
            var _this2 = this;

            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            if (!this.useTransition) return;

            var durationProp = _utils2.default.style.transitionDuration;
            if (!durationProp) return;

            // 滑块的样式  将滑块的transitionDuration样式属性设置一下，如果时间为0 则瞬间停止
            this.scrollerStyle[durationProp] = time + 'ms';

            // time为0 并且是不支持的安卓
            if (!time && _utils2.default.isBadAndroid) {
                // 则将transitionDuration属性设置为极短
                this.scrollerStyle[durationProp] = '0.0001ms';
                self.rAF = requestAnimationFrame.call(window, function () {
                    if (_this2.scrollerStyle[durationProp] === '0.0001ms') {
                        _this2.scrollerStyle[durationProp] = '0s';
                    }
                });
            }
        }

        /**
         * 位移函数
         * @param x [Number] x轴方向的位移
         * @param y [Number] y轴方向的位移
         * */

    }, {
        key: 'translate',
        value: function translate(x, y) {
            x = Math.round(x); // eslint-disable-line no-param-reassign
            y = Math.round(y); // eslint-disable-line no-param-reassign

            // 如果支持transform这使用，不支持就使用left top
            if (this.useTransform) {
                this.scrollerStyle[_utils2.default.style.transform] = 'translate(' + x + 'px, ' + y + 'px) ' + this.translateZ;
            } else {
                this.scrollerStyle.left = x + 'px';
                this.scrollerStyle.top = y + 'px';
            }

            // 重置x,y的值
            this.x = x;
            this.y = y;

            if (this.state.usePullRefresh) {
                if (y >= this.pullRefreshOffsetHeight && this.pullRefreshStatus === _status.REFRESHSTATUS.PULL) {
                    this.setRefreshStatus(_status.REFRESHSTATUS.RELEASE);
                } else if (y < this.pullRefreshOffsetHeight && this.pullRefreshStatus === _status.REFRESHSTATUS.RELEASE) {
                    this.setRefreshStatus(_status.REFRESHSTATUS.PULL);
                }
            }

            if (this.state.useLoadMore) {
                if (y < this.maxScrollY && this.loadMoreStatus === _status.LOADMORESTATUS.PULL) {
                    if (this.props.autoLoad) {
                        // 取消动画,执行加载过程
                        if (this.useTransition && this.isInTransition) {
                            // 将动画暂停
                            this.transitionTime();
                            // 将IScroll的状态修改一下
                            this.isInTransition = false;
                            // 得到计算的位置
                            var pos = this.getComputedPosition();
                            this.translate(Math.round(pos.x), Math.round(pos.y));
                            // 停止滚动
                            this.execEvent('onScrollEnd');
                        } else if (!this.useTransition && this.isAnimating) {
                            // 设置为false后  requestAnimationFrame不会在执行
                            this.isAnimating = false;
                            _utils2.default.cancelAnimationFrame.call(window, this.rAF);
                            this.execEvent('onScrollEnd');
                        }
                        // 设置加载更多
                        if (this.state.useLoadMore && this.y < this.maxScrollY) {
                            if (this.loadMoreStatus !== _status.LOADMORESTATUS.NOMORE && this.loadMoreStatus !== _status.LOADMORESTATUS.LOAD && !this.props.noMoreData) {
                                this.setLoadMoreStatus(_status.LOADMORESTATUS.LOAD);
                                this.loadData('load');
                            }
                        }

                        // 如果超出边界 需要重置
                        this.resetPosition(this.props.bounceTime);
                    } else {
                        this.setLoadMoreStatus(_status.LOADMORESTATUS.RELEASE);
                    }
                } else if (y >= this.maxScrollY && this.loadMoreStatus === _status.LOADMORESTATUS.RELEASE) {
                    this.setLoadMoreStatus(_status.LOADMORESTATUS.PULL);
                }
            }
        }

        /**
         * 模拟下拉刷新
         * @param time [Number] 滚动时间
         * */

    }, {
        key: 'simulatePullRefresh',
        value: function simulatePullRefresh() {
            var _this3 = this;

            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;

            if (this.state.usePullRefresh && this.prevRefreshState !== _status.REFRESHSTATUS.LOAD) {
                this.scrollTo(this.x, this.pullRefreshOffsetHeight, time);
                setTimeout(function () {
                    _this3.setRefreshStatus(_status.REFRESHSTATUS.LOAD);
                    _this3.loadData('refresh');
                }, time);
            }
        }

        /**
         * 禁用Scroller组件
         * */

    }, {
        key: 'disable',
        value: function disable() {
            this.disabled = true;
        }

        /**
         * 启用Scroller组件
         * */

    }, {
        key: 'enable',
        value: function enable() {
            this.disabled = false;
        }

        /**
         * 加载数据
         * @param type [String] 是上拉还是下拉加载数据
         * */

    }, {
        key: 'loadData',
        value: function loadData(type) {
            var _this4 = this;

            var promise = new _promise2.default(function (resolve, reject) {
                if (type === 'refresh') {
                    _this4.props.pullRefreshAction(resolve, reject);
                } else {
                    _this4.props.loadMoreAction(resolve, reject);
                }
            });

            promise.then(function () {
                _this4.loadDataHandle(type, 3);
            }).catch(function () {
                _this4.loadDataHandle(type, 4);
            });
        }

        /**
         * 数据加载完成后执行的操作
         * @param type [String] 是上拉还是下拉加载数据
         * @param code [Number] 请求状态，标识成功还是失败
         * */

    }, {
        key: 'loadDataHandle',
        value: function loadDataHandle(type, code) {
            var _this5 = this;

            if (type === 'refresh') {
                this.setRefreshStatus(this.pullRefreshStatus = code);
                setTimeout(function () {
                    _this5.setRefreshStatus(_this5.pullRefreshStatus = _status.REFRESHSTATUS.PULL);
                    _this5.scrollTo(0, 0, 400);
                    _this5.refresh();
                }, 400);
            } else {
                this.loadMoreStatus = this.props.noMoreData ? _status.LOADMORESTATUS.NOMORE : _status.LOADMORESTATUS.PULL;
                this.setLoadMoreStatus(this.loadMoreStatus);
                this.refresh();
            }
        }

        /**
         * 刷新
         * @param refreshOption [Object]
         *     wrapperWidth: 容器的宽度
         *     wrapperHeight: 容器的高度
         *     scrollerWidth: 滑块的宽度
         * */

    }, {
        key: 'refresh',
        value: function refresh() {
            var refreshOption = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            // 容器的宽高
            this.wrapperWidth = refreshOption.wrapperWidth ? refreshOption.wrapperWidth : this.wrapper.clientWidth;
            this.wrapperHeight = refreshOption.wrapperHeight ? refreshOption.wrapperHeight : this.wrapper.clientHeight;
            // 容器上边缘到顶部的距离
            this.wrapperOffsetTop = -_utils2.default.offset(this.wrapper).top;

            // 滑块的宽高
            this.scrollerWidth = refreshOption.scrollerWidth ? refreshOption.scrollerWidth : this.scroller.offsetWidth;
            this.scrollerHeight = refreshOption.scrollerHeight ? refreshOption.scrollerHeight : this.scroller.offsetHeight;

            // 如果有加载更多，设置加载更多的位置，重置加载更多滑块的位置
            if (this.state.useLoadMore && this.loadMoreEl) {
                this.loadMoreEl.style.visibility = this.scrollerHeight > this.wrapperHeight ? 'visible' : 'hidden';
                this.loadMoreEl.style.top = this.scrollerHeight + 'px';
                this.scrollerHeight += this.loadMoreOffsetHeight;
            }

            // 可滑动的最大宽高
            this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
            this.maxScrollY = this.wrapperHeight - this.scrollerHeight;

            // 是否可以水平、垂直滚动
            this.hasHorizontalScroll = this.props.scrollX && this.maxScrollX < 0;
            this.hasVerticalScroll = this.props.scrollY && this.maxScrollY < 0;

            if (!this.hasHorizontalScroll) {
                this.maxScrollX = 0;
                this.scrollerWidth = this.wrapperWidth;
            }

            if (!this.hasVerticalScroll) {
                this.maxScrollY = 0;
                this.scrollerHeight = this.wrapperHeight;
            }

            // 初始化终止时间，当滚动的时候需要
            this.endTime = 0;
            this.directionX = 0;
            this.directionY = 0;

            // 触发用户自定义的刷新事件
            this.execEvent('onRefresh');
        }

        /**
         * 动画函数
         * @param destX [Number] 目的地X方向位置
         * @param destY [Number] 目的地Y方向位置
         * @param duration [Number] 持续时间
         * @param easingFn [Function] 缓动函数
         * */

    }, {
        key: 'animate',
        value: function animate(destX, destY, duration, easingFn) {
            var self = this;
            var startX = this.x;
            var startY = this.y;
            var startTime = _utils2.default.getTime();
            var destTime = startTime + duration;

            function step() {
                var now = _utils2.default.getTime();

                // 如果当前时间大于持续时间，则结束动画
                if (now >= destTime) {
                    self.isAnimating = false;
                    self.translate(destX, destY);
                    _utils2.default.cancelAnimationFrame.call(window, self.rAF);

                    if (!self.resetPosition(self.props.bounceTime)) {
                        self.execEvent('onScrollEnd');
                    }
                    return;
                }

                now = (now - startTime) / duration;
                var easing = easingFn(now);
                var newX = (destX - startX) * easing + startX;
                var newY = (destY - startY) * easing + startY;

                self.translate(newX, newY);

                if (self.isAnimating) {
                    self.rAF = _utils2.default.requestAnimationFrame.call(window, step);
                }

                self.execEvent('onScroll');
            }

            this.isAnimating = true;
            step();
        }

        /**
         * addEventListener() 方法是将指定的事件监听器注册到目标对象上，当该对象触发指定的事件时，指定的回调函数就会被执行。
         * 第二个参数除传入的是函数外，还可以传入对象，但是该对象中必须有 handleEvent函数，函数中的this指向该对象
         * 可以动态切换绑定事件的处理函数，而不需要remove之前的事件。
         * */

    }, {
        key: 'handleEvent',
        value: function handleEvent(e) {
            switch (e.type) {
                case 'touchstart':
                    this.touchStart(e);
                    break;
                case 'touchmove':
                    this.touchMove(e);
                    break;
                case 'touchend':
                case 'touchcancel':
                    this.touchEnd(e);
                    break;
                case 'transitionend':
                case 'webkitTransitionEnd':
                case 'oTransitionEnd':
                case 'MSTransitionEnd':
                    this.transitionEnd(e);
                    break;
                default:
                    console.warn('no match event type!');
                    break;
            }
        }
    }, {
        key: 'refreshLoadMore',
        value: function refreshLoadMore() {
            if (!this.state.useLoadMore) {
                this.resetPosition();
            } else if (this.loadMoreEl) {
                this.loadMoreEl.style.top = this.scrollerHeight - this.loadMoreOffsetHeight + 'px';
            }
        }

        /**
         * 重置属性
         * @param props [Object] 需要重置的样式的对象
         * @param isInit [Boolean] 重置样式时是组件是否已经初始化
         * */

    }, {
        key: 'resetProps',
        value: function resetProps() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
            var isInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            // 根据设备的支持情况，重置下面属性
            this.translateZ = props.HWCompositing && _utils2.default.hasPerspective ? ' translateZ(0)' : '';
            this.useTransition = _utils2.default.hasTransition && props.useTransition;
            this.useTransform = _utils2.default.hasTransform && props.useTransform;

            // 是否允许垂直或者水平方向原生的滚动
            this.eventPassthrough = props.eventPassthrough === true ? 'vertical' : props.eventPassthrough;
            // 是否组织默认事件
            this.preventDefault = !this.eventPassthrough && props.preventDefault;
            // 是否允许自由滚动
            this.freeScroll = props.freeScroll && !this.eventPassthrough;
            // 方向锁阈值
            this.directionLockThreshold = this.eventPassthrough ? 0 : props.directionLockThreshold;
            // 是否允许在X轴或者Y轴方向滚动
            this.scrollX = this.eventPassthrough === 'horizontal' ? false : props.scrollX;
            this.scrollY = this.eventPassthrough === 'vertical' ? false : props.scrollY;

            this.bounceEasing = typeof bounceEasing === 'string' ? _utils2.default.ease[this.props.bounceEasing] || _utils2.default.ease.circular : this.props.bounceEasing;

            if (this.props.onScroll) {
                this.useTransition = false;
            }

            // 重置 下拉刷新 和 加载更多
            var isUsePullRefresh = this.scrollY && !this.scrollX && this.props.usePullRefresh;
            var isUseLoadMore = this.scrollY && !this.scrollX && this.props.useLoadMore;

            var loadMoreStatus = void 0;

            if (isUseLoadMore && props.noMoreData) {
                loadMoreStatus = _status.LOADMORESTATUS.NOMORE;
            } else {
                loadMoreStatus = _status.LOADMORESTATUS.PULL;
            }

            if (isInit) {
                this.setState({
                    usePullRefresh: isUsePullRefresh,
                    useLoadMore: isUseLoadMore
                });
                this.pullRefreshStatus = isUsePullRefresh ? this.pullRefreshStatus : 0;
                this.loadMoreStatus = loadMoreStatus;
            } else {
                this.state = {
                    usePullRefresh: isUsePullRefresh,
                    useLoadMore: isUseLoadMore
                };
                this.pullRefreshStatus = _status.REFRESHSTATUS.PULL;
                this.loadMoreStatus = loadMoreStatus;
            }
        }

        /**
         * 滑块左上角顶点的坐标
         * */


        /**
         * 滑块滑动的方向
         * */


        /**
         * 滑块的样式缓存，用于提高效率
         * */


        /**
         * 放置置顶元素的数组
         * */


        /**
         * 当前显示的置顶元素的索引值
         * */


        /**
         * 置顶元素的偏移
         * */


        /**
         * 容器的偏移
         * */

    }, {
        key: 'render',


        /**
         * 渲染函数
         * */
        value: function render() {
            var _this6 = this;

            var _state = this.state,
                usePullRefresh = _state.usePullRefresh,
                useLoadMore = _state.useLoadMore;


            return _react2.default.createElement(
                'div',
                {
                    className: (0, _classnames2.default)('silk-listcontrol-wrapper', {
                        'silk-listcontrol-wrapper-default': this.scrollY && !this.props.containerClass
                    }, this.props.containerClass),
                    style: this.props.containerStyle,
                    ref: function ref(_ref5) {
                        _this6.wrapper = _ref5;
                    }
                },
                this.props.useSticky ? _react2.default.createElement('div', {
                    ref: function ref(_ref) {
                        _this6.stickyNode = _ref;
                    },
                    style: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 9999 },
                    className: 'silk-sticky'
                }) : null,
                _react2.default.createElement(
                    'div',
                    {
                        className: (0, _classnames2.default)('silk-listcontrol-scroller', {
                            'silk-listcontrol-scroller-horizontal': this.scrollX,
                            'silk-listcontrol-scroller-vertical': this.scrollY
                        }, this.props.scrollerClass),
                        style: this.props.scrollerStyle,
                        ref: function ref(_ref4) {
                            _this6.scroller = _ref4;
                        }
                    },
                    usePullRefresh ? _react2.default.createElement(
                        'div',
                        {
                            ref: function ref(_ref2) {
                                _this6.pullRefreshEl = _ref2;
                            },
                            className: 'silk-listcontrol-loadwrapper silk-listcontrol-loadwrapper-up'
                        },
                        _react2.default.createElement(
                            'div',
                            { className: 'silk-listcontrol-loadtip' },
                            _react2.default.createElement('i', { className: 'silk-listcontrol-icon' }),
                            _react2.default.createElement('div', { className: 'silk-listcontrol-text' })
                        )
                    ) : null,
                    this.props.children,
                    useLoadMore ? _react2.default.createElement(
                        'div',
                        {
                            ref: function ref(_ref3) {
                                _this6.loadMoreEl = _ref3;
                            },
                            className: 'silk-listcontrol-loadwrapper'
                        },
                        _react2.default.createElement(
                            'div',
                            { className: 'silk-listcontrol-loadtip' },
                            _react2.default.createElement('i', { className: 'silk-listcontrol-icon' }),
                            _react2.default.createElement('div', { className: 'silk-listcontrol-text' })
                        )
                    ) : null
                )
            );
        }
    }]);
    return Scroller;
}(_react.Component), _class.propTypes = {
    /**
     * 是否开启自动刷新属性
     * */
    autoRefresh: _react.PropTypes.bool,
    /**
     * 是否开启滑动到底部自动加载
     * */
    autoLoad: _react.PropTypes.bool,
    /**
     * 是否开启弹性滚动
     * */
    bounce: _react.PropTypes.bool,
    /**
     * 自定义的弹性动画
     * */
    bounceEasing: _react.PropTypes.shape({
        style: _react.PropTypes.string.isRequired,
        fn: _react.PropTypes.func.isRequired
    }),
    /**
     * 缓动时间
     * */
    bounceTime: _react.PropTypes.number,
    /**
     * 阻尼系数
     * */
    deceleration: _react.PropTypes.number,
    /**
     * 有时想要保留原生的垂直滚动，但是想要添加一个水平滚动的IScroll(例如：carousel), 可以把这个值设置为true，这样就可以响应
     * 水平方向的`swiper`，垂直滚动会滚动整个页面，同时也可以设置为`horizontal`或者`vertical`
     * */
    eventPassthrough: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string]),
    /**
     * 方向锁定阈值
     * */
    directionLockThreshold: _react.PropTypes.number,
    /**
     * 是否开启自由滚动，当设置为`false`时，只能响应一个方向的滚动，当设置为true时，可以同时横向和纵向滚动（`scrollX`和`scrollY`
     * 必须同时为true）
     * */
    freeScroll: _react.PropTypes.bool,
    /**
     * 当在屏幕上轻弹（flicks）时，是否开启动量
     * */
    momentum: _react.PropTypes.bool,
    /**
     * 是否开启硬件加速
     * */
    HWCompositing: _react.PropTypes.bool,
    /**
     * 是否阻止触发默认事件
     * */
    preventDefault: _react.PropTypes.bool,
    /**
     * 阻止除了该类事件的默认事件
     * */
    preventDefaultException: _react.PropTypes.shape({
        className: _react.PropTypes.instanceOf(RegExp),
        tagName: _react.PropTypes.instanceOf(RegExp)
    }),
    /**
     * 是否开启X轴滚动
     * */
    scrollX: _react.PropTypes.bool,
    /**
     * 是否开启Y轴滚动
     * */
    scrollY: _react.PropTypes.bool,
    /**
     * 是否使用transform
     * */
    useTransform: _react.PropTypes.bool,
    /**
     * 是否使用transition
     * */
    useTransition: _react.PropTypes.bool,
    /**
     * 开始滚动前的回调
     * */
    onBeforeScrollStart: _react.PropTypes.func,
    /**
     * 开始滚动回调
     * */
    onScrollStart: _react.PropTypes.func,
    /**
     * 滚动回调
     * */
    onScroll: _react.PropTypes.func,
    /**
     * 滚动结束回调
     * */
    onScrollEnd: _react.PropTypes.func,
    /**
     * 取消滚动回调
     * */
    onScrollCancel: _react.PropTypes.func,
    /**
     * 刷新回调
     * */
    onRefresh: _react.PropTypes.func,
    children: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.element]).isRequired,
    /**
     * 是否开启下拉刷新
     * */
    usePullRefresh: _react.PropTypes.bool,
    /**
     * 是否开启上拉加载更多
     * */
    useLoadMore: _react.PropTypes.bool,
    /**
     * 是否启用吸顶功能
     * */
    useSticky: _react.PropTypes.bool,
    /**
     * 下拉刷新函数
     * */
    pullRefreshAction: _react.PropTypes.func,
    /**
     * 上拉加载更多函数
     * */
    loadMoreAction: _react.PropTypes.func,
    /**
     * 下拉刷新提示区域的渲染函数，允许用户自定义下拉刷新区域
     * */
    renderPullRefresh: _react.PropTypes.func,
    /**
     * 上拉加载更多区域的渲染函数, 允许用户自定义上拉加载更多区域
     * */
    renderLoadMore: _react.PropTypes.func,
    /**
     * 多语言
     * */
    lang: _react.PropTypes.string,
    /**
     * 容器额外class 用于用户自定义容器样式
     * */
    containerClass: _react.PropTypes.string,
    /**
     * 容器额外style 用于用户自定义容器样式
     * */
    containerStyle: _react.PropTypes.shape({}),
    /**
     * 滑块额外class 用于用户自定义滑块的样式
     * */
    scrollerClass: _react.PropTypes.string,
    /**
     * 滑块额外style 用于用户自定义滑块的样式
     * */
    scrollerStyle: _react.PropTypes.shape({}),
    /**
     * 是否还有更多数据
     * */
    noMoreData: _react.PropTypes.bool,
    click: _react.PropTypes.bool
}, _class.defaultProps = {
    autoRefresh: true,
    autoLoad: true,
    bounce: true,
    bounceEasing: _utils2.default.ease.circular,
    bounceTime: 600,
    deceleration: 0.0024,
    directionLockThreshold: 0,
    freeScroll: false,
    momentum: true,
    HWCompositing: true,
    preventDefault: true,
    preventDefaultException: {
        tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
    },
    scrollX: false,
    scrollY: true,
    containerStyle: {},
    scrollerStyle: {},
    containerClass: '',
    scrollerClass: '',
    useTransform: true,
    useTransition: true,
    usePullRefresh: false,
    useLoadMore: false,
    useSticky: false,
    click: false,
    lang: 'zh_CN'
}, _class.childContextTypes = {
    scroller: _react.PropTypes.object
}, _temp);
exports.default = Scroller;