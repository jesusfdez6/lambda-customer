const {NAME_LAMBDA} = require("./constants");
const mapperResponse = require("./mapper/mapperResponse");
const parameters = require("./parameters/parameters");
const service = require("./services/service");
const ValidatorJsonSchemaHeaders = require("./utils/jsonSchema");

exports.handler = async (event) => {

  try {
    console.log("iniciando lambda:", NAME_LAMBDA);
    console.log(event);

    if (typeof event.body == "string") {
      event.body = event.body ? JSON.parse(event.body) : {};
    }
    

    const statusValidatorDataEvent = ValidatorJsonSchemaHeaders.validateRequest(event);

        if (statusValidatorDataEvent.status === 1) {

            console.log(" statusValidatorDataEvent response:");
            console.log(statusValidatorDataEvent);
            return mapperResponse.responseRequestError();
        }

    await parameters.getParametersInAws();
    const responseService = await service.createCostumer(event);

    console.log("lambda response:");
    console.log(responseService);

    return  responseService;

  } catch (error) {

    console.log("Error handler");
    console.log(error);
    return  mapperResponse.responseTecnicalError();

    
  }

};
  