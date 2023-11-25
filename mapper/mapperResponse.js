exports.responseSuccess =(data={}) => {
    return{
        statusCode: 200,
        body: JSON.stringify({
            status: "SUCCESS",
            code: 200,
            data
        }),
    }
};

exports.responseCreated =(data = {}) => {
    return{
        statusCode: 201,
        body: JSON.stringify({
            status: "Created",
            code: 201,
            data
        }),
    }
};

exports.responseRequestError =(data={}) => {
    return{
        statusCode: 400,
        body: JSON.stringify({
            status: "REQUEST ERROR",
            code: 400,
            data
        })
    }
};

exports.responseBusinessError =(data={}) => {
    return{
        statusCode: 422,
        body: JSON.stringify({
            status: "BUSINNES ERROR",
            code: 422,
            data
        })
    }
};

exports.responseTecnicalError =() => {
    return{
        statusCode: 500,
        body: JSON.stringify({
            status: "TECNICAL ERROR",
            code: 500
        })
    }
};


