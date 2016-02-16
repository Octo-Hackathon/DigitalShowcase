var Reflux = require('Reflux');
var Actions = require('../actions');

module.exports = Reflux.createStore({

	listenables : [Actions],
	getContact : function(){
		console.log("Entered");
		this.trigger('change',"here");
	}


});