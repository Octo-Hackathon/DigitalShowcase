var React = require('react');
var SideButton = require('./sideButton');

module.exports = React.createClass({
  getInitialState : function(){
    return {
      TechFilterOpen : false,
      SegFilterOpen : false
    }
  },
  TclickHandler : function(){
    this.setState({ TechFilterOpen : !(this.state.TechFilterOpen)});
  },
  SclickHandler : function(){
    this.setState({ SegFilterOpen : ! (this.state.SegFilterOpen)});
  },
  TmouseLeaveHandler : function(){
    this.setState({ TechFilterOpen : false });
  },
  SmouseLeaveHandler : function(){
    this.setState({SegFilterOpen : false});    
  },
	render : function(){
		var categotyList = this.props.categoryDetails.map(function(categoryDetail){
			return <SideButton {...categoryDetail} buttonClassName = "dropBtn" />
		});
		var verticalList = this.props.verticalDetails.map(function(verticalDetail){
			return <SideButton {...verticalDetail} buttonClassName = "dropBtn"/>
		});

		return 	<nav className="navbar navbar-default box-shadow--2dp" id="filterNav" data-spy="affix" data-offset-top="550">
					
              		<div className="btn-group dropBtnGroup">
              			<button type="button" className="btn btn-default dropdown-toggle filterButton"  aria-haspopup="true" aria-expanded="false" onClick = {this.TclickHandler}>
              	            TECH FILTER <span className="caret" style={{marginTop:"8px"}}></span>
              			</button>
              			<ul className = {"dropdown-menu " + (this.state.TechFilterOpen ? "show" : "")} onMouseLeave = {this.TmouseLeaveHandler} >
                			{categotyList}
             			  </ul>
              		</div>
              		<div className="btn-group dropBtnGroup">
              			<button type="button" className="btn btn-default dropdown-toggle filterButton" aria-haspopup="true" aria-expanded="false" onClick = {this.SclickHandler}>
               				 SEGMENT FILTER <span className="caret" style={{marginTop:"8px"}}></span>
              			</button>
              			<ul className = {"dropdown-menu " + (this.state.SegFilterOpen ? "show" : "")} onMouseLeave = {this.SmouseLeaveHandler} >
              				{verticalList}
              			</ul>
              		</div>
                  <div className="searchInput">
                    <input type="search" className="form-control" placeholder="Search" /><span className="inputIcon fa fa-search"></span>
                  </div>
				    </nav>	

	}

});