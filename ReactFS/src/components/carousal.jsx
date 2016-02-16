var React = require('react');
var Actions = require('../actions');
var CarousalLink = require('./carousalLink');
var CarousalComp = require('./carousal-comp');

var card = [];

module.exports = React.createClass({
	
	render : function(){
		
		return 	<div id="splashContent" className="col-sm-12">
					<div className="splashInfo">
          				<div id="carouselMain" className="carousel slide" data-ride="carousel" data-interval="10000">
              
				            <CarousalLink carousalDetails = {this.props.carousalDetails} />
	            	              
				            <CarousalComp carousalDetails = {this.props.carousalDetails} />
	            
	              
				            <a className="left carousel-control" href="#carouselMain" role="button" data-slide="prev">
				                <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
				                <span className="sr-only">Previous</span>
				            </a>
				            <a className="right carousel-control" href="#carouselMain" role="button" data-slide="next">
				                <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
				                <span className="sr-only">Next</span>
				            </a>
		           		</div>
          			</div>
          		</div>	

	}

});