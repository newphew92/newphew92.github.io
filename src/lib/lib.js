import React from 'react';
import {Button} from 'react-bootstrap';

export class NavBar extends React.Component{
  render () {
    return (
      <nav id = "mainNav" style = {{backgroundColor: "#F29924"}} className = "navbar navbar-default navbar-fixed-top navbar-custom">
        <div className = "container">
          <div className = "navbar-header page-scroll">
            <Button className = "navbar-toggle" data-toggle = "collapse" data-target = "#bs-example-navbar-collapse-1">
              <span className = "sr-only">Toggle Navigation</span> Menu <i className="fa fa-bars"></i>
            </Button>
						<a className="navbar-brand" href="#page-top">Terrence Ko</a>
          </div>
					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<ul className="nav navbar-nav navbar-right">
									<li className="hidden">
											<a href="#page-top"></a>
									</li>
									{
										[<a href="#portfolio" onClick = {this.props.handleChange.bind(null, "portfolio")}>Portfolio</a>,
										<a href="#home" onClick = {this.props.handleChange.bind(null, "home")}>Home</a>,
										<a href="#blog" onClick = {this.props.handleChange.bind(null, "blog")}>Blog</a>,
										<a href="#contact" onClick = {this.props.handleChange.bind(null, "contact")}>Contact</a>]
										.map((e, i) => {return <li key = {i} className="page-scroll">{e}</li>})
									}
							</ul>
					</div>
				</div>
      </nav>
    )
  }
};
export class BigX extends React.Component{
	render() {
		return(
			<div className = "close-modal" onClick = {this.props.handleClick}>
				<div className = "lr">
					<div className = "rl"/>
				</div>
			</div>
		)
	}
}

export function organizeGroups(list, rowLength) {
  var cols=[];var rows=[];
  for (var i=1; i<= list.length;i++){
    cols=cols.concat(list[i-1])
    if(i%rowLength === 0||i === list.length){
      rows=rows.concat([cols]);
      cols=[];
    }
  }
  return rows;
}

export function extractUrlExtension() {
  var url=window.location.href.split("/");
  return (url[url.length-1]).replace(/[#]/,"")
}

export function handleChange(stateName) {
  return function (event) {
    var state = {};
    state[stateName] = event.target ? event.target.value : event;
    this.setState(state);
  }.bind(this);
}
