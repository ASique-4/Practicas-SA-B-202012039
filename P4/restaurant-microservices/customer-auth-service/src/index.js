const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 4000;

// GraphQL schema
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload!
    login(username: String!, password: String!): AuthPayload!
  }
`;

// Sample user data
let users = [];

// Resolvers
const resolvers = {
  Query: {
    me: (parent, args, context) => {
      if (!context.userId) throw new Error('Not authenticated');
      return users.find(user => user.id === context.userId);
    },
  },
  Mutation: {
    register: (parent, { username, email, password }) => {
      const user = { id: users.length + 1, username, email, password };
      users.push(user);
      const token = jwt.sign({ userId: user.id }, 'your_secret_key');
      return { token, user };
    },
    login: (parent, { username, password }) => {
      const user = users.find(user => user.username === username && user.password === password);
      if (!user) throw new Error('Invalid credentials');
      const token = jwt.sign({ userId: user.id }, 'your_secret_key');
      return { token, user };
    },
  },
};

// Middleware to authenticate user
const getUser = (req) => {
  const token = req.headers.authorization || '';
  if (token) {
    try {
      return jwt.verify(token, 'your_secret_key');
    } catch (err) {
      throw new Error('Session invalid');
    }
  }
  return null;
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user = getUser(req);
    return { userId: user ? user.userId : null };
  },
});

server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
});