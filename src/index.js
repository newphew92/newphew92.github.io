import React from 'react';
import {Button, Row, Col, Modal} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import {NavBar, BigX, organizeGroups, extractUrlExtension} from './appLib';

var DATA;
$.ajaxSetup({
			async: false,
			cache: false
	});
$.getJSON( "../text/english.json"+'?', { cache: false},function() {})
	.done(function( data ) {
		DATA = data;
		})
	.fail( function(d, textStatus, error) {
        console.error("getJSON failed, status: " + textStatus + ", error: "+error)
    })
	.always(function() {
	});

const View = React.createClass({
	getInitialState(){
		return {
			screen: "main",
			focusPanel: undefined,
		}
	},
	componentWillMount() {
		var path = extractUrlExtension();
		if (! path){path="main"}
		this.setState({focusPanel:path})
		// console.log(/.+?(?=\#)/.exec(url))
		console.log(path);
	},
	renderMain() {
		return(
			<div>
				<Main data = {DATA.home}/>
				<CV data = {DATA.CV} processModalOpen = {this.state.focusPanel === DATA.CV.title}/>
				<Portfolio data = {DATA.portfolio} focusPanel = {this.state.focusPanel}/>
			</div>
		)
	},
	renderBlog() {
		return <BlogMenu data = {DATA.blog}/>
	},
	render() {
		var screen = {
			"main" : this.renderMain(),
			"blog" : this.renderBlog()
		}
		return (
			screen[this.state.screen]
		)
	}
});
const Main = React.createClass({
  getInitialState(){
    return {
      home: undefined,
    }
  },
	componentWillMount() {
		this.setState({
			home: this.props.data
		})
	},
  handleChange(stateName) {
    return function (event) {
      var state = {};
      state[stateName] = event.target ? event.target.value : event;
      this.setState(state);
    }.bind(this);
  },
  render (){
    var homeText = this.state.home;
    return (
      <div>
				<header>
		        <div className="container">
		            <Row>
		                <Col lg = {12}>
		                    <img className="img-responsive" src="img/profile.jpg" alt=""/>
		                    <div className="intro-text">
		                        <span className="name">Terrence Ko</span>
		                        <hr className="star-light"/>
		                        <span className="skills">{homeText.occupation}</span>
		                    </div>
		                </Col>
		            </Row>
		        </div>
		    </header>
        <h1>{homeText.title}</h1>
        <p>{homeText.aboutMe}</p>
      </div>
    )
  }
});

const CV = React.createClass({
	getInitialState() {
		return {
			data: undefined,
			processModalOpen: undefined
		}
	},
	componentWillMount() {
		this.setState({
			data: this.props.data,
			processModalOpen: this.props.modalOpen
		})
	},
	handleToggle() {
		this.setState({processModalOpen: !this.state.processModalOpen});
	},
	renderProcessModal(show) {
		return (
			<Modal title = {this.state.data.title} onHide = {this.handleToggle} show = {show} className="portfolio-modal modal" tabIndex="-1" role="dialog" >
				<BigX handleClick = {this.handleToggle}/>
				<Row>
					<Col lg = {12}>
						<Modal.Body>
							<Button onClick = {this.handleToggle}>
								<i className="fa fa-times"></i> Close
							</Button>
						</Modal.Body>
					</Col>
				</Row>
			</Modal>
		)
	},
	render() {
		return (
			<div className = "container">
				<Row>
					<Col lg = {12} style = {{textAlign: "center"}}>
						<h2><a href = {"#"+this.state.data.title.replace(/[" "]/g,"")}className = "portfolio-link" onClick = {this.handleToggle}></a></h2>
						<hr className = "star-primary"/>
					</Col>
				</Row>
				{this.renderProcessModal(this.state.processModalOpen)}
			</div>
		)
	}
});

