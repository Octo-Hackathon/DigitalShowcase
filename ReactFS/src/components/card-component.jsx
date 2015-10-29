var React = require('react');
var Actions = require('../actions'); 
 

module.exports = React.createClass({
  onClickHandler : function(){
    Actions.getModal(this.props);
  },
	render : function(){
    var categoryDetails = this.props.categoryIcons.map(function(categoryDetail){
        return <img className="capabilityIcons" src={categoryDetail.categoryImage} data-toggle="tooltip" data-placement="top" title={categoryDetail.categoryTitle} alt={categoryDetail.categoryTitle}/>
    });
		return  <div className="col-sm-6 col-md-4 col-lg-3"> 	
              <div className="card">
                <div className="cardContent">
                  <div className="cardTitle" ><a href="#" data-toggle="modal" onClick = {this.onClickHandler}>{this.props.cardTitle}</a></div>
                  <div className="cardSubTitle">{this.props.cardSubtitle}</div>
                </div>
                <div><a href="#" onClick = {this.onClickHandler}><img className="cardImage" src={this.props.cardImage} alt={this.props.cardTitle + " Screenshot"} data-toggle="modal"/></a></div>
                <div className="cardContent">
                  <div className="cardCatagory">{this.props.cardCategory}</div>
                  {categoryDetails}
                </div>
                <div className="cardFooter">
                  <div className="cardThumb fa fa-thumbs-up">{this.props.likes}</div><div className="cardEye fa fa-eye">{this.props.views}</div>
                  <button className="cardButton" data-toggle="modal" onClick = {this.onClickHandler}>READ MORE</button>
                </div>
              </div>
            </div>  
	}


});