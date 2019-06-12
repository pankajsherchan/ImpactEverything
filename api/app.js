const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type RootQuery {
            sales: [String!]!
        }

        type RootMutation {
            createSale(name: String): String
        }

        schema {
            query: RootQuery 
            mutation: RootMutation
        }
    `),
    rootValue: {
        sales: () => {
            return ['Sale1', 'Sale2', 'Sale3']
        },
        createSale: (args) => {
            const saleName = args.name;
            return saleName;
        }
    },
    graphiql: true
}));

app.listen(3000);