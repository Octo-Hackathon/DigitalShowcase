// load aws sdk
var aws = require('aws-sdk');

// load aws config
aws.config.loadFromPath('./config.json');
// load AWS SES
var ses = new aws.SES();

var from = 'octo.labs@octoconsulting.com';





// this sends the email
module.exports.sendEmail = function(to, subject, body)
{
  var params = {
  Destination: { 
    ToAddresses: [
      to      
    ]
  },
  Message: { 
    Body: {       
      Html: {
        Data: body
      }
    },
    Subject: {
      Data: subject
    }
  },
  Source: from
};
ses.sendEmail(params, function(err, data) {
  if (err) console.log(err); // an error occurred
  else     console.log(data);           // successful response
});
}
