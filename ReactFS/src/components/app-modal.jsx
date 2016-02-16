var React = require('react');
var Reflux = require('reflux');
var CardStore = require('../store/card-store');
var Modal = require('react-bootstrap').Modal;
var ContactStore = require('../store/contacts-store');

module.exports = React.createClass({
	mixins : [
		Reflux.listenTo(CardStore,'onChange')
	],
	getInitialState : function(){
		return {
			card : [],
			showModal : false,
			categoryIcn :[]
		}
	},
	onChange : function(event,cardDetail){
		this.setState({card : cardDetail, showModal : true , categoryIcn : cardDetail.categoryIcons});
	},
	close : function(){
		this.setState({showModal : false});
	},
	render : function(){
		var List = this.state.categoryIcn.map(function(values){
			return <div className="modalTechIcon" data-toggle="tooltip" data-placement="top" title={values.categoryTitle}><img src={values.categoryImage} alt={values.categoryTitle + " Logo"}/></div>
		});
		return	<div id="modalDetails" className="modal fade" tabIndex="-1" role="dialog">
				  	
				  		<Modal dialogClassName="modal-dialog modal-lg" show={this.state.showModal} onHide={this.close}>
				 	   	<div className="modal-content" >
					          	<div className="row modalRow">
						            <button type="button" className="close"  aria-label="Close"><span aria-hidden="true" onClick = {this.close}>&times;</span></button>
						            <div className="col-md-6 modalLeft" >
						              	<div className="modalTitle">{this.state.card.cardTitle}</div>
						              	<div className="modalHeading">The Problem:</div>
						              	<div className="modalText">{this.state.card.cardProblem}</div>
						              	<div className="modalHeading">The Solution:</div>
						              	<div className="modalText">{this.state.card.cardSolution}</div>
						              	<div className="modalHeading">The Benefits:</div>
						              	<div className="modalText">{this.state.card.cardBenefits}</div>
						            </div>
						            <div className="col-md-6 modalRight" >
						              	<div className="appShowcaseImg"><img src="images/placeHolder.png" alt="Screenshots of Inflo Application"/></div>
						              	{List}
						            </div>
						            <button className="modalButton" type="submit">VISIT SITE</button>
					  	      	</div>
					        </div>
					        </Modal>	        
				</div>

	}

})