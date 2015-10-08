var async = require('async');
var AWS = require('aws-sdk');
var uuidGen = require('node-uuid');

AWS.config.region = 'us-east-1';
var sdb = new AWS.SimpleDB();

/* Lambda function
	This service returns all the apps
*/
exports.handler = function(event, context) {
  var response = {};
  console.log('event is :' + JSON.stringify(event));
  var body = event.data;
  if(!body) {
    response.error = 'Required parameter data is missing.';
    context.done(null,response);
  } else {
    var inputData = body.app;
    if(!inputData) {
      response.error = 'Required parameter app is missing.';
      context.done(null,response);
    } else {
      var insert = {};
      //Setting the domain name which is a table
      insert.DomainName = "digital_showcase_app";
      //Setting the item name which is primary key
      console.log(JSON.stringify(inputData));
      if(!inputData.uuid) {
          inputData.uuid = uuidGen.v1(); //Generate New uuid
      }
      insert.ItemName = inputData.uuid;
      //Adding the attributes and values
      insert.Attributes = [];

      var attribute = {};
      attribute.Name = "name";
      attribute.Value = inputData.name;
      attribute.Replace = true;
      insert.Attributes.push(attribute);

      if(inputData.problem){
        attribute = {};
        attribute.Name = "problem";
        attribute.Value = inputData.problem;
        attribute.Replace = true;
        insert.Attributes.push(attribute);
      }

      if(inputData.solution){
        attribute = {};
        attribute.Name = "solution";
        attribute.Value = inputData.solution;
        attribute.Replace = true;
        insert.Attributes.push(attribute);
      }

      if(inputData.benefits){
        attribute = {};
        attribute.Name = "benefits";
        attribute.Value = inputData.benefits;
        attribute.Replace = true;
        insert.Attributes.push(attribute);
      }

      if(inputData.image_path){
        attribute = {};
        attribute.Name = "image_path";
        attribute.Value = inputData.image_path;
        attribute.Replace = true;
        insert.Attributes.push(attribute);
      }

      if(inputData.url){
        attribute = {};
        attribute.Name = "url";
        attribute.Value = inputData.url;
        attribute.Replace = true;
        insert.Attributes.push(attribute);
      }

      if(inputData.tags){
        for (var i in inputData.tags) {
          attribute = {};
          attribute.Name = "tag";
          attribute.Value = inputData.tags[i];
          attribute.Replace = false;
          insert.Attributes.push(attribute);
        }
      }

      if(inputData.vertical_names){
        for (var j in inputData.vertical_names) {
          attribute = {};
          attribute.Name = "vertical_name";
          attribute.Value = inputData.vertical_names[j];
          attribute.Replace = false;
          insert.Attributes.push(attribute);
        }
      }

      //Upserting the data in Simple DB
      console.log('params: ' + JSON.stringify(insert));
      sdb.putAttributes(insert, function(err,data){
        if (err) {
          console.log("Error:", err);
          response.error = 'Error saving application to SimpleDB';
          context.done(null,response);
        }
        response.message = 'Application with uuid ' + inputData.uuid + ' saved successfully';
      	context.succeed(response);
      });

    }
  }
};
