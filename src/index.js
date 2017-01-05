import React from 'react';
import {Button, Row, Col, Modal, Accordion, Panel} from 'react-bootstrap';
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
		switch (path) {
			case "blog":
				this.setState({screen: "blog"});
				break;
			default:
				this.setState({screen: "main"});
				this.setState({focusPanel: path})
		}
		// console.log(/.+?(?=\#)/.exec(url))
	},
	renderMain() {
		return(
			<div>
				<Main data = {DATA.home}/>
				<CV data = {DATA.CV}/>
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
		        <div className = "container">
		            <Row>
		                <Col lg = {12}>
		                    <img className = "img-responsive" src = "img/profile.jpg" alt = ""/>
		                    <div className = "intro-text">
		                        <span className = "name">Terrence Ko</span>
		                        <hr className = "star-light"/>
		                        <span className = "skills">{homeText.occupation}</span>
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
			processModalOpen: false,
			data: this.props.data
		})
	},
	handleToggle() {
		this.setState({processModalOpen: !this.state.processModalOpen});
	},
	render() {
		return(
			<div>
				<header>
					<div className = "container">
						{
							Object.keys(this.state.data).map((e,i) => {
							 	return(<BlogMenuItem data = {this.state.data[e]} key = {i}/>);
							})
						}
					</div>
				</header>
			</div>
		)
	}
});

var BlogMenuItem = React.createClass({
	getInitialState() {
		return {
			data: undefined
		}
	},
	componentWillMount() {
		this.setState({
			processModalOpen: false,
			data: this.props.data,
			expanded: false
		})
	},
	handleToggle(stateName) {
		var state = {}
		state[stateName] = !this.state[stateName]
		return (
			() => {this.setState(state)}
		)
	},
	renderProcessModal(show, title, content, img, date) {
		console.log('modal')
		console.log(typeof content)
		console.log(content.map((e) =>{return e}))
		console.log('endmodal')
		return(
			<Modal title = {title} onHide = {this.handleToggle("processModalOpen")} show = {show} className="portfolio-modal modal" tabIndex="-1" role="dialog" >
				<BigX handleClick = {this.handleToggle("processModalOpen")}/>
				<Row>
					<Col lg = {8} lgOffset = {2}>
						<Modal.Body>
							<h2>{title}</h2>
							<hr className="star-primary"/>
							<img src = {img} className="img-responsive img-centered" alt=""/>
							{content.map((e,i) => {return (<p key = {i}>{e}</p>)})}
							<strong>{date}</strong>
							<Button onClick = {this.handleToggle("processModalOpen")}>
								<i className="fa fa-times"></i> Close
							</Button>
						</Modal.Body>
					</Col>
				</Row>
			</Modal>
		)
	},
	render(){
		// console.log(typeof this.state.data.content)
		// console.log(this.state.data.content.map((e)=>{return e}))
		return(
			<Panel collapsible header = {this.state.data.title} href="#" expanded = {this.state.expanded} onClick = {this.handleToggle("expanded")}>
			<p style = {{color: "black"}}>{this.state.data.summary}</p>
			<Button onClick = {this.handleToggle("processModalOpen")}>Read More<span className="glyphicon glyphicon-chevron-right"></span></Button>
			{this.renderProcessModal(this.state.processModalOpen, this.state.data.title, this.state.data.content, this.state.data.img, this.state.data.date)}
			</Panel>)
	}
});

ReactDOM.render(<NavBar/>, document.getElementById('nav'));
ReactDOM.render(<View/>,document.getElementById('main'));
