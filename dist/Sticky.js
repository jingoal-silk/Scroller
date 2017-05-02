webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _getPrototypeOf = __webpack_require__(1);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(27);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(28);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(32);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(79);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _promise = __webpack_require__(87);

	var _promise2 = _interopRequireDefault(_promise);

	var _react = __webpack_require__(103);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(130);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _Scroller = __webpack_require__(269);

	var _Scroller2 = _interopRequireDefault(_Scroller);

	var _Sticky = __webpack_require__(286);

	var _Sticky2 = _interopRequireDefault(_Sticky);

	var _componentListSticky = __webpack_require__(287);

	var _componentListSticky2 = _interopRequireDefault(_componentListSticky);

	__webpack_require__(288);

	__webpack_require__(290);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ajax = function ajax() {
	    return new _promise2.default(function (resolve) {
	        setTimeout(function () {
	            resolve(_componentListSticky2.default);
	        }, 500);
	    });
	};

	var Example = function (_React$Component) {
	    (0, _inherits3.default)(Example, _React$Component);

	    function Example(props) {
	        (0, _classCallCheck3.default)(this, Example);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (Example.__proto__ || (0, _getPrototypeOf2.default)(Example)).call(this, props));

	        _this.state = {
	            groups: []
	        };

	        _this.titleIndex = 0;

	        _this.fetchData = _this.fetchData.bind(_this);

	        _this.pullRefreshAction = _this.pullRefreshAction.bind(_this);
	        _this.loadMoreAction = _this.loadMoreAction.bind(_this);

	        _this.getContent = _this.getContent.bind(_this);
	        return _this;
	    }

	    (0, _createClass3.default)(Example, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.fetchData('refresh');
	        }

	        /**
	         * 获取列表内容
	         * */

	    }, {
	        key: 'getContent',
	        value: function getContent(group) {
	            var itemIndex = 1;
	            return _react2.default.createElement(
	                'ul',
	                null,
	                group.items.map(function (item) {
	                    return _react2.default.createElement(
	                        'li',
	                        {
	                            key: 'list-sticky-' + itemIndex,
	                            className: 'list-sticky list-sticky-item'
	                        },
	                        itemIndex++ + '. ' + item
	                    );
	                })
	            );
	        }

	        /**
	         * 获取组内容
	         * */

	    }, {
	        key: 'getGroup',
	        value: function getGroup() {
	            var _this2 = this;

	            return _react2.default.createElement(
	                'ul',
	                null,
	                this.state.groups.map(function (group) {
	                    return _react2.default.createElement(
	                        'li',
	                        { key: 'list-stick-' + _this2.titleIndex++ },
	                        _react2.default.createElement(
	                            _Sticky2.default,
	                            null,
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'list-sticky list-sticky-title' },
	                                group.title
	                            )
	                        ),
	                        _this2.getContent(group)
	                    );
	                })
	            );
	        }

	        /**
	         * 获取数据
	         * */

	    }, {
	        key: 'fetchData',
	        value: function fetchData(type, resolve, reject) {
	            var _this3 = this;

	            ajax({
	                url: 'component.list.sticky',
	                type: 'GET',
	                headers: {
	                    'Content-Type': 'application/x-www-form-urlencoded',
	                    'gw-rest-action': 'component.list.sticky'
	                }
	            }).then(function (data) {
	                if (resolve) {
	                    resolve();
	                }

	                var groups = data.value.groups;

	                _this3.setState({
	                    groups: type === 'refresh' ? groups : _this3.state.groups.concat(groups)
	                });
	            }).catch(function () {
	                if (reject) {
	                    reject();
	                }
	            });
	        }

	        /**
	         * 下拉刷新动作
	         * */

	    }, {
	        key: 'pullRefreshAction',
	        value: function pullRefreshAction(resolve, reject) {
	            this.fetchData('refresh', resolve, reject);
	        }

	        /**
	         * 上拉加载更多动作
	         * */

	    }, {
	        key: 'loadMoreAction',
	        value: function loadMoreAction(resolve, reject) {
	            this.fetchData('load', resolve, reject);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                _Scroller2.default,
	                {
	                    usePullRefresh: true,
	                    pullRefreshAction: this.pullRefreshAction,
	                    useLoadMore: true,
	                    loadMoreAction: this.loadMoreAction,
	                    useSticky: true,
	                    onScroll: function onScroll() {}
	                },
	                this.getGroup()
	            );
	        }
	    }]);
	    return Example;
	}(_react2.default.Component);

	_reactDom2.default.render(_react2.default.createElement(Example, null), document.getElementById('root'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	module.exports = __webpack_require__(14).Object.getPrototypeOf;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(4)
	  , $getPrototypeOf = __webpack_require__(6);

	__webpack_require__(12)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(5);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(7)
	  , toObject    = __webpack_require__(4)
	  , IE_PROTO    = __webpack_require__(8)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(9)('keys')
	  , uid    = __webpack_require__(11);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(10)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 11 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(13)
	  , core    = __webpack_require__(14)
	  , fails   = __webpack_require__(23);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(10)
	  , core      = __webpack_require__(14)
	  , ctx       = __webpack_require__(15)
	  , hide      = __webpack_require__(17)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 14 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(16);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(18)
	  , createDesc = __webpack_require__(26);
	module.exports = __webpack_require__(22) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(19)
	  , IE8_DOM_DEFINE = __webpack_require__(21)
	  , toPrimitive    = __webpack_require__(25)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(22) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(22) && !__webpack_require__(23)(function(){
	  return Object.defineProperty(__webpack_require__(24)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(23)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20)
	  , document = __webpack_require__(10).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(20);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(29);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(30), __esModule: true };

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(31);
	var $Object = __webpack_require__(14).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(13);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(22), 'Object', {defineProperty: __webpack_require__(18).f});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(33);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(34);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(63);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(35), __esModule: true };

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(36);
	__webpack_require__(58);
	module.exports = __webpack_require__(62).f('iterator');

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(37)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(39)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(38)
	  , defined   = __webpack_require__(5);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(40)
	  , $export        = __webpack_require__(13)
	  , redefine       = __webpack_require__(41)
	  , hide           = __webpack_require__(17)
	  , has            = __webpack_require__(7)
	  , Iterators      = __webpack_require__(42)
	  , $iterCreate    = __webpack_require__(43)
	  , setToStringTag = __webpack_require__(56)
	  , getPrototypeOf = __webpack_require__(6)
	  , ITERATOR       = __webpack_require__(57)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17);

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(44)
	  , descriptor     = __webpack_require__(26)
	  , setToStringTag = __webpack_require__(56)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(17)(IteratorPrototype, __webpack_require__(57)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(19)
	  , dPs         = __webpack_require__(45)
	  , enumBugKeys = __webpack_require__(54)
	  , IE_PROTO    = __webpack_require__(8)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(24)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(55).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(18)
	  , anObject = __webpack_require__(19)
	  , getKeys  = __webpack_require__(46);

	module.exports = __webpack_require__(22) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(47)
	  , enumBugKeys = __webpack_require__(54);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(7)
	  , toIObject    = __webpack_require__(48)
	  , arrayIndexOf = __webpack_require__(51)(false)
	  , IE_PROTO     = __webpack_require__(8)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(49)
	  , defined = __webpack_require__(5);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(50);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 50 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(48)
	  , toLength  = __webpack_require__(52)
	  , toIndex   = __webpack_require__(53);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(38)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(38)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(10).document && document.documentElement;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(18).f
	  , has = __webpack_require__(7)
	  , TAG = __webpack_require__(57)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(9)('wks')
	  , uid        = __webpack_require__(11)
	  , Symbol     = __webpack_require__(10).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(59);
	var global        = __webpack_require__(10)
	  , hide          = __webpack_require__(17)
	  , Iterators     = __webpack_require__(42)
	  , TO_STRING_TAG = __webpack_require__(57)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(60)
	  , step             = __webpack_require__(61)
	  , Iterators        = __webpack_require__(42)
	  , toIObject        = __webpack_require__(48);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(39)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(57);

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(64), __esModule: true };

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(65);
	__webpack_require__(76);
	__webpack_require__(77);
	__webpack_require__(78);
	module.exports = __webpack_require__(14).Symbol;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(10)
	  , has            = __webpack_require__(7)
	  , DESCRIPTORS    = __webpack_require__(22)
	  , $export        = __webpack_require__(13)
	  , redefine       = __webpack_require__(41)
	  , META           = __webpack_require__(66).KEY
	  , $fails         = __webpack_require__(23)
	  , shared         = __webpack_require__(9)
	  , setToStringTag = __webpack_require__(56)
	  , uid            = __webpack_require__(11)
	  , wks            = __webpack_require__(57)
	  , wksExt         = __webpack_require__(62)
	  , wksDefine      = __webpack_require__(67)
	  , keyOf          = __webpack_require__(68)
	  , enumKeys       = __webpack_require__(69)
	  , isArray        = __webpack_require__(72)
	  , anObject       = __webpack_require__(19)
	  , toIObject      = __webpack_require__(48)
	  , toPrimitive    = __webpack_require__(25)
	  , createDesc     = __webpack_require__(26)
	  , _create        = __webpack_require__(44)
	  , gOPNExt        = __webpack_require__(73)
	  , $GOPD          = __webpack_require__(75)
	  , $DP            = __webpack_require__(18)
	  , $keys          = __webpack_require__(46)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(74).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(71).f  = $propertyIsEnumerable;
	  __webpack_require__(70).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(40)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(17)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(11)('meta')
	  , isObject = __webpack_require__(20)
	  , has      = __webpack_require__(7)
	  , setDesc  = __webpack_require__(18).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(23)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(10)
	  , core           = __webpack_require__(14)
	  , LIBRARY        = __webpack_require__(40)
	  , wksExt         = __webpack_require__(62)
	  , defineProperty = __webpack_require__(18).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(46)
	  , toIObject = __webpack_require__(48);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(46)
	  , gOPS    = __webpack_require__(70)
	  , pIE     = __webpack_require__(71);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 70 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 71 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(50);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(48)
	  , gOPN      = __webpack_require__(74).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(47)
	  , hiddenKeys = __webpack_require__(54).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(71)
	  , createDesc     = __webpack_require__(26)
	  , toIObject      = __webpack_require__(48)
	  , toPrimitive    = __webpack_require__(25)
	  , has            = __webpack_require__(7)
	  , IE8_DOM_DEFINE = __webpack_require__(21)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(22) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 76 */
