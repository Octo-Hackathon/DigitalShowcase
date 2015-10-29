var React = require('react');
var Navigation = require('./navigation');
var MobileNavigation = require('./mobile-navigation');
var Carousal = require('./carousal');
var Card = require('./card');
var FilterNav = require('./filter-navigation');
var AppModal = require('./app-modal');
var Contact = require('./contact');

module.exports = React.createClass({
  
  render : function(){
    return 	<div> 
    					<div className="overlay"></div>
    					<Navigation />
    					<MobileNavigation categoryDetails = {this.props.categoryDetails} verticalDetails = {this.props.verticalDetails} />
              <AppModal />
              <div id="mainContent" className="container-fluid">
                <div className="row">
                    <Carousal carousalDetails = {this.props.cardDetails} />
                </div>
                <div className="affixWrap">
                  <div className="row">
                    <FilterNav categoryDetails = {this.props.categoryDetails} verticalDetails = {this.props.verticalDetails} />
                  </div>
                </div>
                <div id="applicationList" className="row">
                  <Card cardDetails = {this.props.cardDetails} />     
                </div>
                <div className="row">
                  <div className="footer"><a href="www.octoconsulting.com">&copy; Octo Consulting 2015</a> | <a href="#">Privacy</a> | <a href="#">Security</a> | <a href="#">Terms & Conditions</a></div>
                </div>
              </div> 
              <Contact />
				    </div>
	}

});