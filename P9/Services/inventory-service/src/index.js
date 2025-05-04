import express from "express";
import bodyParser from "body-parser";
import { getDBConnection } from "./db.js";
import routes from "./routes.js";
import client from "prom-client";

const app = express();
const port = 5004;

// Inicializar Prometheus
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestsTotal = new client.Counter({
  name: "inventory_http_requests_total",
  help: "Total de solicitudes HTTP al microservicio de inventario",
});
register.registerMetric(httpRequestsTotal);

// Endpoint /metrics
app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", register.contentType);
  res.send(await register.metrics());
});

// Middleware general
app.use(bodyParser.json());

// Middleware combinado: métricas + rutas
app.use("/inventory", async (req, res, next) => {
  httpRequestsTotal.inc();
  routes(req, res, next);
});

// Iniciar servidor y base de datos
app.listen(port, async () => {
  const db = await getDBConnection();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_name TEXT NOT NULL,
      stock INTEGER NOT NULL
    )
  `);
  console.log(`Inventory service running at http://localhost:${port}/inventory`);
  console.log(`Metrics available at http://localhost:${port}/metrics`);
});
