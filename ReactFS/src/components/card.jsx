var React = require('react');
var CardComponent = require('./card-component');

module.exports = React.createClass({
	render : function(){
		var cardList = this.props.cardDetails.map(function(cardDetail){
			return <CardComponent {...cardDetail} />
		});
		return <div>{cardList}</div>

	}

});