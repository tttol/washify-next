// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'ap-northeast-1' });

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const insert = (params) => {
  // const params = {
  //   TableName: 'washify-data',
  //   Item: {
  //     'id': { S: Math.random().toString() },
  //     'name': { S: 'hoge' },
  //     'created_at': { S: new Date().toISOString() }
  //   }
  // };
  
  // Call DynamoDB to add the item to the table
  ddb.putItem(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
}

