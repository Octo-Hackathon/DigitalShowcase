var React = require('react');
var Links = require('./sidelinks');

module.exports = React.createClass({

	render : function(){

		return 	<nav className="navbar navbar-default navbar-fixed-top box-shadow--2dp">
					<div className="navbar-header">
						<a className="navbar-brand" href="http://labs.octoconsulting.com/"><img src="images/OLabs-Logo-Flat-Color.svg" alt="OLabs Logo"/></a>
						<button type="button" className="navbar-toggle" data-toggle="offcanvas" data-target="#mobileNav" data-canvas="body">
							<span className="icon-bar"></span>
  			  				<span className="icon-bar"></span>
   			 				<span className="icon-bar"></span>
						</button>
					</div>
					<div id="navbar" className="navbar-right">
						<Links linkClassName = "nav navbar-nav" />
						<li className="fa fa-facebook-square socialIcon socialIconTopNav" style={{marginLeft :"10px"}}></li>
                		<li className="fa fa-twitter-square socialIcon socialIconTopNav"></li>
                		<li className="fa fa-linkedin-square socialIcon socialIconTopNav"></li>
					</div>
				</nav>

	}

});