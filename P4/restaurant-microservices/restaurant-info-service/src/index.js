const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
const resolvers = require('./resolvers');

const app = express();
const PORT = process.env.PORT || 4000;

const typeDefs = importSchema('./schema.graphql');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
});