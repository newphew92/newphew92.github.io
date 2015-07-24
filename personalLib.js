// var Bar = React.createClass({
// 	render: function (){
// 		var B = ReactBootstrap;
// 		var Row = B.Row,
// 			Col = B.Col;
// 		return (
// 			<Row>
// 				<Col lg = {2} lgOffset = {2} md = {2} xs = {6}>
// 					<a>Home</a>
// 				</Col>
// 				<Col lg = {2} md = {2} xs = {6}>
// 					<a>Playground</a>
// 				</Col>
// 				<Col lg = {2} md = {2} xs = {6}>
// 					<a>Graveyard</a>
// 				</Col>
// 				<Col lg = {2} md = {2} xs = {6}>
// 					<a>About Me</a>
// 				</Col>
// 			</Row>
// 		)
// 	}
// });

var NavBar = React.createClass({
	render: function (){
		var B = ReactBootstrap;
		var Navbar = B.Navbar,
			Nav = B.Nav,
			DropdownButton = B.DropdownButton,
			MenuItem = B.MenuItem,
			NavItem = B.NavItem;
		return (
			<Navbar brand={<a href="#">Terrence Ko</a>}>
		    <Nav>
		      <NavItem eventKey={1} href='#'>Graveyard</NavItem>
		      <NavItem eventKey={2} href='#'>About Me</NavItem>
		      <DropdownButton eventKey={3} title='Playground'>
		        <MenuItem eventKey='1'>Action</MenuItem>
		        <MenuItem eventKey='2'>Another action</MenuItem>
		        <MenuItem eventKey='3'>Something else here</MenuItem>
		        <MenuItem divider />
		        <MenuItem eventKey='4'>Separated link</MenuItem>
		      </DropdownButton>
		    </Nav>
	  	</Navbar>
	  )
	}
});