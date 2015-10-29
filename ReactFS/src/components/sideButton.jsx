var React = require('react');


module.exports = React.createClass({
	getInitialState : function(){
		return {
			checked : false
		}
	},
	onClickHandler : function(){
		this.setState({checked : ! this.state.checked})
	},
	render : function(){

		return  <button type="button" className="btn btn-default dropBtn" onClick = {this.onClickHandler}>
					<span className={"fa checkBox " + (this.state.checked ? "fa-check-square-o" : "fa-square-o" )}></span><span className ="dropBtnText">{this.props.categoryName}</span>
						<img className="menuIcon" src={this.props.categoryImage} alt={this.props.categoryName + " Icon"}/>
				</button>


	}

});