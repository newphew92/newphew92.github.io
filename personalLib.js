var Bar = React.createClass({
	render: function (){
		var B = ReactBootstrap;
		var Row = B.Row,
			Col = B.Col,
		return (
			<Row>
				<Col lg = {2} lgOffset = {2} md = {2} xs = {6}>
					<a>Home</a>
				</Col>
				<Col lg = {2} md = {2} xs = {6}>
					<a>Playground</a>
				</Col>
				<Col lg = {2} md = {2} xs = {6}>
					<a>Graveyard</a>
				</Col>
				<Col lg = {2} md = {2} xs = {6}>
					<a>About Me</a>
				</Col>
			</Row>
		)
	}
});