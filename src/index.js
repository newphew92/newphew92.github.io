import React from 'react';
import {Button, Row, Col, Modal} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import {NavBar, BigX, organizeGroups, extractUrlExtension, handleChange} from './appLib';

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
				<CV data = {DATA.CV}/>
				{/* <Row><Project modalOpen = {"cv" === this.state.focusPanel} project = {this.state.cv}/></Row> */}
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
				<div className = "container">
					<Row>
						<Col>
			        <h1 style = {{textAlign: "center"}}>{homeText.title}</h1>
			        <p>{homeText.aboutMe}</p>
						</Col>
					</Row>
				</div>
      </div>
    )
  }
});

const CV = React.createClass({
	getInitialState() {
		return {
			data: undefined
		}
	},
	componentWillMount() {
		this.setState({
			data: this.props.data,
		})
	},

	render() {
		return (
			<div>
			<Row>
				<Col lg = {12} style = {{textAlign: "center"}}>
					<h2>{this.state.data.title}</h2>
					<hr className="star-primary"/>
					<p>{this.state.data.description}</p>
				</Col>
			</Row>
					{
						Object.keys(this.state.data.content).map((e1,i) => {
							return(
								<div className = "container" style = {{textAlign: "center"}} key = {i}>
									{
										Object.keys(this.state.data.content[e1]).map((e,i) => {
											console.log(e1);
											console.log(e);
											return(
												<div key = {i}>
												  <Row><Col lg = {12}><h5>{e}</h5></Col></Row>
												  <Row>
												    <Col lg = {6}>
												      {Object.keys(this.state.data.content[e1][e].details)}
												    </Col>
												    <Col lg = {6}>
												      {this.state.data.content[e1][e].date}
												    </Col>
												  </Row>
												  <Row>
												    <Col lg = {6}>
												      {this.state.data.content[e1][e].details[Object.keys(this.state.data.content[e1][e].details)]}
												    </Col>
												  </Row>
												  <hr/>
												</div>
											)
										})
									}
								</div>
							)
						})
					}
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
										return <Project modalOpen = {this.state.data.personalProjects[e].title.replace(/[" "]/g,"") === this.state.focusPanel} key = {i} project = {this.state.data.personalProjects[e]} size = {4}/>;}
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
				<Col sm = {this.props.size} className = "portfolio-item">
					<a href = {"#"+this.state.project.title.replace(/[" "]/g,"")} className = "portfolio-link" onClick = {this.handleToggle}>
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
