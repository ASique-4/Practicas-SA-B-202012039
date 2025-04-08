import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import { getDBConnection } from "./db.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 5002;

// Configuración middleware
app.use(cors());
app.use(bodyParser.json());

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use("/graphql", expressMiddleware(server));

  // Inicializar base de datos
  const db = await getDBConnection();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL
    )
  `);

  app.listen(port, () => {
    console.log(`🚀 Products service ready at http://localhost:${port}/graphql`);
  });
}

startApolloServer();
