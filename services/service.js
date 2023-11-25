const dynamoDB = require("../dynamoDB/dynamo");
const mapperResponse = require("../mapper/mapperResponse");
const mapperRequestDynamo = require("../mapper/mapperDynamo");
const { ERROR_CUSTOMER_CREATED } = require("../constants");

exports.createCostumer = async (event)=>{
    console.log("createCustomer services");
    try {

        const customer = mapperRequestDynamo.getRow(event.body);
        const responseCustomer = await dynamoDB.createCustomer(customer);

        console.log(responseCustomer);
        if(responseCustomer === ERROR_CUSTOMER_CREATED){
            await dynamoDB.putCustomer(customer);
        }

        return mapperResponse.responseCreated();
      
    } catch (error) {
        console.error("Error createCustomer services:");
        console.log(error);
        return mapperResponse.responseTecnicalError();
    }
}