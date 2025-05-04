import { getDBConnection } from "./db.js";

export const resolvers = {
  Query: {
    products: async () => {
      const db = await getDBConnection();
      return db.prepare("SELECT * FROM products").all();
    }
  },
  Mutation: {
    addProduct: async (_, { name, price }) => {
      const db = await getDBConnection();
      db.prepare("INSERT INTO products (name, price) VALUES (?, ?)").run(name, price);
      return db.prepare("SELECT * FROM products WHERE name = ?").get(name);
    }
  }
};
