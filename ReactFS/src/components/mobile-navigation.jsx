var React = require('react');
var Search = require('./search');
var SideLink = require('./sidelinks');
var SideButton = require('./sideButton');
var MediaLinks = require('./mediaLinks');

module.exports = React.createClass({

	render : function(){
		var categotyList = this.props.categoryDetails.map(function(categoryDetail){
			return <SideButton {...categoryDetail} buttonClassName = "menuBtn" />
		});
		var verticalList = this.props.verticalDetails.map(function(verticalDetail){
			return <SideButton {...verticalDetail} buttonClassName = "menuBtn" />
		});
		return 	<nav id="mobileNav" className="navmenu navmenu-default navmenu-fixed-right offcanvas" role="navigation">
					<Search />
					<SideLink linkClassName = "" />
					<hr/>
					<div className="btn-group-vertical filterGroup" role="group">
						{categotyList}
					</div>
					<div className="btn-group-vertical filterGroup" role="group">
						{verticalList}
					</div>
					<MediaLinks />
				</nav>
	}


});