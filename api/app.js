const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const sales = [];


app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type Sale {
            _id: ID!
            product: String!
            customer: String!
            total: Float!
            date: String!
        }

        input SaleInput {
            product: String!
            customer: String!
            total: Float!
        }

        type RootQuery {
            sales: [Sale!]!
        }

        type RootMutation {
            createSale(saleInput: SaleInput): Sale
        }

        schema {
            query: RootQuery 
            mutation: RootMutation
        }
    `),
    rootValue: {
        sales: () => {
            return sales;
        },
        createSale: (args) => {
            const sale = {
                _id: Math.random().toString(),
                product: args.saleInput.product,
                customer: args.saleInput.customer,
                total: +args.saleInput.total,
                date: new Date().toISOString()
            };
            sales.push(sale);
            return sale;
        }
    },
    graphiql: true
}));

app.listen(3000);