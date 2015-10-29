var React = require('react');
var Actions = require('../actions'); 

module.exports = React.createClass({
	onClickHandler : function(){
		console.log("Here");
    	Actions.getContact();
  	},
	render : function(){

		return 	<ul className={this.props.linkClassName}>
					<li><a href="#about"><span className="fa fa-users iconSpace"></span>About</a></li>
            		<li><a href="#contact" id="contactLink" onClick = {this.onClickHandler}><span className="fa fa-envelope-o iconSpace"></span>Contact</a></li>
				</ul>

	}


});