const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./schema/index');
const grahQlResolvers = require('./resolvers/index');


const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    rootValue: grahQlResolvers,
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
