
var Personal = React.createClass({
	getInitialState: function(){
		return {
			screen: undefined,

		}
	},
	handleChange: function(stateName) {
		return function (event) {
				var state = {};
				state[stateName] = event.target ? event.target.value : event;
				this.setState(state)
				}.bind(this);
	},
	render: function(){
		var B = ReactBootstrap
		var Row = B.Row,
			Col = B.Col,
			Navbar = B.Navbar,
			Nav = B.Nav,
			DropdownButton = B.DropdownButton,
			MenuItem = B.MenuItem,
			NavItem = B.NavItem;
		return (
			<div>
			<Navbar fixedTop brand={<a href="#">Terrence Ko</a>}>
		    <Nav>
		      <NavItem eventKey={1} onClick = {this.handleChange('screen')}>Graveyard</NavItem>
		      <NavItem eventKey={2} onClick = {this.handleChange('screen')}>About Me</NavItem>
		      <DropdownButton eventKey={3} title='Playground'>
		        <MenuItem eventKey='1' onClick = {this.handleChange('screen')}>Action</MenuItem>
		        <MenuItem eventKey='2' onClick = {this.handleChange('screen')}>Another action</MenuItem>
		        <MenuItem eventKey='3' onClick = {this.handleChange('screen')}>Something else here</MenuItem>
		        <MenuItem divider />
		        <MenuItem eventKey='4' onClick = {this.handleChange('screen')}>Separated link</MenuItem>
		      </DropdownButton>
		    </Nav>
	  	</Navbar>
			<Row>
				<Col lg = {12} md = {12} xs = {12}>
					<div class="jumbotron">
						<h1>Terrence Ko</h1>
					</div>
				</Col>
			</Row>	
			<Row>
				<Col lg = {3} lgOffset = {2} md = {3} mdOffset = {2} xs = {12}>
					<div id = "portrait"><img src = "./Pictures/Binocular.jpg" class ="img-responsive"></img></div>
				</Col>
				<Col lg = {4} md = {4} xs = {12}>
					<p>Hi there! Welcome to my personal homepage. This is where I will be dumping any web related code as well as interesting stories or information.</p>		
				</Col>
			</Row>
			</div>

		)
	}

});

React.render(<Personal></Personal>, document.getElementById('content'));