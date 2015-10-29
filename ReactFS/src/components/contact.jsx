var React = require('react');
var Modal = require('react-bootstrap').Modal;
var Reflux = require('reflux');
var ContactStore = require('../store/contacts-store');

module.exports = React.createClass({
	mixins : [
		Reflux.listenTo(ContactStore,'onChange')
	],
	getInitialState : function(){
		return {
			showModal : false
		}
	},
	onChange : function(event,value){
		console.log("Came");
		this.setState({showModal : true});
	},
	close : function(){
		this.setState({showModal : false});
	},	
	render : function(){

		return 	<div id="modalContact" className="modal fade" tabIndex="-1" role="dialog">
					<Modal dialogClassName="modal-dialog modal-lg" show={this.state.showModal} onHide={this.close}>
			 	    	<div className="modal-content">
			         	 	<div className="row modalRow" style={{padding:"20px"}}>
				            	<button type="button" className="close"  aria-label="Close" onClick = {this.close}><span aria-hidden="true">&times;</span></button>
				            	<div id="modalLeft" className="col-md-12">
					              	<form>
						  			    <div className="form-group">
						   				  <label htmlFor="name">Name</label>
						                  <input type="text" className="form-control" id="contactName" placeholder="Name"/>
						                </div>
						                <div className="form-group">
						                  <label htmlFor="email">Email</label>
						                  <input type="email" className="form-control" id="contactEmail" placeholder="Email"/>
						                </div>
						                <div className="form-group">
						                  <label htmlFor="phone">Phone #</label>
						                  <input type="number" className="form-control" id="contactPhone" placeholder="Phone #"/>
						                </div>
						                <div className="form-group">
						                  <label htmlFor="industry">Industry</label>
						                  <input type="text" className="form-control" id="contactIndustry" placeholder="Industry"/>
						                </div>
						                <div className="form-group" style={{marginBottom:"40px"}}>
						                  <label htmlFor="industry">Comments</label>
						                  <textarea className="form-control" rows="3"></textarea>
						                </div>
					              	</form>
					            </div>
					        </div>      	
			            </div>
			            <button className="modalButton" type="submit" style={{left:"20px"}}>SUBMIT</button>
			        </Modal>    
			  	</div>

	}

});