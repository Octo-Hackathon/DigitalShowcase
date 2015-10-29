var Reflux = require('reflux');
var Actions = require('../actions');

module.exports = Reflux.createStore({

	listenables : [Actions],
	getModal : function(cardDetails){
		console.log("Approached2");
		this.trigger('change',cardDetails);			
	}
});