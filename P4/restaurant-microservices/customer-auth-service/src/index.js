const { ApolloServer, gql } = require('apollo-server');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'restaurant_db'
});

const typeDefs = gql`
  type User {
    id: ID
    username: String
    token: String
  }

  type Mutation {
    register(username: String!, password: String!): User
    login(username: String!, password: String!): User
  }
`;

const resolvers = {
  Mutation: {
    register: (_, { username, password }) => {
      return new Promise((resolve, reject) => {
        db.query("INSERT INTO customers (username, password) VALUES (?, ?)", [username, password], (err, result) => {
          if (err) reject(err);
          resolve({ id: result.insertId, username, token: "token123" });
        });
      });
    },
    login: (_, { username, password }) => {
      return new Promise((resolve, reject) => {
        db.query("SELECT * FROM customers WHERE username = ? AND password = ?", [username, password], (err, results) => {
          if (err) reject(err);
          if (results.length > 0) {
            resolve({ id: results[0].id, username, token: "token123" });
          } else {
            reject("Invalid credentials");
          }
        });
      });
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});