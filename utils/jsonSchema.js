const Validator = require("jsonschema").Validator;

exports.validateRequest = data => {

    const validator = new Validator();

   /// validator.addSchema(getSchemaHeader(), "/headers");
    validator.addSchema(getSchemaBody(), "/body");
    const resultValidate = validator.validate(
        {
            body: data.body
        },
        userSchema()
    );
    if (resultValidate.errors.length > 0) {

        const arrayErrors = [];
        for (const i of resultValidate.errors) {
            arrayErrors.push(messageError(i));
        }
        return { status: 1, message: arrayErrors };

    } else {
        return { status: 0, desc: "" };
    }
};

const messageError = (i) => {
    let typeError = '';
    switch (i.name) {
        case "required":
            typeError = `${i.argument} es un campo requerido`
            break;
        case "const":
            typeError = `Solo acepta ${i.argument} en el campo ${i.path[1]} que se encuentra en el ${i.path[0]} `
            break;
        case "format":
            typeError = `Formato incorrecto en el campo ${i.path[1]} que se encuentra en el ${i.path[0]}`
            break;
        case "minLength":
            typeError = ` campo ${i.path[1]} debe ser mayor a ${i.argument} caracteres  que se encuentra en el ${i.path[0]} `
            break;
        case "maxLength":
            typeError = ` campo ${i.path[1]} debe ser menor a ${i.argument} caracteres  que se encuentra en el ${i.path[0]} `
            break;



        default:
            break;
    }

    return typeError;


}
/*
const getSchemaHeader = () => {
    return {
        id: "/headers",
        type: "object",
        properties: {
            "content-type": {
                type: "string",
                const: "application/json"
            },
            "accept": {
                type: "string",
                enum: ["/", "application/json"]
            },

        },
        required: [
            "content-type",
            "accept"
        ]
    };
};*/




const userSchema = () => {
    return {
        id: "/user",
        type: "object",
        properties: {
            body: { $ref: "/body" }
        },
        required: ["body"]
    };
};

const getSchemaBody = () => {
    return {
        id: "/body",
        type: "object",
        properties: {
            document: { type: 'string', maxLength: 12, minLength: 3 },
            phone: { type: 'string', maxLength: 12, minLength: 3 },
            city: { type: 'string', maxLength: 100, minLength: 3 },
            address: { type: 'string', maxLength: 200 },
            expDate: { type: 'string', maxLength: 50 },
            birthDate: { type: 'string', maxLength: 50 },
            income: { type: 'number', maxLength: 20 },
            email: { type: 'string', format: 'email', maxLength: 255, minLength: 3 },
            names: { type: 'string', maxLength: 255, minLength: 3 },
            job: { type: 'string', maxLength: 255, minLength: 3 }

        },
        required: ['document', 'phone', 'city','address', 'expDate', 'birthDate','income','email','names','job'],
    };
};