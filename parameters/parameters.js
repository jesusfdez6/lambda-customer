const { SSMClient, GetParametersByPathCommand } = require("@aws-sdk/client-ssm");
const parameters = {};
exports.getParametersInAws = async () =>{
  console.log("function get parameters");

  return new Promise(async (resolve, reject) => {

    try {

      const ssmClient = new SSMClient({region:"us-east-1"});
      
      const params = {
          Path: process.env.BASE_PATH,
          Recursive: true,
          WithDecryption: false
      };
      
      const command = new GetParametersByPathCommand(params);

      const response = await ssmClient.send(command);
      
      response.Parameters.forEach(parameter => {
        const { Name, Value } = parameter;
        parameters[Name] = Value;
      });
      console.log(parameters);
      
      resolve(parameters);

    } catch (error) {
      console.log(error)
      reject(error);
    }
  })
    

} 

exports.getParameters = () =>{

  return parameters;

}

