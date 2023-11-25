exports.getRow = (customer)=>{
    console.log
    return {
        id: { S: customer.document },
        city: { S: customer.city },
        phone: { S: customer.phone },
        address: { S: customer.address },
        email: { S: customer.email },
        expDate: { S: customer.expDate },
        birthDate: { S: customer.birthDate },
        income: { N: `${customer.income}` },
        names: { S: customer.names },
        job: { S: customer.job },
      };
}