/***/ function(module, exports) {

	

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(67)('asyncIterator');

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(67)('observable');

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(80);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(84);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(33);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(82);
	module.exports = __webpack_require__(14).Object.setPrototypeOf;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(13);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(83).set});

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(20)
	  , anObject = __webpack_require__(19);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(15)(Function.call, __webpack_require__(75).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(86);
	var $Object = __webpack_require__(14).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(13)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(44)});

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(76);
	__webpack_require__(36);
	__webpack_require__(58);
	__webpack_require__(89);
	module.exports = __webpack_require__(14).Promise;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(40)
	  , global             = __webpack_require__(10)
	  , ctx                = __webpack_require__(15)
	  , classof            = __webpack_require__(90)
	  , $export            = __webpack_require__(13)
	  , isObject           = __webpack_require__(20)
	  , aFunction          = __webpack_require__(16)
	  , anInstance         = __webpack_require__(91)
	  , forOf              = __webpack_require__(92)
	  , speciesConstructor = __webpack_require__(96)
	  , task               = __webpack_require__(97).set
	  , microtask          = __webpack_require__(99)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;

	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(57)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(100)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(56)($Promise, PROMISE);
	__webpack_require__(101)(PROMISE);
	Wrapper = __webpack_require__(14)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(102)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(50)
	  , TAG = __webpack_require__(57)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 91 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(15)
	  , call        = __webpack_require__(93)
	  , isArrayIter = __webpack_require__(94)
	  , anObject    = __webpack_require__(19)
	  , toLength    = __webpack_require__(52)
	  , getIterFn   = __webpack_require__(95)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(19);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(42)
	  , ITERATOR   = __webpack_require__(57)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(90)
	  , ITERATOR  = __webpack_require__(57)('iterator')
	  , Iterators = __webpack_require__(42);
	module.exports = __webpack_require__(14).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(19)
	  , aFunction = __webpack_require__(16)
	  , SPECIES   = __webpack_require__(57)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(15)
	  , invoke             = __webpack_require__(98)
	  , html               = __webpack_require__(55)
	  , cel                = __webpack_require__(24)
	  , global             = __webpack_require__(10)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(50)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 98 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(10)
	  , macrotask = __webpack_require__(97).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(50)(process) == 'process';

	module.exports = function(){
	  var head, last, notify;

	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };

	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(17);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(10)
	  , core        = __webpack_require__(14)
	  , dP          = __webpack_require__(18)
	  , DESCRIPTORS = __webpack_require__(22)
	  , SPECIES     = __webpack_require__(57)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(57)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;

	var _promise = __webpack_require__(87);

	var _promise2 = _interopRequireDefault(_promise);

	var _getPrototypeOf = __webpack_require__(1);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(27);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(28);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(32);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(79);

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

	var _react = __webpack_require__(103);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(130);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _classnames = __webpack_require__(270);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _utils = __webpack_require__(271);

	var _utils2 = _interopRequireDefault(_utils);

	var _icons = __webpack_require__(272);

	var _icons2 = _interopRequireDefault(_icons);

	var _status = __webpack_require__(273);

	var _lang = __webpack_require__(274);

	__webpack_require__(278);

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
	            if (prevState.useLoadMore !== this.state.useLoadMore) {
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
	                this.loadMoreEl.style.visibility = this.scrollerHeight > this.wrapperWidth ? 'visible' : 'hidden';
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
	    noMoreData: _react.PropTypes.bool
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
	    lang: 'zh_CN'
	}, _class.childContextTypes = {
	    scroller: _react.PropTypes.object
	}, _temp);
	exports.default = Scroller;

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof2 = __webpack_require__(33);

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
	 * 取消动画执行
	 * */
	var cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.clearTimeout;

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
	    requestAnimationFrame: requestAnimationFrame,
	    cancelAnimationFrame: cancelAnimationFrame
	};

	exports.default = utils;

