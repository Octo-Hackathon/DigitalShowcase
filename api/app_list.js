var async = require('async');
var AWS = require('aws-sdk');

AWS.config.region = 'us-east-1';
var sdb = new AWS.SimpleDB();

/* Lambda function
	This service returns all the apps
*/
exports.handler = function(event, context) {
//module.exports.handler = function(req, res) {

  var vertical = event.vertical;
  var filter = event.filter;
  console.log('vertical is : ' + vertical);
  console.log('filter is : ' + filter);
  var query = ' select * from `digital_showcase_app` ';
  if(filter || vertical) {
    query = query + " where ";
  }
  if(vertical) {
    query = query + ' `vertical_name` = \'' + vertical + '\' ';
    if(filter) {
      query = query + ' and ';
    }
  }

  if(filter) {
    query = query + ' ( name like \'%' + filter + '%\' ';
    query = query + ' or `vertical_name` like \'%' + filter + '%\' ';
    query = query + ' or tags like \'%' + filter + '%\' )';
  }
  console.log('query is : ' + query);
	var params = {
	  SelectExpression: query
	};
  var response = {};
	sdb.select(params, function(err,data){
		if (err) {
			console.log("Error:", err);
			//res.status(400).json({ message: 'Error happend in querying the data in simple DB.'});
      response.error = 'Error happend in querying the data in simple DB.';
      context.done(null,response);
		}else{
			response.apps = [];
      console.log('data : ' + JSON.stringify(data));
			for(var i in data.Items){
				var application = {};
        application.vertical_names = [];
				application.uuid = data.Items[i].Name;
				for(var j in data.Items[i].Attributes){
					var attribute = data.Items[i].Attributes[j];
					if(attribute.Name == 'name'){
						application.name = attribute.Value;
					}else if(attribute.Name == 'url'){
						application.url = attribute.Value;
					}else if(attribute.Name == 'image_path'){
						application.image_path = attribute.Value; //S3 image path
					}else if(attribute.Name == 'vertical_name'){
						application.vertical_names.push(attribute.Value);
					}/*else if(attribute.Name == 'problem'){
						application.problem = attribute.Value;
					}else if(attribute.Name == 'solution'){
						application.solution = attribute.Value;
					}else if(attribute.Name == 'benefits'){
						application.benefits = attribute.Value;
					}*/
				}
				response.apps.push(application);
			}
      console.log('apps: ' + response.apps);
			context.succeed(response);
		}
	});
};
