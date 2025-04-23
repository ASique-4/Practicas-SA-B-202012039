import { getDBConnection } from "./db.js";

export const resolvers = {
  Query: {
    products: async () => {
      const db = await getDBConnection();
      return db.all("SELECT * FROM products");
    }
  },
  Mutation: {
    addProduct: async (_, { name, price }) => {
      const db = await getDBConnection();
      await db.run("INSERT INTO products (name, price) VALUES (?, ?)", [name, price]);
      const product = await db.get("SELECT * FROM products WHERE name = ?", [name]);
      return product;
    }
  }
};
