'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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
                    * @file Sticky.jsx
                    * @author liyang@jingoal.com
                    * @desc
                    *      吸顶效果
                    * */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sticky = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(Sticky, _Component);

    function Sticky() {
        (0, _classCallCheck3.default)(this, Sticky);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Sticky.__proto__ || (0, _getPrototypeOf2.default)(Sticky)).call(this));

        _this.domNode = null;
        _this.height = null;
        _this.offsetTop = null;
        _this.className = null;
        return _this;
    }

    (0, _createClass3.default)(Sticky, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.scroller = this.context.scroller;

            if (this.scroller) {
                this.initialize();
                this.scroller.stickyHeaders.push(this);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.initialize();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var _this2 = this;

            if (this.scroller) {
                this.scroller.stickyHeaders = this.scroller.stickyHeaders.filter(function (header) {
                    return header !== _this2;
                });
            }
        }
    }, {
        key: 'initialize',
        value: function initialize() {
            this.domNode = _reactDom2.default.findDOMNode(this); // eslint-disable-line react/no-find-dom-node
            this.height = this.domNode.offsetHeight;
            this.offsetTop = -_utils2.default.offset(this.domNode).top;
            this.className = this.domNode.className;
            this.onlyChild = _react2.default.Children.only(this.props.children);
            this.stickyExtraClass = this.props.stickyExtraClass;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.Children.only(this.props.children);
        }
    }]);
    return Sticky;
}(_react.Component), _class.propTypes = {
    stickyExtraClass: _react.PropTypes.string,
    children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string])
}, _class.defaultProps = {
    stickyExtraClass: ''
}, _class.contextTypes = {
    scroller: _react.PropTypes.object
}, _temp);
exports.default = Sticky;