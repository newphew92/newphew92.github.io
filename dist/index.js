'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _reactBootstrap2 = _interopRequireDefault(_reactBootstrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavBar = _react2.default.createClass({
	displayName: 'NavBar',
	getInitialState: function getInitialState() {},
	render: function render() {
		var B = _reactBootstrap2.default,
		    Button = B.Button;
		return _react2.default.createElement(
			'nav',
			{ id: 'mainNav', className: 'navbar navbar-default navbar-fixed-top navbar-custom' },
			_react2.default.createElement(
				'div',
				{ className: 'container' },
				_react2.default.createElement(
					Button,
					{ className: 'navbar-toggle' },
					_react2.default.createElement(
						Span,
						{ className: 'sr-only' },
						'Toggle Navigation'
					)
				)
			)
		);
	}
});

var Home = _react2.default.createClass({
	displayName: 'Home',
	getInitialState: function getInitialState() {
		return {
			language: ENGLISH,
			selection: 'english'
		};
	},
	handleChange: function handleChange(stateName) {
		return function (event) {
			var state = {};
			state[stateName] = event.target ? event.target.value : event;
			this.setState(state);
		}.bind(this);
	},
	handleLanguage: function handleLanguage() {
		switch (this.state.selection) {
			case 'english':
				this.setState({ selection: 'french', language: FRENCH });
				break;
			case 'french':
				this.setState({ selection: 'english', language: ENGLISH });
				break;
			default:
				this.setState({ selection: 'english', language: ENGLISH });
		}
	},
	render: function render() {
		return _react2.default.createElement(
			'div',
			null,
			'Testing'
		);
	}
});
ReactDOM.render(_react2.default.createElement(Home, null), document.getElementById('content'));