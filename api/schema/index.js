const { buildSchema } = require('graphql');

module.exports = buildSchema(`
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
`);