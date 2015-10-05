var async = require('async');
var AWS = require('aws-sdk');
var emailService = require('./email-service');

AWS.config.region = 'us-east-1';

var sdb = new AWS.SimpleDB({accessKeyId:'AKIAJ3BII5P6OJUJSR5Q', 
					secretAccessKey:'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'});

/*
	This service is to setup domains on simple db
*/
module.exports.setupDomain = function(req, res) {	
	var domain1 = {DomainName: 'event-registration'};
	var domain2 = {DomainName: 'event-appointment'};

	async.series({
	    one: function(callback){
			sdb.createDomain(domain1, function(err,data){
				if (err) { 
					console.log("Error:", err); 
					callback(err, null);
				}else{           
					callback(null, data);
				}
			});
	    },
	    two: function(callback){
			sdb.createDomain(domain2, function(err,data){
				if (err) { 
					console.log("Error:", err); 
					callback(err, null);
				}else{           
					callback(null, data);
				}
			});
	    }
	},
	function(err, results) {
		sdb.listDomains(function(err,data){
			if (err) { 
				console.log("Error:", err); 
				res.json(err);
			}else{
				console.log(data.DomainNames);
				res.json(data.DomainNames);
			}
		});
	});

}

/*
	This service is to register an event
	firstName
	lastName
	email
	phone
*/
module.exports.registerEvent = function(req, res) {		
	var inputData = req.body;
	console.log(inputData);
	if(!inputData.firstName 
			|| !inputData.lastName 
			|| !inputData.email 
			|| !inputData.phone){		
		res.status(400).json({ message: 'Required data is missing.'});
	}else{

		var insert = {};
		//Setting the domain name which is a table
		insert.DomainName = "event-registration";
		//Setting the item name which is primary key
		insert.ItemName = inputData.email;

		//Adding the attributes and values
		insert.Attributes = [];

		var attribute = {};
		attribute.Name = "firstName";
		attribute.Value = inputData.firstName;
		attribute.Replace = true;
		insert.Attributes.push(attribute);

		attribute = {};
		attribute.Name = "lastName";
		attribute.Value = inputData.lastName;
		attribute.Replace = true;
		insert.Attributes.push(attribute);

		attribute = {};
		attribute.Name = "phone";
		attribute.Value = inputData.phone.toString();
		attribute.Replace = true;
		insert.Attributes.push(attribute);	

		//Upserting the data in Simple DB
		sdb.putAttributes(insert, function(err,data){
			if (err) { 
				console.log("Error:", err); 
				res.status(400).json({ message: 'Error happend in inserting the data in simple DB.'});
			}else{  
				emailService.sendEmail(inputData.email,'Registration Successful','Dear '
					+inputData.firstName+' '+inputData.lastName
					+',<br> Thank you for your interest in the Digital Innovation Day at Octo. Your registration request has been received. We will send you a confirmation once your request has been reviewed and processed.<br><br>'+
					'Thanks,<br>Team Octo');
				res.json( { message: 'Registration is successfuly created/updated.' });        
			}
		});
	}
}

/*
	This service is to schedule an appointment
	firstName
	lastName
	email
	phone
	topic
	issueDescription
*/

module.exports.scheduleAppointment = function(req, res) {
	
	var inputData = req.body;
	if(!inputData.firstName 
			|| !inputData.lastName 
			|| !inputData.email 
			|| !inputData.phone
			|| !inputData.topic
			|| !inputData.issueDescription){		
		res.status(400).json({ message: 'Required data is missing.'});
	}else{

		var insert = {};
		//Setting the domain name which is a table
		insert.DomainName = "event-appointment";
		//Setting the item name which is primary key
		insert.ItemName = inputData.email;

		//Adding the attributes and values
		insert.Attributes = [];

		var attribute = {};
		attribute.Name = "firstName";
		attribute.Value = inputData.firstName;
		attribute.Replace = true;
		insert.Attributes.push(attribute);

		attribute = {};
		attribute.Name = "lastName";
		attribute.Value = inputData.lastName;
		attribute.Replace = true;
		insert.Attributes.push(attribute);

		attribute = {};
		attribute.Name = "phone";
		attribute.Value = inputData.phone.toString();
		attribute.Replace = true;
		insert.Attributes.push(attribute);

		attribute = {};
		attribute.Name = "topic";
		attribute.Value = inputData.topic;
		attribute.Replace = true;
		insert.Attributes.push(attribute);	

		attribute = {};
		attribute.Name = "issueDescription";
		attribute.Value = inputData.issueDescription;
		attribute.Replace = true;
		insert.Attributes.push(attribute);		

		//Upserting the data in Simple DB
		sdb.putAttributes(insert, function(err,data){
			if (err) { 
				console.log("Error:", err); 
				res.status(400).json({ message: 'Error happend in upserting the data in simple DB.'});
			}else{  
				emailService.sendEmail(inputData.email,'Appointment Request Received','Dear '
					+inputData.firstName+' '+inputData.lastName
					+',<br> We have received your request to schedule an appointment with our team to discuss about '+inputData.topic
					+'. Our team will contact you shortly with next steps.<br><br>'+
					'Thanks,<br>Team Octo');
				res.json( { message: 'Apppointment is successuly created/updated.' });        
			}
		});
	}
}

/*
	This service returns all the event registrations 
	firstName
	lastName
	email
	phone
*/
module.exports.getEventRegistrations = function(req, res) {	
	var params = {
	  SelectExpression: ' select * from `event-registration` '
	}
	sdb.select(params, function(err,data){
		if (err) { 
			console.log("Error:", err); 
			res.status(400).json({ message: 'Error happend in querying the data in simple DB.'});
		}else{  
			var response = {};
			response.registrations = [];			
			for(var i in data.Items){				
				var registration = {};
				registration.email = data.Items[i].Name;
				for(var j in data.Items[i].Attributes){
					var attribute = data.Items[i].Attributes[j];				
					if(attribute.Name == 'lastName'){
						registration.lastName = attribute.Value;
					}else if(attribute.Name == 'firstName'){
						registration.firstName = attribute.Value;
					}else if(attribute.Name == 'phone'){
						registration.phone = attribute.Value;
					}					 
				}
				response.registrations.push(registration);
			}
			res.json(response);        
		}
	});
}

/*
	This service returns all the scheduled appointments
	firstName
	lastName
	email
	phone
	topic
	issueDescription
*/
module.exports.getScheduledAppointments = function(req, res) {	
	var params = {
	  SelectExpression: ' select * from `event-appointment` '
	}
	sdb.select(params, function(err,data){
		if (err) { 
			console.log("Error:", err); 
			res.status(400).json({ message: 'Error happend in querying the data in simple DB.'});
		}else{  
			var response = {};
			response.registrations = [];			
			for(var i in data.Items){				
				var registration = {};
				registration.email = data.Items[i].Name;
				for(var j in data.Items[i].Attributes){
					var attribute = data.Items[i].Attributes[j];				
					if(attribute.Name == 'lastName'){
						registration.firstName = attribute.Value;
					}else if(attribute.Name == 'firstName'){
						registration.lastName = attribute.Value;
					}else if(attribute.Name == 'phone'){
						registration.phone = attribute.Value;
					}else if(attribute.Name == 'topic'){
						registration.topic = attribute.Value;
					}else if(attribute.Name == 'issueDescription'){
						registration.issueDescription = attribute.Value;
					}					 
				}
				response.registrations.push(registration);
			}
			res.json(response);        
		}
	});
}