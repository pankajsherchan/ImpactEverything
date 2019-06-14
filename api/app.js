const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Sale = require('./models/sale');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type Sale {
            _id: ID!
            product: String!
            customer: String!
            total: Float!
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
            return Sale.find()
                .then(sales => {
                    return sales.map(sale => {
                        return { ...sale._doc };
                    });
                })
        },
        createSale: (args) => {
            const sale = new Sale({
                product: args.saleInput.product,
                customer: args.saleInput.customer,
                total: +args.saleInput.total
            });

            sale.save()
                .then(result => {
                    console.log(result);
                    return { ...result._doc };
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
            return sale;
        }
    },
    graphiql: true
}));



mongoose.connect(`
mongodb+srv://pankajsherchan:test@cluster0-pzqeh.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority
`, { useNewUrlParser: true })
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log('rr');
        console.log(err);
    })
