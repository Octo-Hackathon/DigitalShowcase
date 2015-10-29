var React = require('react');


module.exports = React.createClass({

	render : function(){

		return 	<div className="input-group" id="sideSearch">
					<input type="text" className="form-control searchBox" placeholder="Search For..." />
					<i id="mobileSearchIcon" className="glyphicon glyphicon-search form-control-feedback"></i>
				</div>

	}


});