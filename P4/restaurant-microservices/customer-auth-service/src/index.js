const { ApolloServer, gql } = require('apollo-server');
const mysql = require('mysql');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const typeDefs = gql`
  type User {
    id: ID
    username: String
    token: String
  }

  type Query {
    _: Boolean
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

server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});