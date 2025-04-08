import express from "express";
import bodyParser from "body-parser";
import { getDBConnection } from "./db.js";
import routes from "./routes.js";

const app = express();
const port = 5004;

app.use(bodyParser.json());
app.use("/inventory", routes);

app.listen(port, async () => {
  const db = await getDBConnection();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_name TEXT NOT NULL,
      stock INTEGER NOT NULL
    )
  `);
  console.log(`📦 Inventory service running at http://localhost:${port}/inventory`);
});