const Portfolio = React.createClass({
	getInitialState() {
		return {
			data: undefined,
			focusPanel: undefined
		}
	},
	componentWillMount() {
		this.setState({
			data: this.props.data,
			focusPanel: this.props.focusPanel
		});
		console.log(this.props.focusPanel);
	},
	render() {
		return (
			<section id = "portfolio">
				<div className = "container">
					<Row>
						<Col lg = {12} style = {{textAlign: "center"}}>
							<h2>{this.state.data.title}</h2>
							<hr className = "star-primary"/>
						</Col>
					</Row>
						{
							organizeGroups(Object.keys(this.state.data.personalProjects),3).map( (e,i) =>{
								return <Row key = {i}>{e.map((e,i) => {
										return <Project modalOpen = {this.state.data.personalProjects[e].title.replace(/[" "]/g,"") === this.state.focusPanel} key = {i} project = {this.state.data.personalProjects[e]}/>;}
								)}</Row>
							})
						}
				</div>
			</section>
		)
	}
});



var ProjectInfo = React.createClass({
	render (){
		return (
			<ul className="list-inline item-details">
				<li>Github:
					<strong><a href={this.props.nameURL}>{this.props.name}</a></strong>
				</li>
				<li>Date:
					<strong>{this.props.date}</strong>
				</li>
			</ul>
		)
	}
})

var Project = React.createClass({
	getInitialState() {
		return {
			processModalOpen: false,
			project: {},
		}
	},
	componentWillMount() {
		this.setState({
			processModalOpen: this.props.modalOpen,
			project: this.props.project
		});
	},
	handleToggle() {
		this.setState({processModalOpen: !this.state.processModalOpen});
	},
	renderProcessModal(show) {
		return(
			<Modal title = {this.state.project.title} onHide = {this.handleToggle} show = {show} className="portfolio-modal modal" tabIndex="-1" role="dialog" >
				<BigX handleClick = {this.handleToggle}/>
				<Row>
					<Col lg = {8} lgOffset = {2}>
						<Modal.Body>
							<h2>{this.state.project.title}</h2>
							<hr className="star-primary"/>
							<img src = {this.state.project.image} className="img-responsive img-centered" alt=""/>
							<p>{this.state.project.content}</p>
							<ProjectInfo name = {this.state.project.title} nameURL = {this.state.project.url} date = {this.state.project.date}/>
							<Button onClick = {this.handleToggle}>
								<i className="fa fa-times"></i> Close
							</Button>
						</Modal.Body>
					</Col>
				</Row>
			</Modal>
		)
	},
	render() {
		return(
			<div>
				<Col sm = {4} className = "portfolio-item">
					<a href = {"#"+this.state.project.title.replace(/[" "]/g,"")}className = "portfolio-link" onClick = {this.handleToggle}>
						<div className = "caption">
							<div className = "caption-content">
								<i className = "fa fa-search-plus fa-3x"></i>
							</div>
						</div>
						<img src = {this.state.project.image} className = "img-responsive" alt = ""/>
					</a>
				</Col>
				{this.renderProcessModal(this.state.processModalOpen)}
			</div>
	)}
})

var BlogMenu = React.createClass({
	getInitialState() {
		return {
			data: undefined
		}
	},
	componentWillMount() {
		this.setState({
			data: this.props.data
		})
	},
	render() {
		return(
			<div>
				{
					Object.keys(this.state.data).map((e,i) => {
						return
							<Row><Col>
								<h2><a href="#">{e}</a></h2>
								<p><span className="glyphicon glyphicon-time"></span>{this.state.data[e].date}</p>
								<hr/>
								<img className="img-responsive" src="http://placehold.it/900x300" alt=""/>
								<hr/>
								<p>{this.state.data[e].content}</p>
								<Button>Read More<span className="glyphicon glyphicon-chevron-right"></span></Button>
							</Col></Row>;
					})
				}
			</div>
		)
	}
});

ReactDOM.render(<NavBar/>, document.getElementById('nav'));
ReactDOM.render(<View/>,document.getElementById('main'));
// ReactDOM.render(<Main data = {DATA.home}/>, document.getElementById('main'));
// ReactDOM.render(<Portfolio data = {DATA.portfolio}/>, document.getElementById('portfolio'));
