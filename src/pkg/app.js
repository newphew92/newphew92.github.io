'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _appLib = require('./appLib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DATA;
$.ajaxSetup({
	async: false,
	cache: false
});
$.getJSON("../text/english.json" + '?', { cache: false }, function () {}).done(function (data) {
	DATA = data;
}).fail(function (d, textStatus, error) {
	console.error("getJSON failed, status: " + textStatus + ", error: " + error);
}).always(function () {});

var View = _react2.default.createClass({
	displayName: 'View',
	getInitialState: function getInitialState() {
		return {
			screen: "main",
			focusPanel: undefined
		};
	},
	componentWillMount: function componentWillMount() {
		var path = (0, _appLib.extractUrlExtension)();
		if (!path) {
			path = "main";
		}
		this.setState({ focusPanel: path });
		// console.log(/.+?(?=\#)/.exec(url))
		console.log(path);
	},
	renderMain: function renderMain() {
		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(Main, { data: DATA.home }),
			_react2.default.createElement(CV, { data: DATA.CV, processModalOpen: this.state.focusPanel === DATA.CV.title }),
			_react2.default.createElement(Portfolio, { data: DATA.portfolio, focusPanel: this.state.focusPanel })
		);
	},
	renderBlog: function renderBlog() {
		return _react2.default.createElement(BlogMenu, { data: DATA.blog });
	},
	render: function render() {
		var screen = {
			"main": this.renderMain(),
			"blog": this.renderBlog()
		};
		return screen[this.state.screen];
	}
});
var Main = _react2.default.createClass({
	displayName: 'Main',
	getInitialState: function getInitialState() {
		return {
			home: undefined
		};
	},
	componentWillMount: function componentWillMount() {
		this.setState({
			home: this.props.data
		});
	},
	handleChange: function handleChange(stateName) {
		return function (event) {
			var state = {};
			state[stateName] = event.target ? event.target.value : event;
			this.setState(state);
		}.bind(this);
	},
	render: function render() {
		var homeText = this.state.home;
		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				'header',
				null,
				_react2.default.createElement(
					'div',
					{ className: 'container' },
					_react2.default.createElement(
						_reactBootstrap.Row,
						null,
						_react2.default.createElement(
							_reactBootstrap.Col,
							{ lg: 12 },
							_react2.default.createElement('img', { className: 'img-responsive', src: 'img/profile.jpg', alt: '' }),
							_react2.default.createElement(
								'div',
								{ className: 'intro-text' },
								_react2.default.createElement(
									'span',
									{ className: 'name' },
									'Terrence Ko'
								),
								_react2.default.createElement('hr', { className: 'star-light' }),
								_react2.default.createElement(
									'span',
									{ className: 'skills' },
									homeText.occupation
								)
							)
						)
					)
				)
			),
			_react2.default.createElement(
				'h1',
				null,
				homeText.title
			),
			_react2.default.createElement(
				'p',
				null,
				homeText.aboutMe
			)
		);
	}
});

var CV = _react2.default.createClass({
	displayName: 'CV',
	getInitialState: function getInitialState() {
		return {
			data: undefined,
			processModalOpen: undefined
		};
	},
	componentWillMount: function componentWillMount() {
		this.setState({
			data: this.props.data,
			processModalOpen: this.props.modalOpen
		});
	},
	handleToggle: function handleToggle() {
		this.setState({ processModalOpen: !this.state.processModalOpen });
	},
	renderProcessModal: function renderProcessModal(show) {
		return _react2.default.createElement(
			_reactBootstrap.Modal,
			{ title: this.state.data.title, onHide: this.handleToggle, show: show, className: 'portfolio-modal modal', tabIndex: '-1', role: 'dialog' },
			_react2.default.createElement(_appLib.BigX, { handleClick: this.handleToggle }),
			_react2.default.createElement(
				_reactBootstrap.Row,
				null,
				_react2.default.createElement(
					_reactBootstrap.Col,
					{ lg: 12 },
					_react2.default.createElement(
						_reactBootstrap.Modal.Body,
						null,
						_react2.default.createElement(
							_reactBootstrap.Button,
							{ onClick: this.handleToggle },
							_react2.default.createElement('i', { className: 'fa fa-times' }),
							' Close'
						)
					)
				)
			)
		);
	},
	render: function render() {
		return _react2.default.createElement(
			'div',
			{ className: 'container' },
			_react2.default.createElement(
				_reactBootstrap.Row,
				null,
				_react2.default.createElement(
					_reactBootstrap.Col,
					{ lg: 12, style: { textAlign: "center" } },
					_react2.default.createElement(
						'h2',
						null,
						_react2.default.createElement('a', { href: "#" + this.state.data.title.replace(/[" "]/g, ""), className: 'portfolio-link', onClick: this.handleToggle })
					),
					_react2.default.createElement('hr', { className: 'star-primary' })
				)
			),
			this.renderProcessModal(this.state.processModalOpen)
		);
	}
});

var Portfolio = _react2.default.createClass({
	displayName: 'Portfolio',
	getInitialState: function getInitialState() {
		return {
			data: undefined,
			focusPanel: undefined
		};
	},
	componentWillMount: function componentWillMount() {
		this.setState({
			data: this.props.data,
			focusPanel: this.props.focusPanel
		});
		console.log(this.props.focusPanel);
	},
	render: function render() {
		var _this = this;

		return _react2.default.createElement(
			'section',
			{ id: 'portfolio' },
			_react2.default.createElement(
				'div',
				{ className: 'container' },
				_react2.default.createElement(
					_reactBootstrap.Row,
					null,
					_react2.default.createElement(
						_reactBootstrap.Col,
						{ lg: 12, style: { textAlign: "center" } },
						_react2.default.createElement(
							'h2',
							null,
							this.state.data.title
						),
						_react2.default.createElement('hr', { className: 'star-primary' })
					)
				),
				(0, _appLib.organizeGroups)(Object.keys(this.state.data.personalProjects), 3).map(function (e, i) {
					return _react2.default.createElement(
						_reactBootstrap.Row,
						{ key: i },
						e.map(function (e, i) {
							return _react2.default.createElement(Project, { modalOpen: _this.state.data.personalProjects[e].title.replace(/[" "]/g, "") === _this.state.focusPanel, key: i, project: _this.state.data.personalProjects[e] });
						})
					);
				})
			)
		);
	}
});

