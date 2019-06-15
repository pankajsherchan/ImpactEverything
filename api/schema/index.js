const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Sale {
    _id: ID!
    product: String!
    customer: String!
    total: Float!
}

input SaleInput {
    product: String
    customer: String
    total: Float
}

type RootQuery {
    sales: [Sale!]!
}

type RootMutation {
    createSale(saleInput: SaleInput): Sale
    createSales(saleInputs: [SaleInput]): [Sale]
}

schema {
    query: RootQuery 
    mutation: RootMutation
}
`);


const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLFloat } = graphql;

const Sale = new GraphQLObjectType({
    name: 'Sale',
    fields: () => ({
        id: { type: GraphQLString },
        product: { type: GraphQLString },
        customer: { type: GraphQLString },
        total: { type: GraphQLFloat }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        sale: {
            type: Sale
        }
    }
})