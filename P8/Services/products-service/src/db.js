import Database from "better-sqlite3";

let db = null;

export async function getDBConnection() {
  if (!db) {
    db = new Database("products.db");
  }
  return db;
}
