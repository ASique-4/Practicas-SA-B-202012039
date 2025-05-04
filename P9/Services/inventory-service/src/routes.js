import express from "express";
import { getDBConnection } from "./db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const db = await getDBConnection();
  const items = await db.all("SELECT * FROM inventory");
  res.json(items);
});

router.post("/", async (req, res) => {
  const { product_name, stock } = req.body;
  const db = await getDBConnection();
  await db.run("INSERT INTO inventory (product_name, stock) VALUES (?, ?)", [product_name, stock]);
  const item = await db.get("SELECT * FROM inventory WHERE product_name = ?", [product_name]);
  res.status(201).json(item);
});

export default router;
