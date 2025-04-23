import gql from "graphql-tag";

export const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
  }

  type Query {
    products: [Product]
  }

  type Mutation {
    addProduct(name: String!, price: Float!): Product
  }
`;
