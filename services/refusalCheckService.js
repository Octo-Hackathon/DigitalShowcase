var Client = require('node-rest-client').Client;

/*
	This service is to autoComplete
	
*/
module.exports.autoComplete = function(req, res) {		
	var client = new Client();	
    var dat = req.query.type;

    console.log('Calling API autoComplete');

    var request = client.get('https://xs390syoyh.execute-api.us-east-1.amazonaws.com/api/app/autocomplete?input='+dat, function(data, response, err){
                          
        var results= data;
                console.log(results);                                                
                res.send(results);
           
        }); 
}

/*
	This service is to search
	
*/
module.exports.search = function(req, res) {		
	var client = new Client();		
    var dat = req.query.type;
    var query;

    console.log('Calling API search');
    datQuery = dat.split('-');
    if(datQuery[0] == 'industry')
    	query = 'https://xs390syoyh.execute-api.us-east-1.amazonaws.com/api/app/refusals?industryCode=';
    else if(datQuery[0] == 'manufacturer')
    	query = 'https://xs390syoyh.execute-api.us-east-1.amazonaws.com/api/app/refusals?manufacturerName=';

    var type = datQuery[1].replace(/ /g, '%20'); 

    var request = client.get(query+type, function(data, response, err){
                          
        var results= data;                                                
                res.send(results);           
        }); 
}
