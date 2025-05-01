import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import { getDBConnection } from "./db.js";
import cors from "cors";
import bodyParser from "body-parser";
import client from "prom-client";

const app = express();
const port = 5002;

// Configurar Prometheus metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Métricas personalizadas
const graphqlRequestsTotal = new client.Counter({
  name: "graphql_requests_total",
  help: "Total de solicitudes a /graphql",
});
register.registerMetric(graphqlRequestsTotal);

const graphqlResponseTimeSeconds = new client.Histogram({
  name: "graphql_response_time_seconds",
  help: "Tiempo de respuesta de /graphql en segundos",
  buckets: [0.01, 0.1, 0.5, 1, 2, 5],
});
register.registerMetric(graphqlResponseTimeSeconds);

// Middleware base
app.use(cors());
app.use(bodyParser.json());

// 📍 Agregamos aquí el endpoint de métricas
app.get("/metrics", async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use(cors());
  app.use(bodyParser.json());

  // Endpoint para métricas
  app.get("/metrics", async (req, res) => {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
  });

  // Middleware combinado de Prometheus + ApolloServer
  app.use("/products/graphql", async (req, res, next) => {
    const end = graphqlResponseTimeSeconds.startTimer();
    graphqlRequestsTotal.inc();
    
    await expressMiddleware(server)(req, res, (err) => {
      end();
      if (err) {
        next(err);
      } else {
        next();
      }
    });
  });

  const db = await getDBConnection();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL
    )
  `);

  app.listen(port, '0.0.0.0', () => {
    console.log(`Servicio de productos iniciado en http://localhost:${port}/products/graphql`);
    console.log(`Métricas disponibles en http://localhost:${port}/metrics`);
  });
}


startApolloServer();
