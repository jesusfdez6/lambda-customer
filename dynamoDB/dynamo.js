const { DynamoDBClient,PutItemCommand,UpdateItemCommand  } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } =require("@aws-sdk/lib-dynamodb");
const {getParameters} = require('../parameters/parameters');


exports.createCustomer = async (customer) => {
    
    console.log("createCustomer dynamoDB:");
    const parameters = getParameters();
    
    return new Promise(async (resolve, reject) => {
    
        const client = new DynamoDBClient({ region: 'us-east-1' });
        const ddbDocClient = DynamoDBDocumentClient.from(client);

        const params = {
            TableName: parameters[process.env.TABLE_DYNAMO],
            Item: customer,
            ConditionExpression: 'attribute_not_exists(id)'
        }

        try {
            await ddbDocClient.send(new PutItemCommand(params));
            resolve(true);

        } catch (error) {
            if (error.name === "ConditionalCheckFailedException") {
                console.log("Entro aqui");
                resolve(error.name);
            }
            reject(error);
        }
    });
};


exports.putCustomer = async (customer) => {

    console.log("putCustomer dynamoDB:");
    const parameters = getParameters();
    return new Promise(async (resolve, reject) => {
    
        const client = new DynamoDBClient({ region: 'us-east-1' });
        const ddbDocClient = DynamoDBDocumentClient.from(client);
        const {id,...customerWithoutId} = customer;
       
        const updateExpression = "SET " +
        Object.keys(customerWithoutId).map((key) => `#${key} = :${key}`).join(", ");
     
        const expressionAttributeNames = Object.fromEntries(
        Object.keys(customerWithoutId).map((key) => [ `#${key}`, key ])
        );
        const expressionAttributeValues = Object.fromEntries(
        Object.entries(customerWithoutId).map(([ key, value ]) => [ `:${key}`, value ])
        );

        const updateItemCommand = new UpdateItemCommand({
            TableName: parameters[process.env.TABLE_DYNAMO],
            Key: { id: { S: id.S } }, 
            UpdateExpression: updateExpression,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
          });

        try {
            await ddbDocClient.send(updateItemCommand);
            resolve(true);

        } catch (error) {

            reject(error);
        }
    });

};

