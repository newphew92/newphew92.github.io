var Date = React.createClass({
	render: function() {
		return (
			<div style = {{float:"right",fontFamily:"italic bold", fontStyle:"italic bold"}}>{this.props.date}</div>
		)
	}
});
var Personal = React.createClass({
	getInitialState: function(){
		return {
			screen: "main",
		}
	},
	handleChange: function(stateName) {
		return function (event) {
			console.log(event.target.value);
			var state = {};
			state[stateName] = event.target ? event.target.value : event;
			this.setState(state)
			}.bind(this);
	},

	handleScreen: function(stateName) {
			this.setState({screen:stateName})
			// location.hash = '#'+content;
	},
	componentDidMount: function() {
		var url = window.location.href.split("/")
		console.log(url)
		var path = (url [url.length-1]).replace(/[#]/,"")
		if (! path){path = "main"}
		this.setState({screen:path})
		// console.log(/.+?(?=\#)/.exec(url))
		console.log(path)
		// this.setState({})
	},
	renderBody: function(content){
		console.log(this.state.screen)
		this.setState ({screen:content},
			function () {
				switch (this.state.screen){
					case "main":
						return this.renderMain();
						break;
					case "profile":
						console.log('profile')
						return this.renderMain();
						break;	
					default:
						return this.renderMain();
				}
			})

	},
	render: function(){
		var B = ReactBootstrap;
		var Row = B.Row,
			Col = B.Col,
			Navbar = B.Navbar,
			Nav = B.Nav,
			DropdownButton = B.DropdownButton,
			MenuItem = B.MenuItem,
			Panel = B.Panel,
			NavItem = B.NavItem;
		var screen = {
			profile : (
				<Panel style = {{margin:"5%"}}>
					<Row>
						<Col lg = {10} lgOffset = {1}>
							<p>I was born in Montreal, Canada in 1992. Growing up, I learned how to play the piano and participated in many competitions until I entered CEGEP (pre-university institution in Quebec, the equivalent of the last year of high school and first year of university). 
							Interested in medical technologies and particularily artificial organs, I enrolled into the program of Anatomy and Cell Biology at Mcgill University. 
							After a year and a half, I took up programming and felt that I was learning much more. 
							I thus, decided to switch from a major to two liberal science degrees with concentrations in Anatomy and Cell Biology and Computer Science.</p>
							<p>I am currently finishing my Bachelor of Science and will graduate in 2016.</p>
						</Col>
					</Row>
					<Row><Col lg = {12}><h2>Curriculum Vitae (Abridged)</h2></Col></Row>
					<Row>
						<Col lg = {4} lgOffset = {2} xs = {12}><h3>Education</h3></Col>
						<Col lg = {4}>
							<Row><Col lg = {12}><h4>Mcgill University</h4><Date date="2012-2016"/></Col></Row>
							<Row><Col lg = {12}><p>Bachelor of Science: Liberal Degree (Core Anatomy and Cell Biology and Computer Science)</p></Col></Row>
							<Row><Col lg = {12}><h4>College Jean-de-Brebeuf (CEGEP)</h4><Date date = {"2010-2012"}/></Col></Row>
							<Row><Col lg = {12}><p>DEC in Health Sciences</p></Col></Row>
							<Row><Col lg = {12}><h4>College Jean-de-Brebeuf (Secondary)</h4><Date date = {"2004-2010"}/></Col></Row>
							<Row><Col lg = {12}><p>Highschool Diploma</p></Col></Row></Col>
					</Row>
					<Row><Col lg = {8} lgOffset = {2}><hr/></Col></Row>
					<Row><Col lg = {4} lgOffset = {2} xs = {12}><h3>Work Experience</h3></Col>
						<Col lg = {4}>
							<Row><Col lg = {12}><h4>Sushi Shop</h4><Date date = {"Summer 2012"}/></Col></Row>
							<Row><Col lg = {12}><p>Sous-chef</p></Col></Row>
							<Row><Col lg = {12}> <h4>Heart of the City Piano Program</h4><Date date = {"2012-2013"}/></Col></Row>
							<Row><Col lg = {12}><p>Piano Teacher</p></Col></Row>
						</Col>
						<Col lg = {3}></Col>
					</Row>
					<Row><Col lg = {8} lgOffset = {2}><hr/></Col></Row>
					<Row>
				     <Col lg = {4} lgOffset = {2} xs = {12}><h3>Competitions and Awards</h3></Col>
				     <Col lg = {4}>
				      <Row><Col lg = {12}><h4>McHacks</h4><Date date = {"Summer 2015"}/></Col></Row>
				    	<Row><Col lg = {12}><p>My team and I attempted to create an app that would take advantage of modern cellphone cameras and scan a deck of cards being rifled through. 
				    	Such information would be used to cheat in card games.</p></Col></Row>
				      <Row><Col lg = {12}><h4>Mcgill CodeJam:Artificial Intelligience (final round finish)</h4><Date date = {"2014"}/></Col></Row>
				      <Row><Col lg = {12}><p>The goal of this competition was to come up with a facial recognition algorithm that would 
				      identify black and white pictures of people without the aid of packages related to facial recognition.</p></Col></Row>
					    <Row><Col lg = {12}><h4>Mcgill Dobson Cup Entrepreneurial Start-up competition (second round finish)</h4><Date date = {"2014"}/></Col></Row>
				    	<Row><Col lg = {12}><p>The Dobson cup aims to provide funding to the winning startup</p></Col></Row>
				   	</Col>
				   	<Col lg = {3}></Col>
				  </Row>
				   </Panel> 
			),
			main : (
				<Panel>
				<Row>
					<Col lg = {12} md = {12} xs = {12}>
							<h1>Terrence Ko</h1>
					</Col>
				</Row>	
				<Row>
					<Col lg = {4} lgOffset = {1} md = {4} mdOffset = {1} xs = {12}>
						<div id = "portrait"><img src = "https://raw.githubusercontent.com/newphew92/newphew92.github.io/master/Pictures/smallBinocular.JPG" class ="img-responsive"></img></div>
					</Col>
					<Col lg = {6} md = {6} xs = {12}>
						<p>Hi there! Welcome to my personal homepage. This is where I will be dumping any web related code as well as interesting stories or information.</p>		
						<p>I will occasionally write some things that I find interesting such as travel blogs, cooking recipes and funny things in general.</p>
						<p>I originally intended this page to be powered by Node.js and have a login feature (for the gigges) but since I can't be bothered to set up a server, I'll stick to using static pages only.</p>
						<p>This website is hosted on Github and the repo is public. I'm using React.js for the front-end along with React-Bootstrap spinkled with JQuery.</p>
					</Col>
				</Row>
				<br/>
				<Row>
					<Col lg = {12} md = {12} xs = {12}>
						<p>I personally believe that it is important that programmers should all be able to make a simple web page and what better way is there to practice than having your very own personal web page?
						Websites are good for going from theory to practical quickly and increase your exposure to the world.</p>
						<p>You may think that the navbar leads to other webpages but wait! This is only one single webpage and I'm counting on react to make speedy transitions.
						This might be annoying if you feel the need to refresh this page often so I'll try to come up with a fix.</p>
						<p>UPDATE: Haha! Success! Just merely had to manually set the the url, do a little componentDidMount and regex, read the end and set state! Refresh away without loading a new page!</p>
					</Col>
				</Row>
			</Panel>	
			),
		}	
		
		return (
			<div class = "collapse navbar-collapse">
			<Navbar toggleNavKey = {0} fixedTop brand={<a href = "#main" onClick = {this.handleScreen.bind(null,'main')}>Terrence Ko</a>}>
		    <Nav eventKey = {0}>
		      <NavItem eventKey={2} href = "#profile" onClick = {this.handleScreen.bind(null,'profile')}>About Me</NavItem>
		      <NavItem eventKey={1} onClick = {this.handleScreen.bind(null,'main')}>Graveyard</NavItem>
		      <DropdownButton eventKey={3} title='Playground'>
		        <MenuItem eventKey='1' >Action</MenuItem>
		        <MenuItem eventKey='2' >Another action</MenuItem>
		        <MenuItem eventKey='3' >Something else here</MenuItem>
		        <MenuItem divider />
		        <MenuItem eventKey='4' >Separated link</MenuItem>
		      </DropdownButton>
		    </Nav>
	  	</Navbar>
			{screen [this.state.screen]}
			</div>

		)
	}

});

React.render(<Personal></Personal>, document.getElementById('content'));