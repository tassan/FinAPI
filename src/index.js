const express = require("express");
const { v4: uuidV4 } = require("uuid")

const app = express();

app.use(express.json());

const customers = [];

/*
 * cpf - string
 * name - string
 * id - UUID
 * statement []
 */
app.post("/account", (request, response) => {
    const { cpf, name } = request.body;

    const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf); 

    if (customerAlreadyExists)
        return response.status(400).json({error: "Customer already exists!"});
    
    customers.push({
        cpf,
        name,
        id: uuidV4(),
        statement: []
    });

    return response.status(201).send();
});

app.listen(3000);