/***/ },
/* 272 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @file icons.js
	 * @author liyang@jingoal.com
	 *
	 * 图标
	 * */

	var icons = {
	  downArrow: '&#xe601;',
	  upArrow: '&#xe609;',
	  loading: '&#xe602;',
	  success: '&#xe62e;',
	  error: '&#xe697;'
	};

	exports.default = icons;

/***/ },
/* 273 */
/***/ function(module, exports) {

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

/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getMessage = getMessage;
	exports.getLocale = getLocale;

	var _zh_CN = __webpack_require__(275);

	var _zh_CN2 = _interopRequireDefault(_zh_CN);

	var _zh_TW = __webpack_require__(276);

	var _zh_TW2 = _interopRequireDefault(_zh_TW);

	var _en_US = __webpack_require__(277);

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

/***/ },
/* 275 */
/***/ function(module, exports) {

	module.exports = {
		"pullDownToRefresh": "下拉刷新",
		"releaseToRefresh": "松开刷新",
		"refreshSuccess": "刷新成功",
		"refreshFailed": "刷新失败",
		"pullupToLoadMore": "上拉加载更多",
		"releaseToLoadMore": "松开加载更多",
		"loadMoreSuccess": "加载成功",
		"loadMoreFailed": "加载失败",
		"noMoreData": "没有更多数据了",
		"pushNoticy": "有新的变更，请下拉刷新",
		"loading": "加载中..."
	};

/***/ },
/* 276 */
/***/ function(module, exports) {

	module.exports = {
		"pullDownToRefresh": "下拉刷新",
		"releaseToRefresh": "松開刷新",
		"refreshSuccess": "刷新成功",
		"refreshFailed": "刷新失敗",
		"pullupToLoadMore": "上拉加載更多",
		"releaseToLoadMore": "松開加載更多",
		"loadMoreSuccess": "加載成功",
		"loadMoreFailed": "加載失敗",
		"noMoreData": "沒有更多數據了",
		"pushNoticy": "有新的變更，請下拉刷新",
		"loading": "加載中..."
	};

/***/ },
/* 277 */
/***/ function(module, exports) {

	module.exports = {
		"pullDownToRefresh": "Pull down to refresh",
		"releaseToRefresh": "Release",
		"refreshSuccess": "Successful refresh",
		"refreshFailed": "Failed to refresh",
		"pullupToLoadMore": "Pull up to load more",
		"releaseToLoadMore": "Release",
		"loadMoreSuccess": "Successful loading",
		"loadMoreFailed": "Failed to load",
		"noMoreData": "No more content",
		"pushNoticy": "New updates, pull down to refresh",
		"loading": "Loading…"
	};

/***/ },
/* 278 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;

	var _getPrototypeOf = __webpack_require__(1);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(27);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(28);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(32);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(79);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _class, _temp; /**
	                    * @file Sticky.jsx
	                    * @author liyang@jingoal.com
	                    * @desc
	                    *      吸顶效果
	                    * */

	var _react = __webpack_require__(103);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(130);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _utils = __webpack_require__(271);

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

