
var Authentication = React.createClass ({
	getInitialState: function() {
		return {
			user:undefined,
			pass:undefined,
			result:undefined,
		}
	},
	handleLogin: function() {
		$.post('/check', {data: JSON.stringify({user: this.state.user, pass: this.state.pass})})
		.done(function (res) {
			console.log(res)
			if (res.redirect) {
    		document.location.href = res.redirect;
			}
		}.bind(this))
		.error(function(err) {
			console.log('error: '+err)
		}.bind(this));
		return false;
	},
	handleChange: function(stateName) {
		return function (event) {
			var state = {};
			state[stateName] = event.target.value;
			this.setState(state)
			}.bind(this);
	},
	render: function(){
		var B = ReactBootstrap
		var Input = B.Input, 
			Panel = B.Panel, 
			Button = B.Button, 
			Col = B.Col, 
			Row = B.Row,
			Modal = B.Modal;
		return(
			<Panel style = {{margin:'15%',textAlign:'center'}}>
				<h1>Slate</h1>
				<Panel style={{margin:'5%'}} header = "Login">
					<form onSubmit = {this.handleLogin}>
						<Input
							type = "text"
							classname = "form-control"
							placeholder = "Username"
							onChange = {this.handleChange('user')}/>
						<Input
							type = "password"
							classname = "form-control"
							placeholder = "Password"
							onChange = {this.handleChange('pass')}/>
						<Row>
							<Col lg = {3} lgPush = {9} sm = {3} smPush = {9}>
								<Button type = "submit" bsStyle = 'primary' bsSize = 'large'>Log In</Button>
							</Col>
						</Row>
						{this.state.result}
					</form>
				</Panel>
			</Panel>		
		)	
	},
})
React.render(<Authentication></Authentication>, document.getElementById('content'));