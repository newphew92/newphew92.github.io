'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});
exports.BigX = exports.NavBar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.organizeGroups = organizeGroups;
exports.extractUrlExtension = extractUrlExtension;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavBar = exports.NavBar = function (_React$Component) {
		_inherits(NavBar, _React$Component);

		function NavBar() {
				_classCallCheck(this, NavBar);

				return _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).apply(this, arguments));
		}

		_createClass(NavBar, [{
				key: 'render',
				value: function render() {
						return _react2.default.createElement(
								'nav',
								{ id: 'mainNav', style: { backgroundColor: "#F29924" }, className: 'navbar navbar-default navbar-fixed-top navbar-custom' },
								_react2.default.createElement(
										'div',
										{ className: 'container' },
										_react2.default.createElement(
												'div',
												{ className: 'navbar-header page-scroll' },
												_react2.default.createElement(
														_reactBootstrap.Button,
														{ className: 'navbar-toggle', 'data-toggle': 'collapse', 'data-target': '#bs-example-navbar-collapse-1' },
														_react2.default.createElement(
																'span',
																{ className: 'sr-only' },
																'Toggle Navigation'
														),
														' Menu ',
														_react2.default.createElement('i', { className: 'fa fa-bars' })
												),
												_react2.default.createElement(
														'a',
														{ className: 'navbar-brand', href: '#page-top' },
														'Terrence Ko'
												)
										),
										_react2.default.createElement(
												'div',
												{ className: 'collapse navbar-collapse', id: 'bs-example-navbar-collapse-1' },
												_react2.default.createElement(
														'ul',
														{ className: 'nav navbar-nav navbar-right' },
														_react2.default.createElement(
																'li',
																{ className: 'hidden' },
																_react2.default.createElement('a', { href: '#page-top' })
														),
														[_react2.default.createElement(
																'a',
																{ href: '#portfolio' },
																'Portfolio'
														), _react2.default.createElement(
																'a',
																{ href: '#about' },
																'About'
														), _react2.default.createElement(
																'a',
																{ href: '/blog' },
																'Blog'
														), _react2.default.createElement(
																'a',
																{ href: '#contact' },
																'Contact'
														)].map(function (e, i) {
																return _react2.default.createElement(
																		'li',
																		{ key: i, className: 'page-scroll' },
																		e
																);
														})
												)
										)
								)
						);
				}
		}]);

		return NavBar;
}(_react2.default.Component);

;

var BigX = exports.BigX = function (_React$Component2) {
		_inherits(BigX, _React$Component2);

		function BigX() {
				_classCallCheck(this, BigX);

				return _possibleConstructorReturn(this, (BigX.__proto__ || Object.getPrototypeOf(BigX)).apply(this, arguments));
		}

		_createClass(BigX, [{
				key: 'render',
				value: function render() {
						return _react2.default.createElement(
								'div',
								{ className: 'close-modal', onClick: this.props.handleClick },
								_react2.default.createElement(
										'div',
										{ className: 'lr' },
										_react2.default.createElement('div', { className: 'rl' })
								)
						);
				}
		}]);

		return BigX;
}(_react2.default.Component);

function organizeGroups(list, rowLength) {
		var cols = [];var rows = [];
		for (var i = 1; i <= list.length; i++) {
				cols = cols.concat(list[i - 1]);
				if (i % rowLength === 0 || i === list.length) {
						rows = rows.concat([cols]);
						cols = [];
				}
		}
		return rows;
}

function extractUrlExtension() {
		var url = window.location.href.split("/");
		return url[url.length - 1].replace(/[#]/, "");
}