var ProjectInfo = _react2.default.createClass({
	displayName: 'ProjectInfo',
	render: function render() {
		return _react2.default.createElement(
			'ul',
			{ className: 'list-inline item-details' },
			_react2.default.createElement(
				'li',
				null,
				'Github:',
				_react2.default.createElement(
					'strong',
					null,
					_react2.default.createElement(
						'a',
						{ href: this.props.nameURL },
						this.props.name
					)
				)
			),
			_react2.default.createElement(
				'li',
				null,
				'Date:',
				_react2.default.createElement(
					'strong',
					null,
					this.props.date
				)
			)
		);
	}
});

var Project = _react2.default.createClass({
	displayName: 'Project',
	getInitialState: function getInitialState() {
		return {
			processModalOpen: false,
			project: {}
		};
	},
	componentWillMount: function componentWillMount() {
		this.setState({
			processModalOpen: this.props.modalOpen,
			project: this.props.project
		});
	},
	handleToggle: function handleToggle() {
		this.setState({ processModalOpen: !this.state.processModalOpen });
	},
	renderProcessModal: function renderProcessModal(show) {
		return _react2.default.createElement(
			_reactBootstrap.Modal,
			{ title: this.state.project.title, onHide: this.handleToggle, show: show, className: 'portfolio-modal modal', tabIndex: '-1', role: 'dialog' },
			_react2.default.createElement(_appLib.BigX, { handleClick: this.handleToggle }),
			_react2.default.createElement(
				_reactBootstrap.Row,
				null,
				_react2.default.createElement(
					_reactBootstrap.Col,
					{ lg: 8, lgOffset: 2 },
					_react2.default.createElement(
						_reactBootstrap.Modal.Body,
						null,
						_react2.default.createElement(
							'h2',
							null,
							this.state.project.title
						),
						_react2.default.createElement('hr', { className: 'star-primary' }),
						_react2.default.createElement('img', { src: this.state.project.image, className: 'img-responsive img-centered', alt: '' }),
						_react2.default.createElement(
							'p',
							null,
							this.state.project.content
						),
						_react2.default.createElement(ProjectInfo, { name: this.state.project.title, nameURL: this.state.project.url, date: this.state.project.date }),
						_react2.default.createElement(
							_reactBootstrap.Button,
							{ onClick: this.handleToggle },
							_react2.default.createElement('i', { className: 'fa fa-times' }),
							' Close'
						)
					)
				)
			)
		);
	},
	render: function render() {
		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				_reactBootstrap.Col,
				{ sm: 4, className: 'portfolio-item' },
				_react2.default.createElement(
					'a',
					{ href: "#" + this.state.project.title.replace(/[" "]/g, ""), className: 'portfolio-link', onClick: this.handleToggle },
					_react2.default.createElement(
						'div',
						{ className: 'caption' },
						_react2.default.createElement(
							'div',
							{ className: 'caption-content' },
							_react2.default.createElement('i', { className: 'fa fa-search-plus fa-3x' })
						)
					),
					_react2.default.createElement('img', { src: this.state.project.image, className: 'img-responsive', alt: '' })
				)
			),
			this.renderProcessModal(this.state.processModalOpen)
		);
	}
});

var BlogMenu = _react2.default.createClass({
	displayName: 'BlogMenu',
	getInitialState: function getInitialState() {
		return {
			data: undefined
		};
	},
	componentWillMount: function componentWillMount() {
		this.setState({
			data: this.props.data
		});
	},
	render: function render() {
		var _this2 = this;

		return _react2.default.createElement(
			'div',
			null,
			Object.keys(this.state.data).map(function (e, i) {
				return;
				_react2.default.createElement(
					_reactBootstrap.Row,
					null,
					_react2.default.createElement(
						_reactBootstrap.Col,
						null,
						_react2.default.createElement(
							'h2',
							null,
							_react2.default.createElement(
								'a',
								{ href: '#' },
								e
							)
						),
						_react2.default.createElement(
							'p',
							null,
							_react2.default.createElement('span', { className: 'glyphicon glyphicon-time' }),
							_this2.state.data[e].date
						),
						_react2.default.createElement('hr', null),
						_react2.default.createElement('img', { className: 'img-responsive', src: 'http://placehold.it/900x300', alt: '' }),
						_react2.default.createElement('hr', null),
						_react2.default.createElement(
							'p',
							null,
							_this2.state.data[e].content
						),
						_react2.default.createElement(
							_reactBootstrap.Button,
							null,
							'Read More',
							_react2.default.createElement('span', { className: 'glyphicon glyphicon-chevron-right' })
						)
					)
				);
			})
		);
	}
});

_reactDom2.default.render(_react2.default.createElement(_appLib.NavBar, null), document.getElementById('nav'));
_reactDom2.default.render(_react2.default.createElement(View, null), document.getElementById('main'));
// ReactDOM.render(<Main data = {DATA.home}/>, document.getElementById('main'));
// ReactDOM.render(<Portfolio data = {DATA.portfolio}/>, document.getElementById('portfolio'));