var React = require('react');
var Actions = require('../actions');

module.exports = React.createClass({


	render : function(){
		var carousalDetails = this.props.carousalDetails.map(function(details){
			var onClk = function b(x){
				Actions.getModal(details);
			}

			if(details.featured == true)
			return <div className="item ">
			            <img src={details.carousalImage} alt="..."/>
			            <div className="carousel-caption">
			            	<div className="splashText">
			                <h2>{details.cardTitle}</h2>
			                <h4>{details.carousalSubTitle}</h4>
			                </div>
			                <button type="button" className="btn btn-primary" onClick = {onClk}>READ MORE</button>
			            </div>
			        </div>
		});
		return	<div className="carousel-inner" role="listbox">
				                <div className="item active">
				                  <img src="images/splash-img.png" alt="..."/>
				                  <div className="carousel-caption">
				                  	<div className="splashText">
				                    <h2>OLABS DIGITAL SHOWCASE</h2>
				                    <h4>Sub Heading Text Place Holder</h4>
				                    </div>
				                    <button type="button" className="btn btn-primary" >ACTION BUTTON</button>
				                  </div>
				                </div>
				                {carousalDetails}
				            </div>

	}

});