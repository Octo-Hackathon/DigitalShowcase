var React = require('react');


module.exports = React.createClass({

	render : function(){
		var slider = 0;
		var carousalList = this.props.carousalDetails.map(function(list){
			if(list.featured == true)
			return <li data-target="#carouselMain" data-slide-to={slider = slider + 1}></li>			
		});
		return 	<ol className="carousel-indicators">
					<li data-target="#carouselMain" data-slide-to="0" className="active"></li>
				    {carousalList}
				</ol>
	}

});