/***/ },
/* 287 */
/***/ function(module, exports) {

	module.exports = {
		"code": 0,
		"msg": "success",
		"value": {
			"componentCode": 0,
			"componentMsg": "success",
			"groups": [
				{
					"title": "水浒传",
					"items": [
						"天魁星呼保义宋江",
						"天罡星玉麒麟卢俊义",
						"天机星智多星吴用",
						"天闲星入云龙公孙胜",
						"天勇星大刀关胜"
					]
				},
				{
					"title": "西游记",
					"items": [
						"旃檀功德佛唐僧",
						"斗战胜佛孙悟空",
						"净坛使者猪八戒",
						"金身罗汉沙悟净",
						"八部天龙白龙马",
						"观世音菩萨",
						"菩提祖师",
						"玉皇大帝",
						"王母娘娘",
						"太上老君",
						"南极仙翁",
						"镇元大仙",
						"如来佛祖",
						"二郎真君",
						"托塔天王",
						"红孩儿",
						"牛魔王",
						"嫦娥",
						"玉兔精",
						"金角大王",
						"银角大王"
					]
				},
				{
					"title": "三国演义",
					"items": [
						"桃源三结义",
						"三英战吕布",
						"煮酒论英雄",
						"温酒斩华雄",
						"吕布戏貂蝉",
						"星陨五丈原"
					]
				},
				{
					"title": "红楼梦",
					"items": [
						"甄士隐梦幻识通灵 贾雨村风尘怀闺秀",
						"贾夫人仙逝扬州城 冷子兴演说荣国府",
						"贾雨村夤缘复旧职 林黛玉抛父进京都",
						"薄命女偏逢薄命郎 葫芦僧乱判葫芦案",
						"游幻境指迷十二钗 饮仙醪曲演红楼梦",
						"贾宝玉初试云雨情 刘姥姥一进荣国府",
						"送宫花贾琏戏熙凤 宴宁府宝玉会秦钟",
						"比通灵金莺微露意 探宝钗黛玉半含酸",
						"恋风流情友入家塾 起嫌疑顽童闹学堂",
						"金寡妇贪利权受辱 张太医论病细穷源",
						"庆寿辰宁府排家宴 见熙凤贾瑞起淫心",
						"王熙凤毒设相思局 贾天祥正照风月鉴",
						"秦可卿死封龙禁尉 王熙凤协理宁国府",
						"林如海捐馆扬州城 贾宝玉路谒北静王",
						"王凤姐弄权铁槛寺 秦鲸卿得趣馒头庵",
						"贾元春才选凤藻宫 秦鲸卿夭逝黄泉路",
						"大观园试才题对额 荣国府归省庆元宵",
						"隔珠帘父女勉忠勤 搦湘管姊弟裁题咏",
						"情切切良宵花解语 意绵绵静日玉生香",
						"王熙凤正言弹妒意 林黛玉俏语谑娇音",
						"贤袭人娇嗔箴宝玉 俏平儿软语救贾琏",
						"听曲文宝玉悟禅机 制灯迷贾政悲谶语"
					]
				}
			]
		}
	};

/***/ },
/* 288 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 289 */,
/* 290 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);