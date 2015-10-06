var async = require('async');
var AWS = require('aws-sdk');
var _ = require('lodash');

AWS.config.region = 'us-east-1';

var sdb = new AWS.SimpleDB({accessKeyId:'AKIAJ3BII5P6OJUJSR5Q', 
					secretAccessKey:'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'});
var digital_showcase_domains = [ 'digital_showcase_app', 'digital_showcase_app_vertical_typ_ref'];
sdb.setUpDomains(function(err,data){
		if (err) { 
			console.log(err);
		}else{
			console.log('data.DomainNames:::'+data.DomainNames);
			var create_domains = _.difference(digital_showcase_domains, data.DomainNames);
			for(var i in create_domains){
				var params = {};
				params.DomainName = create_domains[i];
				sdb.createDomain(params, function(err1,data){
					if (err1) { 
						console.log(err1);
					}else{           
						console.log('Domains created');	
					}
				});
			}
		}

	});
