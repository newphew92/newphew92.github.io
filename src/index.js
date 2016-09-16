import React from 'react';
import ReactBootstrap from 'react-bootstrap'

var NavBar = React.createClass({
	getInitialState: function(){
	},
	render: function(){
		const B = ReactBootstrap,
		Button = B.Button;
		return(
			<nav className = "navbar navbar-inverse navbar-fixed-top">
				<div className = "container">
					<Button className = "navbar-toggle">
						<Span className = "sr-only">Toggle Navigation</Span>
					</Button>
				</div>
			</nav>
		)
	}
});

var Home = React.createClass({
	getInitialState: function(){
		return{
			language: ENGLISH,
			selection: 'english',
		}
	},
  handleChange: function(stateName) {
		return function (event) {
			var state={};
			state[stateName]=event.target ? event.target.value : event;
			this.setState(state)
			}.bind(this);
	},
	handleLanguage: function(){
		switch(this.state.selection){
			case 'english':
				this.setState({selection:'french',language:FRENCH})
				break;
			case 'french':
				this.setState({selection:'english', language:ENGLISH})
				break;
			default:
				this.setState({selection:'english', language:ENGLISH})
		}
	},
	render: function(){
    return(
    <div/>
    )
  }
});
ReactDOM.render(<Home/>, document.getElementById('content'));
